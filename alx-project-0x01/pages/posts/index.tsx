import PostCard from "@/components/common/PostCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PostData, PostProps } from "@/interfaces";
import PostModal from "@/components/common/PostModal";
import { useState } from "react";

const Posts: React.FC<{ posts: PostProps[] }> = ({ posts: initialPosts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>(initialPosts);
  const [post, setPost] = useState<PostData | null>(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setPost(null);
  };

  const handlePostSubmit = (newPost: PostData) => {
    if (newPost.id) {
      // Logic for editing an existing post
      setPosts(posts.map(p => p.id === newPost.id ? { ...p, ...newPost } : p));
    } else {
      // Logic for adding a new post
      const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
      const postWithId = { ...newPost, id: newId, userId: 1 };
      setPosts([postWithId, ...posts]);
    }
    handleCloseModal();
  };

  const handleEdit = (postToEdit: PostData) => {
    setPost(postToEdit);
    handleOpenModal();
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Post Content</h1>
          <button
            onClick={handleOpenModal}
            className="bg-blue-700 px-4 py-2 rounded-full text-white hover:bg-blue-800 transition"
          >
            Add Post
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          {
            posts?.map((p: PostProps, key: number) => (
              <PostCard
                key={key}
                title={p.title}
                body={p.body}
                userId={p.userId}
                id={p.id}
              />
            ))
          }
        </div>
      </main>
      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handlePostSubmit}
        postToEdit={post}
      />
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return {
    props: {
      posts
    }
  }
}

export default Posts;
