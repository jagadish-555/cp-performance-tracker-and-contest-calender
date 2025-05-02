import { useEffect, useState } from 'react';
import authService from '../appwrite/auth'; // Adjust path if needed

function Card() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await authService.getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Platform IDs</h2>
      <p><strong>Codeforces:</strong> {profile.codeforcesId || "Not set"}</p>
      <p><strong>LeetCode:</strong> {profile.leetcodeId || "Not set"}</p>
      <p><strong>CodeChef:</strong> {profile.codechefId || "Not set"}</p>
    </div>
  );
}

export default Card;
