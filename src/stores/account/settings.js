// Importing modules
import { writable } from "svelte/store";
import cache from "../cache";

// Store itself
const store = () => {
  // Getting some required methods
  let obj = {
    reader: {
      theme: {
        choosen: false,

        // Needed values
        iconColor: "#000",
        header: {
          background: "#1f1d2b"
        },

        container: {
          background: "#1f1d2b",
        },
        
        text: {
          size: 16,
          color: "inherit",
          opacity: 80
        }
      }
    }
  };

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