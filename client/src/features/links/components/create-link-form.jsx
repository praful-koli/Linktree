import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

const CreateLinkForm = ({ onCreate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    await onCreate(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 space-y-4"
    >
      <h2 className="text-xl font-semibold text-white">Add New Link</h2>

      <input
        {...register("title", { required: true })}
        placeholder="Link title"
        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl px-4 py-3 outline-none"
      />

      <input
        {...register("url", { required: true })}
        placeholder="https://example.com"
        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl px-4 py-3 outline-none"
      />

      <button
        disabled={isSubmitting}
        className="w-full bg-white text-black rounded-2xl py-3 font-semibold flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        {isSubmitting ? "Adding..." : "Add Link"}
      </button>
    </form>
  );
};

export default CreateLinkForm;
