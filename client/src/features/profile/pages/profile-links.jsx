import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { ArrowLeft, ExternalLink, Link2 } from "lucide-react";

import { getPublicProfile } from "../services/profile.service";

const ProfileLinks = () => {
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
        Loading links...
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
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-md mx-auto">
        <RouterLink
          to={`/${username}`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
        >
          <ArrowLeft size={18} />
          Back to profile
        </RouterLink>

        <div className="text-center mb-8">
          <img
            src={
              profile.avatar ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`
            }
            alt={profile.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 border border-zinc-800 object-cover"
          />

          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-zinc-400 mt-1">@{profile.username}</p>

          {profile.bio && (
            <p className="text-zinc-300 mt-4 leading-relaxed">{profile.bio}</p>
          )}
        </div>

        <div className="space-y-4">
          {links.length === 0 ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center">
              <Link2 className="mx-auto text-zinc-500 mb-3" />
              <p className="text-zinc-400">No active links yet.</p>
            </div>
          ) : (
            links.map((link) => (
              <a
                key={link._id}
                href={`/api/links/click/${link._id}`}
                target="_blank"
                rel="noreferrer"
                className="group bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between transition"
              >
                <span className="font-semibold">{link.title}</span>

                <ExternalLink
                  size={18}
                  className="text-zinc-500 group-hover:text-white"
                />
              </a>
            ))
          )}
        </div>

        <p className="text-center text-zinc-600 text-sm mt-8">
          Made with LinkHub
        </p>
      </div>
    </div>
  );
};

export default ProfileLinks;