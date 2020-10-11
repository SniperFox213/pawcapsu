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
	@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
</style>

{ #if loaded }
	<main in:fade class="bg-black w-full h-100vh flex items-center justify-center">
		<!-- Coming soon Screen -->
		<div class="flex flex-col items-center">
			<!-- Logotype -->
			<div class="relative px-3 py-2">
				<svg style="height: 3.5rem; width: 3.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.24 181.66"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M140.38,119.5,112.45,91.57a37.23,37.23,0,0,0-52.16,0L32.86,119a36.42,36.42,0,0,0,0,51.5h0a36.42,36.42,0,0,0,51.5,0l2-2L88.88,171a36.42,36.42,0,0,0,51.5,0h0A36.42,36.42,0,0,0,140.38,119.5Z"/><ellipse class="cls-1" cx="22.2" cy="71.96" rx="21.36" ry="31.57" transform="matrix(0.97, -0.26, 0.26, 0.97, -17.87, 8.2)"/><ellipse class="cls-1" cx="151.04" cy="71.96" rx="31.57" ry="21.36" transform="translate(42.44 199.23) rotate(-75)"/><ellipse class="cls-1" cx="63.26" cy="31.57" rx="21.36" ry="31.57"/><ellipse class="cls-1" cx="112.67" cy="31.57" rx="21.36" ry="31.57"/></g></g></svg>
				<!-- Span -->
				<span class="absolute right-0 bottom-0 text-white font-semibold text-extra-xs">RU</span>
			</div>

			<!-- Texts -->
			<div class="text-center w-2/6 mt-8">
				<!-- Big Title -->
				<h1 class="text-2xl text-white">Социальная сеть для всего связанного с <span style="font-family: 'Caveat', cursive;" class="text-3xl text-red-400">Лапками</span>.</h1>

				<p class="text-xs text-gray-100 mt-6">Главная цель сервиса — это собрать создателей самого разного контента по вселенным мультсериалов <span class="border-b-1 border-dotted border-gray-300">Щенячьего Патруля</span> и <span class="border-b-1 border-dotted border-gray-300">Улицы 101 Далматинца</span>. Мы хотим сделать максимально удобный ну и вообще крутой сервис, который в будущем будет пополняться и другими фендомами с четырехлапым.</p>
			</div>

			<!-- Button -->
			<div class="mt-6 text-center">
				<button class="opacity-75 cursor-not-allowed px-4 py-1 bg-white text-black rounded-md text-sm">
					Подписаться на обновления
				</button>
				
				<!--  -->
				<p class="text-xs text-gray-100 mt-1">Скоро будет :0</p>
			</div>
		</div>
	</main>
{ /if }