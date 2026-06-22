import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Link2 } from "lucide-react";

import { getPublicProfile } from "../services/profile.service";

const dummyImages = [
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  "https://images.unsplash.com/photo-1781694949169-8dad95b59995?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
];

const Profile = () => {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const result = await getPublicProfile(username);

      setProfile(result.data.profile);
      setLinks(result.data.links || []);
    } catch (error) {
      console.log(error.response?.data);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Profile not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <h1 className="text-xl font-bold">{profile.username}</h1>
          <p className="text-sm text-zinc-500">LinkHub</p>
        </div>

        <section className="flex gap-6 sm:gap-12 items-center mb-6">
          <img
            src={
              profile.avatar ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`
            }
            alt={profile.name}
            className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border border-zinc-800"
          />

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-5">
              <h2 className="text-xl">{profile.username}</h2>

              <RouterLink
                to={`/${profile.username}/links`}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2"
              >
                <Link2 size={16} />
                Links
              </RouterLink>
            </div>

            <div className="flex gap-6 text-sm sm:text-base mb-5">
              <p>
                <span className="font-bold">{dummyImages.length}</span> posts
              </p>
              <p>
                <span className="font-bold">1.2k</span> followers
              </p>
              <p>
                <span className="font-bold">{links.length}</span> links
              </p>
            </div>

            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="text-zinc-300 text-sm mt-1">
                {profile.bio || "Building cool things on the internet 🚀"}
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-zinc-800 pt-4">
          <div className="flex justify-center mb-4">
            <span className="text-sm font-semibold border-t border-white pt-3">
              POSTS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {dummyImages.map((image, index) => (
              <img
                key={image}
                src={`${image}?auto=format&fit=crop&w=500&q=80`}
                alt={`post-${index}`}
                className="aspect-square w-full object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
