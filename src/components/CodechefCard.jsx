import React, { useEffect, useState } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const CodechefCard = ({ handle }) => {
  const [data, setData] = useState(null);
  const [lastRatingChange, setLastRatingChange] = useState(0);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setData(null);
        const res = await fetch(`https://codechef-api.vercel.app/handle/${handle}`);
        const result = await res.json();
        if (result.success) {
          setData(result);
          const history = result.ratingData;
          if (history.length >= 2) {
            const diff =
              parseInt(history[history.length - 1].rating) -
              parseInt(history[history.length - 2].rating);
            setLastRatingChange(diff);
          }
        } else {
          setError('Invalid handle or user not found.');
        }
      } catch (err) {
        console.error('Error fetching CodeChef data:', err);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    if (handle) {
      fetchData();
    }
  }, [handle]);

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-50 border border-red-200 p-4 rounded-md">
        {error}
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const {
    profile,
    name,
    currentRating,
    highestRating,
    globalRank,
    countryRank,
    stars,
    countryName,
    countryFlag,
  } = data;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-sm w-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 text-xl">
            <span>&lt;/&gt;</span>
          </div>
          <div>
            <h2 className="text-lg font-bold">CodeChef</h2>
            <p className="text-xs text-gray-500">Last updated: just now</p>
          </div>
        </div>
        <a
          href={`https://www.codechef.com/users/${handle}`}
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
            <span className="text-2xl font-bold">{currentRating}</span>
            <span className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded">
              {stars}
            </span>
          </div>
        </div>
        <div>
          <p className="text-gray-500">Max Rating</p>
          <p className="text-2xl font-bold">{highestRating}</p>
        </div>
        <div>
          <p className="text-gray-500">Global Rank</p>
          <p className="text-2xl font-bold">#{globalRank.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Country Rank</p>
          <p className="text-2xl font-bold">#{countryRank.toLocaleString()}</p>
        </div>
      </div>

      {/* Rating Change */}
      <div className="mt-4 flex items-center text-sm text-blue-600 font-medium">
        <TrendingUp size={16} className="mr-1" />
        {lastRatingChange >= 0 ? `+${lastRatingChange}` : lastRatingChange} since last contest
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-sm text-gray-600">
        <img src={countryFlag} alt={countryName} className="w-4 h-4 rounded-full" />
        <span>{countryName}</span>
      </div>
    </div>
  );
};

export default CodechefCard;
