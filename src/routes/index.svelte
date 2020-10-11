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

	let button01Hovered = false;
	let button02Hovered = false;
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
</style>

{ #if loaded }
	<div in:fade class="relative bg-black">
		<!-- Header -->
		<header style="z-index: 1;" class="bg-black fixed w-full px-4 py-2 md:px-12 flex justify-between items-center">
			<!-- Logotype -->
			<button on:mouseover={(e) => button02Hovered = true} on:mouseout={(e) => button02Hovered = false} class="px-2 py-2 rounded-md hover:bg-white">
				<svg style="height: 1.4rem; width: 1.4rem;" xmlns="http://www.w3.org/2000/svg" fill="{ button02Hovered ? "#000" : "#fff" }" viewBox="0 0 173.24 181.66"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M140.38,119.5,112.45,91.57a37.23,37.23,0,0,0-52.16,0L32.86,119a36.42,36.42,0,0,0,0,51.5h0a36.42,36.42,0,0,0,51.5,0l2-2L88.88,171a36.42,36.42,0,0,0,51.5,0h0A36.42,36.42,0,0,0,140.38,119.5Z"/><ellipse class="cls-1" cx="22.2" cy="71.96" rx="21.36" ry="31.57" transform="matrix(0.97, -0.26, 0.26, 0.97, -17.87, 8.2)"/><ellipse class="cls-1" cx="151.04" cy="71.96" rx="31.57" ry="21.36" transform="translate(42.44 199.23) rotate(-75)"/><ellipse class="cls-1" cx="63.26" cy="31.57" rx="21.36" ry="31.57"/><ellipse class="cls-1" cx="112.67" cy="31.57" rx="21.36" ry="31.57"/></g></g></svg>
			</button>

			<!-- User-related -->
			<div class="flex items-center">
				<!-- User Avatar -->
				<div style="width: 2rem; height: 2rem; background-image: url('https://static.wikia.nocookie.net/101dalmatianstreet/images/c/c4/Dylan.jpeg/revision/latest/scale-to-width-down/310?cb=20200208005325'); background-repeat: no-repeat; background-position: center; background-size: auto;" class="rounded-full mx-2"></div>

				<!-- Control Panel -->
				<button on:mouseover={(e) => button01Hovered = true} on:mouseout={(e) => button01Hovered = false} class="px-2 py-2 mx-2 hover:bg-white rounded-md relative">
					<svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ button01Hovered ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
				
					<span class="absolute top-0 right-0 rounded-full w-4 h-4 text-white flex items-center justify-center bg-red-400">
						<p class="block text-extra-xss">9+</p>
					</span>
				</button>
			</div>
		</header>

		<!-- Maskot: Helper
		<div style="z-index: 0;" class="absolute inset-x-0 top-0 w-full text-white">
			<div>
				#Arrow icon
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="60"><g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><path d="M19.409 6.077C14.118 8.315 5.456 11.935 4.693 18.628c-.676 5.938 5.108 11.437 8.879 15.21 5.497 5.502 24.226 21.344 6.303 23.567-5.914.733-11.722-.262-17.337-2.13"/><path d="M19.307 13.743c.426-4.367 3.978-6.833 5.197-10.849-3.177.411-9.656.953-12.678-.541"/></g></svg>

				#Text Area
				<div class="rounded-md">
					<p class="text-white text-sm">- Тут ты сможешь найти весь функционал этого сайта! Тоесть все странички, отдельные сервисы и другую подобную мишуру!</p>
				</div>
			</div>
		</div> -->

		<main style="z-index: 1;" class="bg-gray-100 w-full h-100vh flex items-center justify-center">
			<p class="text-black text-3xl">WIP</p>	
		</main>
	</div>
{ /if }