// Importing modules
import axios from "axios";
import { urls } from "../../config/api"; 

// Exporting default function
export default async () => {
  let profile;

  // And now let's make request to external
  // API
  profile = await axios.get(`${urls.internal.url}/profile/create`);
  return profile.data;
};