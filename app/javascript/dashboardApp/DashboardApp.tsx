import React from "react";

export const DashboardApp: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Counter Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Interactive Counter
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-indigo-600">
                {count}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCount(count - 1)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => setCount(count + 1)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => setCount(0)}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Stats Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-semibold">
                ↑ 12%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>

          {/* Stats Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Revenue</p>
                <p className="text-3xl font-bold text-gray-900">$45.2K</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-semibold">↑ 8%</span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                action: "New user registration",
                time: "2 minutes ago",
                color: "blue",
              },
              {
                action: "Payment received",
                time: "15 minutes ago",
                color: "green",
              },
              {
                action: "Support ticket opened",
                time: "1 hour ago",
                color: "yellow",
              },
              {
                action: "System update completed",
                time: "3 hours ago",
                color: "purple",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full bg-${item.color}-500 mr-3`}
                  ></div>
                  <span className="text-gray-800">{item.action}</span>
                </div>
                <span className="text-sm text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            This React application is mounted in the Rails dashboard view
          </p>
        </div>
      </div>
    </div>
  );
};
