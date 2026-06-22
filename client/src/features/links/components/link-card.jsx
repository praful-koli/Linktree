import { Edit, Trash2, MousePointerClick, ExternalLink } from "lucide-react";

const LinkCard = ({ link, onDelete, onEdit, onToggle, onOpen }) => {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{link.title}</h3>
          <p className="text-zinc-400 text-sm break-all mt-1">{link.url}</p>

          <div className="flex items-center gap-2 text-zinc-500 text-sm mt-3">
            <MousePointerClick size={16} />
            <span>{link.clicks || 0} clicks</span>
          </div>
        </div>

        <button
          onClick={() => onToggle(link)}
          className={`text-xs px-3 py-1 rounded-full ${
            link.isActive
              ? "bg-green-500/10 text-green-400"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          {link.isActive ? "Active" : "Inactive"}
        </button>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onOpen(link)}
          className="flex-1 bg-zinc-900 text-white rounded-xl py-2 flex items-center justify-center gap-2"
        >
          <ExternalLink size={16} />
          Open
        </button>

        <button
          onClick={() => onEdit(link)}
          className="flex-1 bg-zinc-900 text-white rounded-xl py-2 flex items-center justify-center gap-2"
        >
          <Edit size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(link._id)}
          className="flex-1 bg-red-500/10 text-red-400 rounded-xl py-2 flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default LinkCard;