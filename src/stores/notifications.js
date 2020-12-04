import { writable } from "svelte/store";
import axios from "axios";

function createNotificationsStore() {
  // Default store object
  let notifications = [
    1,2,3
  ]

  // "Importing" some needed modules and functions
  const { subscribe, update } = writable(notifications);

  return {
    subscribe

    // Function, that'll start Websocket client
    // and that'll automaticly check for new notifications.
  };
}

export default createNotificationsStore();