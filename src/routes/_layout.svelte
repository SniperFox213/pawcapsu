<script>
	// Importing modules
	import { onMount } from "svelte";

	// Importing stores
	import cache from "../stores/cache.js";
	import profile from "../stores/profile.js";
	import socket from "../socket/io.js";

	import { stores } from "@sapper/app";
	const { page } = stores();

	// Importing components
	import { 
		Sidebar, 
		Header
	} from "../components";

	let step   = null;
	let loaded = false;

	// onMount event
	onMount(() => {
		// And now let's load our user
		// profile
		step = "profile";
		profile.initialize()
		.then(() => {
			step = "cache";
			cache.initializeCache()
			.then(() => {
				// Initializing socket connection
				// socket.initializeConnection();

				setTimeout(() => loaded = true, 250);
			
				// Let's now subscribe to page store
				// to update currentPage information
				page.subscribe((obj) => {
					// Updating current page information
					// in our cache storage
					cache.setCache("currentPage", obj);
				});
			}).catch(() => {
				step = "error";
			});
		}).catch(() => {
			step = "error";
		});
	});
</script>

<svelte:head>
	<title>Пакапсу | Социальная сеть для лапок</title>
</svelte:head>

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
			<p class="text-sm text-gray-100 opacity-70">Просто что-то загружаем...</p>
		{ /if }
	</main>
{ :else }
	<!-- Main -->
	<main class="w-full flex bg-dark">
		<Sidebar />

		<!-- Container -->
		<div style="z-index: 0;" class="w-full relative flex flex-col">
			<Header />

			<!-- Content -->
			<div class="md:overflow-hidden md:overflow-y-auto relative w-full flex-grow pt-16">
				<div class="relative md:absolute inset-0 w-full h-full">
					<slot></slot>
				</div>
			</div>
		</div>
	</main>
{ /if }