import { useQuery, gql } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      completed
      user {
        id
        name
        username
        email
        phone
        website
      }
    }
  }
`;

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p className="text-blue-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Todos List</h2>

      {data?.getTodos?.length > 0 ? (
        <ul className="space-y-6">
          {data.getTodos.map((todo, index) => (
            <li
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">{todo.title}</h3>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    todo.completed
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </div>

              {/* User Information */}
              <div className="mt-2 border-t border-gray-200 pt-3 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Name:</span>{" "}
                  {todo.user.name}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Username:</span>{" "}
                  {todo.user.username}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {todo.user.email}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  {todo.user.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Website:</span>{" "}
                  <a
                    href={`https://${todo.user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {todo.user.website}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No todos found.</p>
      )}
    </div>
  );
};

export default Todos;
