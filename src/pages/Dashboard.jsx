import { UpcomingContests, LeetcodeCard, CodechefCard, CodeforcesCard } from '../components';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Competitive Programming Dashboard</h1>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <CodechefCard handle="jagadish_55_5" />
        <CodeforcesCard handle="jagadish555" />
        <LeetcodeCard handle="wsrEscpkSP" />
      </div>

      {/* Upcoming Contests Section */}
      <UpcomingContests />
    </div>
  );
}

export default Dashboard;
