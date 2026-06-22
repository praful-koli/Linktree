import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link2, MousePointerClick, Activity, ArrowLeft } from "lucide-react";

import { useAuth } from "../../auth/hooks/useAuth";
import { getAnalytics } from "../services/analytics.service";

import StatsCard from "../components/stats-card";
import ClicksChart from "../components/clicks-chart";
import PerformanceTable from "../components/performance-table";

const Analytics = () => {
  const { user } = useAuth();

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const result = await getAnalytics(user.username);
      setAnalytics(result.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.username) {
      fetchAnalytics();
    }
  }, [user?.username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading analytics...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Analytics not found
      </div>
    );
  }

  const activeLinks = analytics.linkPerformance.filter(
    (link) => link.isActive
  ).length;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center justify-between mb-8">
          <RouterLink
            to="/dashboard"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Dashboard
          </RouterLink>

          <RouterLink
            to={`/${user.username}`}
            className="bg-white text-black rounded-xl px-4 py-2 text-sm font-semibold"
          >
            View Profile
          </RouterLink>
        </nav>

        <header className="mb-8">
          <p className="text-zinc-400">Analytics Dashboard</p>
          <h1 className="text-3xl font-bold mt-1">
            Track your link performance
          </h1>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Total Links"
            value={analytics.totalLinks}
            icon={Link2}
          />

          <StatsCard
            title="Total Clicks"
            value={analytics.totalClicks}
            icon={MousePointerClick}
          />

          <StatsCard
            title="Active Links"
            value={activeLinks}
            icon={Activity}
          />
        </section>

        <div className="space-y-6">
          <ClicksChart data={analytics.last7DaysActivity || []} />

          <PerformanceTable links={analytics.linkPerformance || []} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;