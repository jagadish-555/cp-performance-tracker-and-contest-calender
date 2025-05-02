import React, { useEffect, useState } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const CodeforcesCard = ({ handle }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://codeforces.com/api/user.info?handles=${handle}&checkHistoricHandles=true`
        );
        const result = await res.json();
        if (result.status === 'OK') {
          setData(result.result[0]);
        }
      } catch (err) {
        console.error('Error fetching Codeforces data:', err);
      }
    };

    fetchData();
  }, [handle]);

  if (!data) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const {
    handle: userHandle,
    rating,
    maxRating,
    rank,
    maxRank,
    contribution,
    friendOfCount,
  } = data;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-sm w-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">
            <span>&lt;/&gt;</span>
          </div>
          <div>
            <h2 className="text-lg font-bold">Codeforces</h2>
            <p className="text-xs text-gray-500">@{userHandle}</p>
          </div>
        </div>
        <a
          href={`https://codeforces.com/profile/${userHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-indigo-500"
        >
          <ArrowUpRight size={20} />
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <p className="text-gray-500">Current Rating</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{rating}</span>
            <span className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded">
              {rank}
            </span>
          </div>
        </div>
        <div>
          <p className="text-gray-500">Max Rating</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{maxRating}</span>
            <span className="text-xs bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded">
              {maxRank}
            </span>
          </div>
        </div>
        <div>
          <p className="text-gray-500">Friends</p>
          <p className="text-2xl font-bold">{friendOfCount}</p>
        </div>
        <div>
          <p className="text-gray-500">Contribution</p>
          <p className="text-2xl font-bold">{contribution}</p>
        </div>
      </div>

      {/* Rating Info */}
      <div className="mt-4 flex items-center text-sm text-blue-600 font-medium gap-2">
        <TrendingUp size={16} />
        Rank: <span className="capitalize">{rank}</span> · Max Rank: <span className="capitalize">{maxRank}</span>
      </div>
    </div>
  );
};

export default CodeforcesCard;
