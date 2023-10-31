import http from 'http';

import app from './app.js';
import { init } from './socket.js';

// await init();

const server = http.createServer(app);
const PORT = 8080;


const httpServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});

await init(httpServer);
// server.listen(PORT, () => {
//   console.log(`Server running in http://localhost:${PORT} 🚀`);
// });
