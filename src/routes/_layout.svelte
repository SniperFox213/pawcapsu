<script>
	// Importing modules
	import { onMount } from "svelte";

	// Importing stores
	import { stores } from "@sapper/app";
	const { page } = stores();

	import cache from "../stores/cache.js";
	import profile from "../stores/profile.js";

	// Importing components
	import { 
		Sidebar, 
		Icon 
	} from "../components";

	let step   = null;
	let loaded = false;

	// onMount event
	onMount(() => {
		step = "cache";
		cache.initializeCache()
		.then(() => {
			// And now let's load our user
			// profile
			step = "profile";
			profile.initialize()
			.then(() => {
				loaded = true;
			}).catch(() => {
				step = "error";
			});
		}).catch(() => {
			step = "error";
		});
	});
</script>

{ #if !loaded }
	<!-- Loader screen -->
	<main class="w-full h-screen bg-dark flex flex-col justify-center items-center">
		<!-- Logotype -->
		<img class="w-8 h-8 mb-2" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1610810215/logotypes/pawcapsu-white-small.svg" alt="pawcapsu logotype">

		<!-- Texts -->
		{ #if step == "cache" }
			<p class="text-sm text-gray-100 opacity-70">Загружаем кэш...</p>
		{ :else if step == "profile" }
			<p class="text-sm text-gray-100 opacity-70">Загружаем профиль...</p>
		{ :else if step == "error" }
			<h1 class="text-2xl mt-2 text-white font-medium">Произошла какая-то ошибка</h1>
			<p class="w-1/3 mt-4 text-center text-sm text-gray-100 opecity-70">Мы без понятия что именно произошло. Попробуйте просто перезагрузить страничку<br /><br />Если проблема продолжиться - обратитесь к Администрации ресурса, используя ссылки ниже:<br/><span class="text-xs text-gray-100 opacity-60">Ну или попробуйте всё сами починить :></span></p>

			<!-- Buttons -->
			<div class="mt-4 w-1/3 flex justify-center items-center">
				<!-- Contact -->
				<button class="flex w-1/2 items-center justify-center py-1 rounded-md bg-indigo-400">
          <p class="text-xs text-white font-medium">Связаться с Администрацией</p>
        </button>

				<!-- Fix -->
				<button class="flex w-1/2 ml-2 items-center justify-center py-1 rounded-md bg-indigo-400 opacity-65">
          <p class="text-xs text-white font-medium">Документация</p>
        </button>
			</div>
		{ :else }
			<p class="text-sm text-gray-100 opecity-70">Просто что-то загружаем...</p>
		{ /if }
	</main>
{ :else }
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
					{ #if $profile.avatar == null }
						<div class="w-7 md:w-8 h-7 md:h-8 rounded-full border border-indigo-400 flex justify-center items-center">
							<Icon name="feather" attrs={{ class: "text-white w-4 h-4" }} />
						</div>
					{ /if }

					<!-- Name -->
					<div class="hidden md:block ml-2">
						<h2 class="text-md text-white font-medium">{ $profile.displayName }</h2>
						<p class="text-xs text-gray-100 opacity-60">@{ $profile.nickname }</p>
					</div>

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
			<div style="overflow: hidden; overflow-y: auto;" class="relative w-full flex-grow">
				<div class="absolute inset-0 w-full h-full">
					<slot></slot>
				</div>
			</div>
		</div>
	</main>
{ /if }