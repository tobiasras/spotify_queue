//* Link til sockets with react: https://socket.io/how-to/use-with-react
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';

export const socket = io(`${process.env.REACT_APP_SERVER_URL}`);
