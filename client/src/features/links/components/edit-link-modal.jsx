import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const EditLinkModal = ({ link, onClose, onUpdate }) => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (link) {
      reset({
        title: link.title,
        url: link.url,
        isActive: link.isActive,
      });
    }
  }, [link, reset]);

  if (!link) return null;

  const submitHandler = async (data) => {
    await onUpdate(link._id, {
      ...data,
      isActive: data.isActive === true || data.isActive === "true",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Edit Link</h2>
          <button type="button" onClick={onClose} className="text-zinc-400">
            <X size={20} />
          </button>
        </div>

        <input {...register("title", { required: true })} className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl px-4 py-3 outline-none" />

        <input {...register("url", { required: true })} className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl px-4 py-3 outline-none" />

        <select {...register("isActive")} className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl px-4 py-3 outline-none">
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button disabled={isSubmitting} className="w-full bg-white text-black rounded-2xl py-3 font-semibold">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditLinkModal;