<script>
	// Declaring variables

	// @variable loaded
	// Determines if the component is loaded
	// or no (required for transition to work)
	let loaded = false;
	
	// Importing animations
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	// Importing components
	import Header from "../components/Layout/Header/index.svelte";

	// Importing PROTOTYPE components
  import Hero from "../components/prototype/Hero.svelte";

	// Let's now change our loaded state on component mount.
	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 25)
	});

	let posts = [1,2,3,4,5,6,7,8];
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
</style>

{ #if loaded }
	<div in:fade class="relative bg-black">
		<Header />

		<main style="z-index: 1;" class="bg-gray-100 w-full flex flex-col items-center justify-center">

      <!-- Hero -->
      <Hero />

			<!-- Content -->
			<div class="w-full h-full flex flex-col md:flex-row flex-wrap justify-center px-2 py-16 pt-36">
        <!-- Navbar -->

        { #each posts as post }
					<div class="w-full md:w-1/2 lg:w-1/4 px-2 py-2 relative">
						<!-- Post Content
						@type: Image Submission -->
						<div style="padding-top: 100%; background-image: url('https://source.unsplash.com/random/900x900'); background-size: cover; background-repeat: no-repeat;" class="relative w-full">
							<!-- Overlay -->
							<div style="background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%);" class="absolute inset-0 w-full h-full flex items-end">
								<!-- Text and some Statistics -->

								<div class="w-full py-2 px-3">
									<!-- Submission name -->
									<span class="flex items-center">
										<!-- Type Icon -->
										<svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
										<p class="text-white text-xl font-semibold ml-1">Some text</p>
									</span>

									<!-- Submission author -->
									<p class="text-gray-100 text-sm">by <span class="border-b-1 border-dotted border-gray-700">Juiipup</span></p>
								
									<!-- Statistics -->
									<div class="w-full flex justify-start mt-1">
										<!-- Likes -->
										<span class="mr-3 flex items-center">
											<svg style="width: 0.8rem; height: 0.8rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
											<p class="text-extra-xs text-gray-500 ml-1">212</p>
										</span>

										<!-- Comments -->
										<span class="mr-3 flex items-center">
											<svg style="width: 0.8rem; height: 0.8rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
											<p class="text-extra-xs text-gray-500 ml-1">16</p>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				{ /each }
			</div>
		</main>
	</div>
{ /if }