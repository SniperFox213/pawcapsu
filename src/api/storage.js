// Importing modules
import fauna from "faunadb";
import config from "../config/default.json";

const client = new fauna.Client({ secret: config.storage.secret });

// And now let's export our datastorage
// instance 
export default client;