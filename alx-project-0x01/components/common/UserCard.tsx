import { UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({ name, username, email, id }) => {
  return (
    <div className="max-w-xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-600 mt-2">
        <span className="font-medium">Username:</span> {username}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Email:</span> {email}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>User ID: {id}</span>
      </div>
    </div>
  );
};

export default UserCard;