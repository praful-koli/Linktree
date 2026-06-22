const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5">
      {Icon && <Icon className="text-zinc-400 mb-3" />}
      <p className="text-zinc-500">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
    </div>
  );
};

export default StatsCard;