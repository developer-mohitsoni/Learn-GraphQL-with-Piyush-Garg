const { app, startApolloServer } = require("./src/app");

const PORT = 8000;

const startServer = async () => {
	await startApolloServer();

	app.listen(PORT, () => {
		console.log(`Server is running at http://localhost:${PORT}/graphql`);
	});
};

startServer();
