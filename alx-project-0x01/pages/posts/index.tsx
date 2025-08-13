import PostCard from "@/components/common/PostCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PostData, PostProps } from "@/interfaces";
import PostModal from "@/components/common/PostModal";
import { useState } from "react";

const Posts: React.FC<{ posts: PostProps[] }> = ({ posts: initialPosts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>(initialPosts);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handlePostSubmit = (newPost: PostData) => {
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const postWithId = { ...newPost, id: newId, userId: 1 };
    setPosts([postWithId, ...posts]);
    handleCloseModal();
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
            posts?.map(({ title, body, userId, id }: PostProps, key: number) => (
              <PostCard title={title} body={body} userId={userId} id={id} key={key} />
            ))
          }
        </div>
      </main>
      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handlePostSubmit}
        postToEdit={null}
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
