// Importing modules
import { writable } from "svelte/store";
import { io } from "socket.io-client";

import Cookie from "cookie-universal";
const cookies = Cookie();

// Store itself
const store = () => {
  // Getting some required methods
  let socket;
  const { subscribe, update } = writable({});

  // And now let's build and return this store
  return {
    subscribe,

    initializeConnection: () => {
      console.log("INIT");
      return new Promise((resolve, reject) => {
        // Initializing socket connectiion
        let token = cookies.get("token");
        console.log(token);

        if (!token) return reject({ error: "SocketError" });

        // Creating new connection
        socket = io(`http://localhost:3000/?token=${token}`);

        socket.on('connection', () => {
          console.log("CONNECTED");
        });
      })
    },

    getSocket: () => {
      console.log("GET SOCKET");
      console.log(socket);

      return socket;
    }
  }
};

export default store();