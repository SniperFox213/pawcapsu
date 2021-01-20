// Importing modules
import client from "../../storage.js";
import { query as q } from "faunadb";

// Our Module function
const func = (id) => {
  return new Promise((resolve, reject) => {
    // And now let's try to find this user.
    client.query(
      q.Get(
        q.Match(
          q.Index("SearchById"),
          id
        )
      )
    ).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  });
};

// And now let's export our module function
export default func;