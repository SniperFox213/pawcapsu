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

    // Велосипед
    removeFromLocalStorage: () => {
      update((obj) => {
        obj.fromLocalStorage = null;

        console.log("NEW OBJ");
        console.log(obj);
        return obj;
      });
    },

    // Function, that'll initialize our cache object
    initializeCache: async () => {
      let cache = await storage("cache");
      if (cache != null) {
        update((obj) => {
          obj = cache;
          if (obj == null) obj = {};

          obj.fromLocalStorage = true;

          return obj;
        });
      };
      
      return true;
    },

    // Function to set new cached information
    setCache: (node, data) => {
      // Let's now save this data into
      // our local-storage
      let cache = storage("cache");

      if (cache == null) cache = {};
      cache[node] = data;
      storage.set(`cache`, cache);

      // Updating our store
      update((obj) => {
        obj[node] = data;

        return obj;
      });
    }
  }
};

export default store();