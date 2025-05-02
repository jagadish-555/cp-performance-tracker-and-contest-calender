export default function YourPlatforms() {
    const platforms = [
      {
        name: "Codeforces",
        logoColor: "bg-red-100 text-red-600",
        rating: 1742,
        maxRating: 1823,
        rank: "#12,458",
        badge: "Expert",
        badgeColor: "bg-red-100 text-red-700",
        extraInfo: "Last contest: 2 days ago",
      },
      {
        name: "LeetCode",
        logoColor: "bg-yellow-100 text-yellow-600",
        rating: 1892,
        maxRating: 1905,
        rank: "#8,921",
        badge: "Advanced",
        badgeColor: "bg-yellow-100 text-yellow-700",
        extraInfo: "Problems solved: 347",
      },
      {
        name: "CodeChef",
        logoColor: "bg-green-100 text-green-600",
        rating: 1876,
        maxRating: 1912,
        rank: "#5,234",
        badge: "4 Star",
        badgeColor: "bg-green-100 text-green-700",
        extraInfo: "Last contest: 1 week ago",
      },
    ];
  
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Platforms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between border"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-md ${platform.logoColor}`}>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 17a1 1 0 01-2 0v-1H7a1 1 0 010-2h2v-2H7a1 1 0 010-2h2V8H7a1 1 0 010-2h2V5a1 1 0 012 0v1h2a1 1 0 010 2h-2v2h2a1 1 0 010 2h-2v2h2a1 1 0 010 2h-2v1z" />
                  </svg>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${platform.badgeColor}`}
                >
                  {platform.badge}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {platform.name}
                </h3>
                <div className="mt-2 space-y-1 text-sm text-gray-700">
                  <p>
                    <strong>Current Rating:</strong> {platform.rating}
                  </p>
                  <p>
                    <strong>Max Rating:</strong> {platform.maxRating}
                  </p>
                  <p>
                    <strong>Global Rank:</strong> {platform.rank}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{platform.extraInfo}</span>
                <a
                  href="#"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  