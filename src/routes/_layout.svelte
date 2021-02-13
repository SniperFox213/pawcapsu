<script>
	// Importing modules
	import { onMount } from "svelte";

	// Importing stores
	import { stores } from "@sapper/app";
	const { page } = stores();

	import cache from "../stores/cache.js";

	// Importing components
	import { 
		Sidebar, 
		Icon 
	} from "../components";

	let loaded = false;

	// onMount event
	onMount(() => {
		cache.initializeCache()
		.then((response) => {
			setTimeout(() => {
				loaded = true;
			}, 250);
		});
	});
</script>

<!-- Main -->
<main class="w-full h-screen flex bg-dark">
	<Sidebar />

	<!-- Container -->
	<div style="z-index: 0;" class="w-full relative flex flex-col">
		<!-- Header -->
		<div class="w-full flex justify-between items-center h-16 px-8">
			<!-- Pawcapsu Logotype (mobile) -->
			<div class="w-1/6 md:hidden flex items-center">
				<img class="w-7 h-7" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1610810215/logotypes/pawcapsu-white-small.svg" alt="pawcapsu logotype">
			</div>

			<!-- Search -->
			<div class="w-full md:w-2/3 rounded-md py-2 mx-4 md:mx-0 px-4 bg-light-dark flex items-center justify-between">
				<input class="flex-grow bg-light-dark text-white" placeholder="Search" type="text">

				<!-- Icon -->
				<svg class="w-4 h-4 text-light-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
			</div>

			<!-- Account -->
			<div class="w-1/6 md:w-1/3 flex justify-end items-center">
				<!-- Avatar -->
				<div class="w-7 md:w-8 h-7 md:h-8 rounded-full bg-red-400"></div>

				<!-- Name -->
				<h2 class="hidden md:block text-md text-white font-medium ml-2">Marsh Jameson</h2>

				<!-- Buttons -->
				<div class="ml-6 hidden md:flex items-center">
					<!-- Notifications -->
					<button class="mx-1 p-2 relative">
						<!-- Bell Icon -->
						<svg class="w-5 h-5 text-light-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
						
						<!-- Notification badge -->
						<div class="absolute top-0 right-0 mt-1 mr-1 w-3 h-3 bg-red-500 rounded-full"></div>
					</button>

					<!-- Other Services -->
					<button class="mx-1 p-2">
						<!-- Grid Icon -->
						<svg class="w-5 h-5 text-light-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
					</button>

					<!-- Explore-related buttons -->
					{ #if $page.path.includes("explore") }
						<!-- Settings -->
						<button class="mx-1 p-2 relative">
							<!-- Grid Icon -->
							<Icon name="settings" attrs={{ class: "w-5 h-5 text-light-dark" }} />
						
							<div class="absolute top-0 right-0 mt-1 mr-1 w-3 h-3 bg-red-500 rounded-full"></div>
						</button>
					{ /if }
				</div>
			</div>
		</div>
		
		<!-- Content -->
		{ #if loaded }
			<div style="overflow: hidden; overflow-y: auto;" class="relative w-full flex-grow">
				<div class="absolute inset-0 w-full h-full">
					<slot></slot>

					<!-- Footer -->
					<!-- <footer class="w-full mt-16 flex flex-col justify-center items-center opacity-50 pb-8">
						#Logotype
						<img class="w-4 h-4" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1610810215/logotypes/pawcapsu-white-small.svg" alt="">
					
						#Text
						<p class="text-xs text-gray-100 mt-1">Developed by <a class="border-b border-dotted border-gray-100" href="https://unfull.ml">unfull team</a></p>
					</footer> -->
				</div>
			</div>
		{ /if }
	</div>
</main>