// Dashboard.jsx
import { UpcomingContests } from '../components';
import Card from '../components/Card';
function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1>hello world</h1>
      <Card />
      <UpcomingContests />
    </div>
  );
}

export default Dashboard;