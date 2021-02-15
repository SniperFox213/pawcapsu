// Importing modules
import axios from "axios";
import { urls } from "../../config/api"; 

// Exporting default function
export default async (id) => {
  let profile;

  // And now let's make request to external
  // API
  profile = await axios.get(`${urls.internal.url}/profile/${id}`);
  return profile.data;
};