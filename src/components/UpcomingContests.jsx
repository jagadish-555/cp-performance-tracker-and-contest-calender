import { useEffect, useState } from 'react';
import { FaClock, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';

export default function UpcomingContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (loading) return <div className="text-center text-gray-500 mt-10">Loading contests...</div>;

  return (
    <div className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Contests</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {contests.map((contest, index) => (
            <div key={index} className="p-5 border rounded-2xl shadow-sm hover:shadow-md transition bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">{contest.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{contest.platform}</p>

              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  {formatDate(contest.startTime)}
                </p>
                <p className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  Duration: {formatDuration(contest.duration)}
                </p>
              </div>

              <a
                href={contest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 mt-4 text-sm hover:underline"
              >
                Go to Contest <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
