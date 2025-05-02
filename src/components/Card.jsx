import { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa';

const platformInfo = [
  {
    name: 'Codeforces',
    key: 'codeforcesId',
    color: 'bg-red-50',
    api: 'codeforces',
    badge: 'Expert',
    profileUrl: (handle) => `https://codeforces.com/profile/${handle}`
  },
  {
    name: 'LeetCode',
    key: 'leetcodeId',
    color: 'bg-yellow-50',
    api: 'leetcode',
    badge: 'Advanced',
    profileUrl: (handle) => `https://leetcode.com/${handle}`
  },
  {
    name: 'CodeChef',
    key: 'codechefId',
    color: 'bg-green-50',
    api: 'codechef',
    badge: '4 Star',
    profileUrl: (handle) => `https://www.codechef.com/users/${handle}`
  }
];

function PlatformCard({ title, data, color, badge, handle, profileUrl }) {
  return (
    <div className={`p-5 rounded-xl shadow-sm border ${color}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <FaCode className="text-xl text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {badge && (
              <span className="mt-1 inline-block text-xs font-medium text-white bg-gray-700 px-2 py-0.5 rounded">
                {badge}
              </span>
            )}
          </div>
        </div>
        {handle && (
          <a
            href={profileUrl(handle)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
          >
            View Profile <FaExternalLinkAlt className="text-xs" />
          </a>
        )}
      </div>

      {!handle ? (
        <p className="mt-6 text-gray-500 text-sm italic">
          Handle not linked.
        </p>
      ) : !data ? (
        <p className="mt-6 text-gray-500 text-sm italic">
          No data found or failed to fetch.
        </p>
      ) : (
        <>
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {data.rating && (
              <p>
                Current Rating: <strong>{data.rating}</strong>
              </p>
            )}
            {data.maxRating && (
              <p>
                Max Rating: <strong>{data.maxRating}</strong>
              </p>
            )}
            {data.globalRank && (
              <p>
                Global Rank: <strong>#{data.globalRank}</strong>
              </p>
            )}
          </div>

          {data.contests?.length > 0 ? (
            <div className="mt-4 border-t pt-3 text-sm text-gray-600">
              <p className="font-medium">Last Contest:</p>
              <p>{data.contests[0].contestName}</p>
              <p>Rank: {data.contests[0].rank}</p>
            </div>
          ) : data.totalSolved ? (
            <div className="mt-4 border-t pt-3 text-sm text-gray-600">
              <p>
                Problems Solved: <strong>{data.totalSolved}</strong>
              </p>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default function CompetitiveProfileCards() {
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await authService.getUserProfile();
        setProfile(user);

        const results = await Promise.all(
          platformInfo.map(async ({ key, api }) => {
            const handle = user?.[key];
            if (!handle) return { api, data: null };

            try {
              const res = await fetch(
                `https://competeapi.vercel.app/user/${api}/${handle}/`
              );
              const json = await res.json();

              // Each API returns [info, { ratings }]
              if (Array.isArray(json)) {
                const [info, contestObj] = json;
                return {
                  api,
                  data: {
                    ...info,
                    contests: contestObj?.ratings || []
                  }
                };
              } else {
                return { api, data: null };
              }
            } catch (err) {
              console.error(`Failed to fetch ${api} data`, err);
              return { api, data: null };
            }
          })
        );

        const resultMap = {};
        results.forEach(({ api, data }) => {
          resultMap[api] = data;
        });

        setData(resultMap);
      } catch (err) {
        console.error('Error loading profile data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading user data...</div>;

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Platforms</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {platformInfo.map(({ name, key, api, color, badge, profileUrl }) => (
            <PlatformCard
              key={api}
              title={name}
              data={data[api]}
              color={color}
              badge={badge}
              handle={profile?.[key]}
              profileUrl={profileUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
