<script>
  // Importing modules
  import { goto } from "@sapper/app";
	import { onMount } from "svelte";
	import axios from "axios";

	// Importing components
	import { ArtworkCard } from "../components";

	// Test Data
	let testData = [];

	// Populating our test data
	onMount(() => {
		axios.get(`https://furrynetwork.com/api/search/artwork/popular?size=56&&from=0`)
		.then((response) => {
			let data = response.data.hits;

			testData = data.map((x) => {
				let obj = {
					id: x._id,
					type: "artwork",

					provider: "furrynetwork",

					source: {
						title: x._source.title,
						description: x._source.description,

						image: `https://d3gz42uwgl1r1y.cloudfront.net/${x._source.url}`,
						published: x._source.published,

						views: x._source.views,
						nsfw: x._source.tags.includes("yiff")
					},

					author: {
						id: x._source.character.id,
						nickname: x._source.character.name,
						displayName: x._source.character.display_name,
						avatar: `https://d3gz42uwgl1r1y.cloudfront.net/${x._source.character.avatar}`
					}
				};

				return obj;
			});

      let scroll = 0;
      let element = document.getElementById("content-container");

      setInterval(() => {
        element.scroll(0, scroll);
        scroll += 0.15;

      }, 5);
		});
	});
</script>

<section class="w-full h-full flex justify-center items-center px-8">
  <!-- Texts -->
  <div class="w-1/2 px-3">
    <h1 class="text-5xl text-gray-100 font-bold">Хороший контент для хорошего времяпровождения</h1>
    <p class="mt-2 text-md text-gray-100 opacity-75">Главная суть этого проекта - это собрать как можно больше всеразличного контента с самых популярных Фурри-сайтов. <br/><br/>Это же довольно-таки удобно и круто, не так ли? Давайте же проверим вместе!</p>

    <!-- Buttons -->
    <div class="w-2/3 mt-6">
      <div class="flex justify-center items-center w-full relative">
        <!-- Start -->
        <button on:click={() => goto('/explore')} class="flex w-1/2 items-center justify-center py-2 rounded-md bg-indigo-400">
          <p class="text-sm text-white font-medium">Начать исследовать</p>
        </button>

        <!-- More -->
        <button class="cursor-not-allowed opacity-60 ml-4 w-1/2 flex items-center justify-center py-2 rounded-md bg-indigo-400">
          <p class="text-sm text-white font-medium">Узнать больше</p>
        </button>
      </div>

      <!-- Text -->
      <p class="mt-0.5 text-xs text-gray-100 opacity-60">Никуда входить не надо! Мы уже создали Ваш личный аккаунт. Вы всегда можете привязать к нему пароль ну или какую-то соц. сеть, дабы не потерять его!</p>
    </div>
  </div>

  <!-- Content -->
  <div class="w-1/2 h-full relative px-3">
    <div style="z-index: 2;" class="absolute inset-0 w-full h-full"></div>
    <div style="overflow: hidden; z-index: 1; width: 125%; right: 5vw;" id="content-container" class="transform -skew-y-12 rotate-12 flex flex-wrap absolute inset-0 h-full rounded-md bg-dark">
      { #each testData as entry }
        <ArtworkCard size="sm" hideContent={true} entry={entry} />
      { /each }  
    </div>
  </div>
</section>