import React, { useEffect, useState } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const CodeforcesCard = ({ handle }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}&checkHistoricHandles=true`);
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
    avatar,
    titlePhoto,
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
          <img
            src={avatar}
            alt={userHandle}
            className="w-10 h-10 rounded-full border border-gray-200"
          />
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
          <p className="text-2xl font-bold">{rating}</p>
        </div>
        <div>
          <p className="text-gray-500">Max Rating</p>
          <p className="text-2xl font-bold">{maxRating}</p>
        </div>
        <div>
          <p className="text-gray-500">Rank</p>
          <p className="text-xl font-semibold capitalize">{rank}</p>
        </div>
        <div>
          <p className="text-gray-500">Max Rank</p>
          <p className="text-xl font-semibold capitalize">{maxRank}</p>
        </div>
      </div>

      {/* Extra Info */}
      <div className="mt-4 flex items-center text-sm text-blue-600 font-medium gap-2">
        <TrendingUp size={16} />
        {contribution} contribution · {friendOfCount} friends
      </div>
    </div>
  );
};

export default CodeforcesCard;
