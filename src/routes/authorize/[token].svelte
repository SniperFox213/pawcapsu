<script>
  // Importing modules
  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";
  import moment from "moment";

  import Cookie from "cookie-universal";
  const cookies = Cookie();

  import { onMount } from "svelte";
  import profile from "../../stores/profile.js";

  import { stores } from "@sapper/app";
  const { page } = stores();

  onMount(() => {
    // Now let's try to load this user's
    // information using Profile Store
    profile.loadProfile($page.params.token)
    .then(() => {
      // And now we need to save this user's
      // token as cookie and redirect
      // user to main page.
      cookies.set('token', $page.params.token, { path: "/", expires: moment().add('1', 'year').toDate() });

      goto('/');
    }).catch((error) => {
      // Error
    });
  });
</script>

<main class="w-full h-screen bg-black flex flex-col items-center justify-center">
  <!-- Logotype -->
  <svg style="height: 2rem; width: 2rem;" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 173.24 181.66"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M140.38,119.5,112.45,91.57a37.23,37.23,0,0,0-52.16,0L32.86,119a36.42,36.42,0,0,0,0,51.5h0a36.42,36.42,0,0,0,51.5,0l2-2L88.88,171a36.42,36.42,0,0,0,51.5,0h0A36.42,36.42,0,0,0,140.38,119.5Z"/><ellipse class="cls-1" cx="22.2" cy="71.96" rx="21.36" ry="31.57" transform="matrix(0.97, -0.26, 0.26, 0.97, -17.87, 8.2)"/><ellipse class="cls-1" cx="151.04" cy="71.96" rx="31.57" ry="21.36" transform="translate(42.44 199.23) rotate(-75)"/><ellipse class="cls-1" cx="63.26" cy="31.57" rx="21.36" ry="31.57"/><ellipse class="cls-1" cx="112.67" cy="31.57" rx="21.36" ry="31.57"/></g></g></svg>

  <!-- Text -->
  <h1 class="text-sm text-white font-medium opacity-75 mt-2">Обрабатываем...</h1>
</main>