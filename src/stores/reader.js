// Importing modules
import { writable } from "svelte/store";
import cache from "./cache";

// Store itself
const store = () => {
  // Getting some required methods
  let obj = {
    theme: {
      background: ""
    },
    text: {
      color: "inherit",
      opacity: "80",
      size: ""
    }
  };

  const { subscribe, update } = writable(obj);

  // And now let's build and return this store
  return {
    subscribe,

    changeSetting: (setting, value) => {

    }
  }
};

export default store();