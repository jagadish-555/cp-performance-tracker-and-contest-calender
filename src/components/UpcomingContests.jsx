import { useEffect, useState } from 'react';
import { FaClock, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function UpcomingContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const platformColors = {
    codeforces: 'bg-red-100 text-red-600',
    leetcode: 'bg-yellow-100 text-yellow-600',
    codechef: 'bg-green-100 text-green-600',
    atcoder: 'bg-purple-100 text-purple-600',
    hackerrank: 'bg-blue-100 text-blue-600',
    hackerearth: 'bg-indigo-100 text-indigo-600',
  };

  const platformLogos = {
    leetcode: '/logos/leetcode.svg',
    codeforces: '/logos/codeforces.svg',
    codechef: '/logos/codechef.svg',
    atcoder: '/logos/atcoder.svg',
    hackerrank: '/logos/hackerrank.svg',
    hackerearth: '/logos/hackerearth.svg',
  };

  useEffect(() => {
    async function fetchContests() {
      try {
        const res = await fetch('https://competeapi.vercel.app/contests/upcoming/');
        const data = await res.json();
        setContests(data || []);
      } catch (err) {
        console.error('Failed to fetch contests:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchContests();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const formatDuration = (ms) => {
    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading contests...</div>;
  }

  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Contests</h2>
          <Link
            to="/calendar"
            className="text-sm text-indigo-600 hover:underline hover:text-indigo-800"
          >
            View Full Calendar →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {contests.map((contest, index) => {
            const site = contest.site?.trim().toLowerCase() || 'unknown';
            const colorClass = platformColors[site] || 'bg-gray-100 text-gray-600';
            const logoSrc = platformLogos[site];

            return (
              <div
                key={index}
                className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 text-sm"
              >
                <div className="flex items-center gap-2">
                  {logoSrc && (
                    <img
                      src={logoSrc}
                      alt={`${site} logo`}
                      className="w-5 h-5"
                    />
                  )}
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${colorClass}`}>
                    {site.charAt(0).toUpperCase() + site.slice(1)}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-gray-800 mt-2 line-clamp-2">
                  {contest.title}
                </h3>

                <div className="mt-3 space-y-1 text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    {formatDate(contest.startTime)}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    {formatDuration(contest.duration)}
                  </p>
                </div>

                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 mt-3 text-sm hover:underline"
                >
                  Go to Contest <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
