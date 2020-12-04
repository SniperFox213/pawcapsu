<script>
	// Let's now import our styles component
	import styles from "../components/styles.svelte";
	import { fade } from "svelte/transition";

	import profile from "../stores/profile.js";

	// Let's now check something very important...
	import Cookie from "cookie-universal";
	const cookies = Cookie();

	import { goto } from "@sapper/app"; 
	import { onMount } from "svelte";

	let loaded = false;

	onMount(() => {
		if (!cookies.get('guide')) {
			goto('/guide');
		};

		// And now let's try to load our user up.
		setTimeout(() => {
			if (!cookies.get('token')) {
				// User isn't logged in.
				profile.forceProfile({ id: 0 });
			} else {
				// Let's try to load our user data.
				profile.loadProfile(cookies.get('token'));
			};
		}, 1000);
	});
</script>

<!-- Importing some fonts -->
<style>
	@import url('https://fonts.googleapis.com/css2?family=Manrope&display=swap');

	#logo {
		animation: pulse 1.5s infinite ease-in-out;
	}

	@keyframes pulse {
		0%   { opacity: 100% }
		50%  { opacity: 50% }
		100% { opacity: 100% }
	}
</style>

<svelte:head>
	<title>paw universes</title>

	<!-- Favicons and other things -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="theme-color" content="#ffffff">
</svelte:head>

{ #if $profile.id == null }
	<div transition:fade style="z-index: 2;" class="fixed w-full h-full bg-black flex justify-center items-center">
		<!-- Logotype -->
    <svg id="logo" style="height: 2rem; width: 2rem;" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 173.24 181.66"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M140.38,119.5,112.45,91.57a37.23,37.23,0,0,0-52.16,0L32.86,119a36.42,36.42,0,0,0,0,51.5h0a36.42,36.42,0,0,0,51.5,0l2-2L88.88,171a36.42,36.42,0,0,0,51.5,0h0A36.42,36.42,0,0,0,140.38,119.5Z"/><ellipse class="cls-1" cx="22.2" cy="71.96" rx="21.36" ry="31.57" transform="matrix(0.97, -0.26, 0.26, 0.97, -17.87, 8.2)"/><ellipse class="cls-1" cx="151.04" cy="71.96" rx="31.57" ry="21.36" transform="translate(42.44 199.23) rotate(-75)"/><ellipse class="cls-1" cx="63.26" cy="31.57" rx="21.36" ry="31.57"/><ellipse class="cls-1" cx="112.67" cy="31.57" rx="21.36" ry="31.57"/></g></g></svg>
	</div>
{ /if }

<main class="relative" style="z-index: 1; font-family: 'Manrope', sans-serif;">
	<slot></slot>
</main>