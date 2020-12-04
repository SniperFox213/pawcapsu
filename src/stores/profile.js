import { writable } from "svelte/store";
import axios from "axios";

function createProfileStore() {
  let profile = {
    id: null,
    
    displayName: null,
    email: null,

    avatar: null,
    provider: null
  };

  // Let's now "import" some important
  const { subscribe, update } = writable(profile);

  return {
    subscribe,

    // Function, that'll load our user information
    loadProfile: (token) => {
      return new Promise((resolve, reject) => {
        // Let's now try to connect to authed
        // servers and try to get some information
        // about this token.
        axios.get(`https://authed.unfull.ml/api/token/${token}`)
        .then((response) => {
          const data = response.data.data;

          // And now let's update our store.
          update((store) => {
            store.id = data.pid;
            
            store.displayName = data.profile.displayName;
            store.email = data.profile.emails[0].value;

            store.avatar = data.profile.photos[0].value;
            store.provider = data.profile.provider;
            
            resolve(store);
            return store;
          }).catch((error) => {
            reject(error);
          });
        })
      });
    },

    // Function, that'll force our user's profile
    // data to the store.
    forceProfile: (profile) => {
      update(() => {
        return profile;
      });
    }
  }
};

export default createProfileStore();