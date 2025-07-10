// backend/src/index.ts
import { server } from './app';
const PORT = process.env.PORT || 3001; // Changed from 5000 to 3001

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});