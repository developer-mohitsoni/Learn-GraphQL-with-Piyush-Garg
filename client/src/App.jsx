import Todos from "./components/Todos";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Page Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
          GraphQL with Apollo Client
        </h1>
        <p className="text-gray-600 text-lg text-center max-w-lg mx-auto">
          Manage your todos efficiently using the power of GraphQL and Apollo
          Client. View your tasks, track their status, and get user details with
          ease.
        </p>
      </header>

      {/* Todos Component */}
      <main className="w-full max-w-4xl mx-auto">
        <Todos />
      </main>

      {/* Footer */}
      <footer className="mt-10 text-gray-500">
        <p className="text-sm">Powered by GraphQL & Apollo Client</p>
      </footer>
    </div>
  );
};

export default App;
