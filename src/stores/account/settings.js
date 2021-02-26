// Importing modules
import { writable } from "svelte/store";
import cache from "../cache";

// Store itself
const store = () => {
  // Getting some required methods
  let obj = {};

  // TODO
  // Get all user settings from cloud

  const { subscribe, update } = writable(obj);

  // And now let's build and return this store
  return {
    subscribe,

    setSetting: (setting, value) => {
      update((obj) => {
        obj[setting] = value;

        // TODO
        // Upload this settings to cloud

        return obj;
      });
    },
  }
};

export default store();