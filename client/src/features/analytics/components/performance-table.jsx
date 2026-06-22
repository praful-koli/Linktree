const PerformanceTable = ({ links }) => {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5">
      <h2 className="text-xl font-semibold text-white mb-5">
        Link Performance
      </h2>

      {links.length === 0 ? (
        <p className="text-zinc-400">No links found.</p>
      ) : (
        <div className="space-y-3">
          {links.map((link, index) => (
            <div
              key={link._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-white font-semibold">
                  #{index + 1} {link.title}
                </p>
                <p className="text-zinc-500 text-sm break-all">{link.url}</p>
              </div>

              <div className="text-right">
                <p className="text-white font-bold">{link.clicks || 0}</p>
                <p className="text-zinc-500 text-sm">clicks</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerformanceTable;