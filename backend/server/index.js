import server from './server';

const port = process.env.API_PORT || 4000;
server.listen(port, () => console.log(`API server started on ${port}`));
