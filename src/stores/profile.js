// Importing modules
import { writable } from "svelte/store";
import bookmarks from "./bookmarks";

import Cookie from "cookie-universal";
const cookies = Cookie();

// Importing actions
import { loadProfile, createProfile } from "../actions/profile";
import moment from "moment";

// Store itself
const store = () => {
  // Getting some required methods
  const { subscribe, update } = writable({});

  // And now let's build and return this store
  return {
    subscribe,

    // Function to initialize our profile
    initialize: () => {
      return new Promise((resolve, reject) => {
        // Let's firstly get our profile token
        // from our cookie storage
        const token = cookies.get('token');

        if (token == null) {
          // Creating new account
          createProfile()
          .then((response) => {
            // And now let's update our store with
            // user information
            update(() => {
              resolve(response);
              return response;
            });

            // And let's save our token to
            // our cookies
            cookies.set("token", "$" + response.token._id, {
              path: "/",
              expires: moment().add('1', 'year').toDate()
            });
          }).catch(() => {
            reject();
          });
        } else {
          // Loading our account information
          loadProfile(token)
          .then((response) => {
            // Updating our store
            update(() => {
              resolve(response);
              return response;
            });
          }).catch(() => {
            reject();
          });
        };
      });
    }
  }
};

export default store();