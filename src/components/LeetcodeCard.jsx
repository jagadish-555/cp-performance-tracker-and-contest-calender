import React, { useEffect, useState } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const LeetcodeCard = ({ handle }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://competeapi.vercel.app/user/leetcode/${handle}`);
        const result = await res.json();
        if (result.data) {
          setData(result.data);
        }
      } catch (err) {
        console.error('Error fetching LeetCode data:', err);
      }
    };

    fetchData();
  }, [handle]);

  if (!data) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const user = data.matchedUser;
  const avatar = user.profile.userAvatar;
  const username = user.username;

  const stats = user.submitStats.acSubmissionNum;
  const all = stats.find(d => d.difficulty === 'All')?.count || 0;
  const easy = stats.find(d => d.difficulty === 'Easy')?.count || 0;
  const medium = stats.find(d => d.difficulty === 'Medium')?.count || 0;
  const hard = stats.find(d => d.difficulty === 'Hard')?.count || 0;

  const contestRating = data.userContestRanking?.rating || 'Unrated';
  const streak = user.userCalendar?.streak || 0;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-sm w-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 text-xl">
            &lt;/&gt;
          </div>
          <div>
            <h2 className="text-lg font-bold">LeetCode</h2>
            <p className="text-xs text-gray-500">@{username}</p>
          </div>
        </div>
        <a
          href={`https://leetcode.com/${handle}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-yellow-500"
        >
          <ArrowUpRight size={20} />
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <p className="text-gray-500">Total Solved</p>
          <p className="text-2xl font-bold">{all}</p>
        </div>
        <div>
          <p className="text-gray-500">Contest Rating</p>
          <p className="text-2xl font-bold">
            {typeof contestRating === 'number' ? Math.round(contestRating) : 'Unrated'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Easy</p>
          <span className="inline-block bg-green-100 text-green-600 font-semibold text-lg px-2 py-0.5 rounded">
            {easy}
          </span>
        </div>
        <div>
          <p className="text-gray-500">Medium</p>
          <span className="inline-block bg-yellow-100 text-yellow-600 font-semibold text-lg px-2 py-0.5 rounded">
            {medium}
          </span>
        </div>
        <div>
          <p className="text-gray-500">Hard</p>
          <span className="inline-block bg-red-100 text-red-600 font-semibold text-lg px-2 py-0.5 rounded">
            {hard}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-4 text-sm text-gray-600 flex items-center">
        <TrendingUp size={16} className="mr-1" />
        Streak: {streak} days
      </div>
    </div>
  );
};

export default LeetcodeCard;
