<script>
	// Declaring variables

	// @variable loaded
	// Determines if the component is loaded
	// or no (required for transition to work)
	let loaded = false;
	
	// Importing animations
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	// Let's now change our loaded state on component mount.
	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 25)
	});
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
</style>

{ #if loaded }
	<main in:fade class="bg-black w-full h-100vh flex items-center justify-center">
		<!-- Coming soon Screen -->
		<div class="flex flex-col items-center">
			<!-- Logotype -->
			<div>
				<svg style="height: 3.5rem; width: 3.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.24 181.66"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M140.38,119.5,112.45,91.57a37.23,37.23,0,0,0-52.16,0L32.86,119a36.42,36.42,0,0,0,0,51.5h0a36.42,36.42,0,0,0,51.5,0l2-2L88.88,171a36.42,36.42,0,0,0,51.5,0h0A36.42,36.42,0,0,0,140.38,119.5Z"/><ellipse class="cls-1" cx="22.2" cy="71.96" rx="21.36" ry="31.57" transform="matrix(0.97, -0.26, 0.26, 0.97, -17.87, 8.2)"/><ellipse class="cls-1" cx="151.04" cy="71.96" rx="31.57" ry="21.36" transform="translate(42.44 199.23) rotate(-75)"/><ellipse class="cls-1" cx="63.26" cy="31.57" rx="21.36" ry="31.57"/><ellipse class="cls-1" cx="112.67" cy="31.57" rx="21.36" ry="31.57"/></g></g></svg>
			</div>

			<!-- Texts -->
			<div class="text-center w-1/3 mt-8">
				<!-- Big Title -->
				<h1 class="text-2xl text-white">Social network for all <span style="font-family: 'Permanent Marker', cursive;" class="text-xl text-red-400">PAWs</span> related things.</h1>

				<p class="text-xs text-gray-100 mt-12">The site was conceived as a place for all <span class="border-b-1 border-dotted border-gray-300">Paw Patrol</span> and <span class="border-b-1 border-dotted border-gray-300">101 Dalmatian street</span> fans. We want to create a convenient tool for both content creators and consumers. This site is under development.</p>
			</div>

			<!-- Button -->
			<div class="mt-12 text-center">
				<button class="opacity-75 cursor-not-allowed px-4 py-1 bg-white text-black rounded-md text-sm">
					Subscribe to updates
				</button>
				
				<!--  -->
				<p class="text-xs text-gray-100 mt-1">Coming soon</p>
			</div>
		</div>
	</main>
{ /if }