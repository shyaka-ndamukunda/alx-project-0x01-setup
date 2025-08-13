import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { UserData, UserProps } from "@/interfaces";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import { useState } from "react";

const Users: React.FC<{ users: UserProps[] }> = ({ users: initialUsers }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<UserProps[]>(initialUsers);
  const [userToEdit, setUserToEdit] = useState<UserData | null>(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setUserToEdit(null);
  };

  const handleUserSubmit = (newUser: UserData) => {
    if (newUser.id) {
      // Logic for editing an existing user
      setUsers(users.map(u => u.id === newUser.id ? { ...u, ...newUser } : u));
    } else {
      // Logic for adding a new user
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const userWithId = {
        ...newUser,
        id: newId,
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: { lat: "", lng: "" }
        },
        company: {
          name: "",
          catchPhrase: "",
          bs: ""
        }
      };
      setUsers([userWithId, ...users]);
    }
    handleCloseModal();
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">User Contents</h1>
          <button
            onClick={handleOpenModal}
            className="bg-blue-700 px-4 py-2 rounded-full text-white hover:bg-blue-800 transition"
          >
            Add User
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {
            users?.map((user: UserProps, key: number) => (
              <UserCard
                name={user.name}
                username={user.username}
                email={user.email}
                id={user.id}
                key={key}
              />
            ))
          }
        </div>
      </main>
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUserSubmit}
        userToEdit={userToEdit}
      />
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      users
    }
  }
}

export default Users;
