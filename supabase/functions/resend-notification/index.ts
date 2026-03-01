import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// EmailJS 환경 변수
const EMAILJS_SERVICE_ID = Deno.env.get("EMAILJS_SERVICE_ID");
const EMAILJS_TEMPLATE_ID = Deno.env.get("EMAILJS_TEMPLATE_ID");
const EMAILJS_PUBLIC_KEY = Deno.env.get("EMAILJS_PUBLIC_KEY");
const EMAILJS_PRIVATE_KEY = Deno.env.get("EMAILJS_PRIVATE_KEY");

const CATEGORY_TO_INTERESTS: Record<string, string[]> = {
  "Web Development": ["Web Development", "Web Dev"],
  "Mobile App": ["Mobile App"],
  "AI / Machine Learning": ["AI / Machine Learning", "AI/ML"],
  "Game Development": ["Game Development", "Game Dev"],
  "Data Science & Analytics": ["Data Science & Analytics", "Data Science"],
  "Cyber Security": ["Cyber Security"],
  "Blockchain & Web3": ["Blockchain & Web3", "Blockchain"],
  "Hardware & IoT": ["Hardware & IoT", "Startup"],
  "UI/UX Design": ["UI/UX Design", "UI/UX", "Web Dev"],
  "Business & PM": [
    "Business & PM",
    "Business & Startup",
    "Startup",
    "Fintech",
    "EdTech",
  ],
};

serve(async (req: Request) => {
  try {
    const body = await req.json();
    const { record, table, type } = body;
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    let recipients: string[] = [];

    if (table === "projects" && type === "INSERT") {
      const category = record.category_tag;
      const interestKeywords = CATEGORY_TO_INTERESTS[category] || [category];

      console.log(`[디버그] 새 글 카테고리: ${category}`);

      const { data: allUsers, error: userError } = await supabase
        .from("profiles")
        .select("id, school_email, interest_tags")
        .not("school_email", "is", null);

      if (userError) throw userError;

      recipients = (allUsers || [])
        .filter((user) => {
          if (record.author_id && user.id === record.author_id) return false;

          let isCategoryMatch = false;
          if (user.interest_tags) {
            const userInterests =
              typeof user.interest_tags === "string"
                ? user.interest_tags.split(",").map((t: string) => t.trim())
                : Array.isArray(user.interest_tags)
                  ? user.interest_tags
                  : [];
            isCategoryMatch = interestKeywords.some((keyword) =>
              userInterests.includes(keyword),
            );
          }
          return isCategoryMatch;
        })
        .map((u) => u.school_email);

      if (recipients.length === 0) {
        console.log("ℹ️ 매칭되는 유저가 없습니다.");
        return new Response(
          JSON.stringify({ message: "No matched users found." }),
          { status: 200 },
        );
      }

      const subject = `[UW Matching] '${category}' 분야의 새 프로젝트가 등록되었습니다!`;
      const contentPreview = record.content
        ? record.content.substring(0, 100) + "..."
        : "내용 없음";
      const projectLink = `https://your-project-url.vercel.app/post/${record.id}`;

      const results = [];
      let sentCount = 0;

      // EmailJS API를 통해 각 수신자에게 메일 발송
      for (const email of recipients) {
        console.log(`📤 EmailJS로 전송 시도: ${email}`);

        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            accessToken: EMAILJS_PRIVATE_KEY,
            template_params: {
              to_email: email, // 템플릿의 {{to_email}} 과 매칭
              subject: subject, // 템플릿의 {{subject}} 와 매칭
              category: category, // 템플릿의 {{category}} 와 매칭
              project_title: record.title, // 템플릿의 {{project_title}} 과 매칭
              project_content: contentPreview,
              project_link: projectLink,
            },
          }),
        });

        const responseText = await res.text();

        if (res.ok || responseText === "OK") {
          sentCount++;
          results.push({ email, success: true });
        } else {
          console.error(`❌ EmailJS 에러: ${responseText}`);
          results.push({ email, success: false, error: responseText });
        }
      }

      return new Response(
        JSON.stringify({ total: recipients.length, sent: sentCount, results }),
        { status: 200 },
      );
    }

    return new Response(JSON.stringify({ message: "No event matched" }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("최종 에러:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
});
