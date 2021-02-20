// Importing modules
import { writable } from "svelte/store";
import storage from "local-storage";

// Store itself
const store = () => {
  // Getting some required methods
  const { subscribe, update } = writable({});

  // And now let's build and return this store
  return {
    subscribe,

    
  }
};

export default store();