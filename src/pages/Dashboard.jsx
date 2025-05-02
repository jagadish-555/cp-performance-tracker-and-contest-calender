import { useEffect, useState } from 'react';
import { UpcomingContests, LeetcodeCard, CodechefCard, CodeforcesCard } from '../components';
import authService from '../appwrite/auth';

function Dashboard() {
  const [handles, setHandles] = useState({
    codeforcesId: '',
    leetcodeId: '',
    codechefId: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await authService.getUserProfile();
        setHandles({
          codeforcesId: profile.codeforcesId,
          leetcodeId: profile.leetcodeId,
          codechefId: profile.codechefId,
        });
      } catch (err) {
        console.error("Dashboard :: Failed to fetch profile", err);
        setError("Failed to load user profile. Please make sure you're logged in.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 text-xl">
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">Your Competitive Programming Dashboard</h1>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center mb-16">
        <CodechefCard handle={handles.codechefId} />
        <CodeforcesCard handle={handles.codeforcesId} />
        <LeetcodeCard handle={handles.leetcodeId} />
      </div>

      {/* Upcoming Contests Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-7xl mx-auto">
        <UpcomingContests />
      </div>
    </div>
  );
}

export default Dashboard;
