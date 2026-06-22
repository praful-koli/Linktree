import { useEffect, useState } from "react";
import {
  Link2,
  MousePointerClick,
  Activity,
  Copy,
  BarChart3,
} from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import CreateLinkForm from "../components/create-link-form";
import LinkCard from "../components/link-card";
import EditLinkModal from "../components/edit-link-modal";

import {
  createLink,
  getLinks,
  deleteLink,
  updateLink,
} from "../services/link.service";

import { useAuth } from "../../auth/hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState(null);

  const fetchLinks = async () => {
    try {
      const result = await getLinks();
      setLinks(result.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // refresh dashboard when user comes back to this tab
  useEffect(() => {
    const handleFocus = () => {
      fetchLinks();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleCreate = async (data) => {
    try {
      await createLink(data);
      fetchLinks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create link");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this link?");
    if (!confirmDelete) return;

    try {
      await deleteLink(id);
      fetchLinks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete link");
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateLink(id, data);
      fetchLinks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update link");
    }
  };

  const handleToggle = async (link) => {
    try {
      await updateLink(link._id, {
        isActive: !link.isActive,
      });

      fetchLinks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleOpenLink = (link) => {
    window.open(`/api/links/click/${link._id}`, "_blank");

    setTimeout(() => {
      fetchLinks();
    }, 1000);
  };

  const handleCopyProfile = async () => {
    const profileUrl = `${window.location.origin}/${user.username}`;
    await navigator.clipboard.writeText(profileUrl);
    alert("Profile link copied");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const activeLinks = links.filter((link) => link.isActive).length;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center justify-between mb-8">
          <RouterLink to="/dashboard" className="text-2xl font-bold">
            LinkHub
          </RouterLink>

          <div className="flex items-center gap-3">
            <RouterLink
              to="/analytics"
              className="hidden sm:flex bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm items-center gap-2"
            >
              <BarChart3 size={16} />
              Analytics
            </RouterLink>

            <button
              onClick={handleLogout}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm"
            >
              Logout
            </button>
          </div>
        </nav>

        <header className="mb-8">
          <p className="text-zinc-400">Welcome back,</p>
          <h2 className="text-3xl font-bold">{user?.name || "User"} 👋</h2>

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleCopyProfile}
              className="bg-white text-black rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2"
            >
              <Copy size={16} />
              Copy Public Link
            </button>

            <RouterLink
              to={`/${user?.username}`}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm"
            >
              View Profile
            </RouterLink>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5">
            <Link2 className="text-zinc-400 mb-3" />
            <p className="text-zinc-500">Total Links</p>
            <h3 className="text-3xl font-bold">{links.length}</h3>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5">
            <MousePointerClick className="text-zinc-400 mb-3" />
            <p className="text-zinc-500">Total Clicks</p>
            <h3 className="text-3xl font-bold">{totalClicks}</h3>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5">
            <Activity className="text-zinc-400 mb-3" />
            <p className="text-zinc-500">Active Links</p>
            <h3 className="text-3xl font-bold">{activeLinks}</h3>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          <CreateLinkForm onCreate={handleCreate} />

          <div className="space-y-4">
            {loading ? (
              <p className="text-zinc-400">Loading links...</p>
            ) : links.length === 0 ? (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center">
                <p className="text-zinc-400">No links added yet.</p>
              </div>
            ) : (
              links.map((link) => (
                <LinkCard
                  key={link._id}
                  link={link}
                  onDelete={handleDelete}
                  onEdit={setEditingLink}
                  onToggle={handleToggle}
                  onOpen={handleOpenLink}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <EditLinkModal
        link={editingLink}
        onClose={() => setEditingLink(null)}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Dashboard;