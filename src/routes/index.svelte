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
	<main in:fade class="bg-gray-100 w-full h-100vh flex items-center justify-center">
		<!-- Coming soon Screen -->
		<div class="flex flex-col items-center">
			<!-- Logotype -->
			<div>
				<img style="height: 1.2rem;" src="./logotype/black.svg" alt="Black unfull logotype">		
			</div>

			<!-- Texts -->
			<div class="text-center w-2/3 mt-8">
				<!-- Big Title -->
				<h1 class="text-xl text-black">Free, easy and <span style="font-family: 'Permanent Marker', cursive;" class="text-base text-red-400">un</span>needed authorization service</h1>
			</div>

			<!-- Button -->
			<div class="mt-12 text-center">
				<button class="opacity-75 cursor-not-allowed px-4 py-1 bg-black text-white rounded-md text-sm">
					Subscribe to updates
				</button>
				
				<!--  -->
				<p class="text-xs text-gray-800 mt-1">Coming soon</p>
			</div>
		</div>
	</main>
{ /if }