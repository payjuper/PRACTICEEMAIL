import React from 'react';

export default function SettingsPage() {
    return (
        <div className="bg-white border border-gray-300 rounded-md p-8">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Display Name</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter your display name" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Bio</span>
                            <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="3" placeholder="Tell us about yourself"></textarea>
                        </label>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <h2 className="text-xl font-semibold mb-4">Account Management</h2>
                    <div className="space-y-4">
                       <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                            Deactivate Account
                        </button>
                    </div>
                </div>

                <div className="flex justify-end pt-8">
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}