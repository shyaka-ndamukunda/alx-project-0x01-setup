import { PostData, PostModalProps } from "@/interfaces";
import { useState, useEffect, FormEvent } from "react";

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onSubmit, postToEdit }) => {
  const [post, setPost] = useState<PostData>({ title: "", body: "" });

  useEffect(() => {
    if (postToEdit) {
      setPost(postToEdit);
    } else {
      setPost({ title: "", body: "" });
    }
  }, [postToEdit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(post);
    setPost({ title: "", body: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{postToEdit ? "Edit Post" : "Add New Post"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Body</label>
            <textarea
              value={post.body}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            {postToEdit ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
