import { UserData, UserModalProps, UserProps } from "@/interfaces";
import { useState, useEffect, FormEvent } from "react";

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSubmit, userToEdit }) => {
  const [user, setUser] = useState<UserData>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: ""
  });

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    } else {
      setUser({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
      });
    }
  }, [userToEdit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Cast 'user' to UserProps to match the prop's expected signature
    onSubmit(user as UserProps);
    setUser({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: ""
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{userToEdit ? "Edit User" : "Add New User"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Website</label>
            <input
              type="text"
              value={user.website}
              onChange={(e) => setUser({ ...user, website: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            {userToEdit ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
