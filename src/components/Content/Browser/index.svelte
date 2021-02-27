<script>
  // Importing modules
  import { fade } from "svelte/transition";
  import { onMount, beforeUpdate } from "svelte";
  import moment from "moment";
  import "moment/locale/ru";

  moment.locale("ru");

  // Importing stores
  import cache from "../../../stores/cache.js";

  // Importing components
  import ArtworkCard from "../Types/Artwork.svelte";
  import WritingCard from "../Types/Writing.svelte";

  import PostContent from "../Post/index.svelte";
  import Icon from "../../Icon.svelte";
  import Spinner from "../../Spinner.svelte";

  // Fetching data
	async function fetchData(forcedUpdate = false) {
    if (!loading) {
      let element = document.scrollingElement;
      
      // Let's firstly check if we have any cached data
      if ($cache[`browser.${types}`] && !forcedUpdate) {
        if (!loadedCache) {
          loadedCache = true;
          // Let's now load some information from cache
          data = $cache[`browser.${types}`];

          if (data.length > 0) {
            loadedFromStorage = true;
          };

          setTimeout(() => {
            element.scrollTop = $cache[`browser.${types}/scroll`];
            
            setTimeout(() => {
              readyToShow = true;
            }, 250);
          }, 150);
          return;
        } else {
          readyToShow = true;
        };
      } else {
        readyToShow = true;
      };

      loading = true;
      let after = null;

      // Checking if we need to fetch new data
      if (last != null && last._id != null) {
        after = last._id;
      };

      const response = await fetch(`https://v1.api.paw.unfull.ml/api/explore/popular?size=${size}&type=${ typeof types == "object" ? types.join(",") : types }${ after != null ? `&after=${after}` : "" }`);
      newBatch = await response.json();
      
      if (last != null) newBatch.shift();

      // Saving last element as last element
      last = newBatch[newBatch.length - 1];
      loading = false;

      // And now let's cache this data
      cache.setCache(`browser.${types}`, [...data, ...newBatch]);
      loadedCache = true;
    };
	};

  // Function to update browser
  function updateBrowser() {
    // Clearing store
    cache.setCache("browser", []);
    cache.setCache("browser/scroll", 0);

    // Clearing data
    data = [];
    newBatch = [];
    
    // Scrolling to top
    let element = document.getElementById("list");
    element.scrollTop = 0;
    
    loadedFromStorage = false;
    fetchData();
  };

  // Infinite scroller settings
  let last;
  let loading = false;
  let readyToShow = false;
  let size = 14;
  
  let loadedFromStorage = false;
  let loadedCache = false;
  let data = [];
  let newBatch = [];

  onMount(() => {
    fetchData();

    // Implementing infinite scrolling features
    let element = document.scrollingElement;

    element.addEventListener("scroll", () => {
      // Saving scroll position
      cache.setCache(`browser.${types}/scroll`, element.scrollTop);
      
      if (element.scrollTop + element.clientHeight >= element.scrollHeight - 200) {
        fetchData();
      };
    });
  });

  // Data array
  $: data = [
    ...data,
    ...newBatch
  ];

  let currentPost = {};

  beforeUpdate(() => {
    // Preparing types
    if (oldTypes != types) {
      oldTypes = types;

      readyToShow = false;
      updateBrowser();
    };
  });

  // Function, that'll handle post opens
  function openPost(e) {
    // Getting post information
    let data = e.detail;
    data.show = true;

    // And now let's show
    // post page to this user
    // TODO
    currentPost = data;
  };

  // Let's now export different post types
  export let types;

  let oldTypes = types;
</script>

{ #if currentPost.show }

  <div style="z-index: 999;" class="absolute inset-0 flex flex-col justify-end w-full h-full">
    <div on:click={(e) => {
      currentPost.show = false;

      // Updating history state back to normal
      // window.history.pushState({}, "", `/explore`);
    }} class="w-full h-8 bg-dark opacity-75"></div>

    <div style="overflow: hidden; overflow-y: auto;" class="relative w-full h-full bg-light-dark rounded-t-md p-6">
      <!-- Close Button -->
      <button on:click={(e) => {
        currentPost.show = false;

        // Updating history state back to normal
        // window.history.pushState({}, "", `/explore`);
      }} style="z-index: 999;" class="absolute top-0 right-0 p-6 rounded-md">
        <Icon name="x" attrs={{ class: "text-white w-5 h-5" }} />
      </button>
      
      <PostContent id={currentPost.id} post={currentPost} />
    </div>
  </div>

{ /if }

<div class="w-full h-full flex flex-wrap items-center md:px-6">
  { #if !readyToShow }
    <div style="z-index: 999;" out:fade class="bg-dark fixed inset-0 w-full h-screen flex justify-center items-center">
      <Spinner />
    </div>
  { /if }

  <!-- Notifications Card -->
	<div class="w-full md:w-1/3 relative p-2">
		<div style="padding-top: 120%" class="w-full relative">
			<div class="absolute inset-0 w-full h-full bg-light-dark rounded-lg flex flex-col justify-center items-center p-4">
				<div>
					
					<!-- Title + Description -->
					<div class="flex items-center">
						<!-- Sticker -->
						<img class="w-1/6" src="./icons/smirking-face.png" alt="">
						
						<h1 class="text-3xl text-white font-bold ml-2">Давайте узнаем друг друга поближе</h1>
					</div>
					
					<p class="text-md text-gray-100 opacity-95 mt-1">Лучше познакомиться сейчас чем потом! Мы быстренько расскажем и покажем то, что мы умеем.</p>
				</div>
				
				<p class="text-xs my-2 text-white opacity-60">Стикеры не наши. У нас нет денег на стикеры. Вообще денег нет. Вот автор стикеров: <a href="https://www.furaffinity.net/user/toyapup" class="border-b border-gray-100 border-dotted">Toyapup</a></p>

				<div style="overflow: hidden; overflow-y: auto;" class="mt-6 flex-grow w-full relative">
					<div class="absolute inset-0 w-full h-full">

						<!-- List -->
						<div class="w-full rounded-md bg-dark h-20 flex items-center p-4">
							<!-- Icon -->
							<div class="w-1/6 relative">
								<div style="padding-top: 100%;" class="w-full relative">
									<div class="absolute inset-0 w-full h-full rounded-md flex justify-center items-center bg-white">
										<!-- Icon itself -->
										<img class="w-full" src="./stickers/0/18.png" alt="">
									</div>
								</div>
							</div>

							<!-- Texts -->
							<div class="pl-3 w-4/6">
								<h1 class="text-md text-white font-medium">Настройка аккаунта</h1>
								<p class="text-xs text-gray-100 opacity-65">Настройте свой аккаунт так, как вам нравится.</p>
							</div>

							<!-- Progress Spinner -->
							<div class="w-12 h-12 h-full flex justify-center items-center relative">
								
								<div style="border-color: #5A5861; border-top-color: rgba(252, 211, 77);	" class="w-2/3 h-2/3 rounded-full border-4"></div>
							
							</div>
						</div>

						<!-- Main Tutorial -->
						<div class="w-full mt-4 rounded-md bg-dark h-20 flex items-center p-4">
							<!-- Icon -->
							<div class="w-1/6 relative">
								<div style="padding-top: 100%;" class="w-full relative">
									<div class="absolute inset-0 w-full h-full rounded-md flex items-center justify-center bg-white">
										<!-- Icon itself -->
										<img class="w-full" src="./stickers/0/17.png" alt="">
									</div>
								</div>
							</div>

							<!-- Texts -->
							<div class="pl-3 w-5/6">
								<h1 class="text-md text-white font-medium">Начальный туториал</h1>
								<p class="text-xs text-gray-100 opacity-65">Узнайте про то, как работает этот сайт и зачем он вообще был создан.</p>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>

  <!-- Layout -->
  { #each data as entry }
    { #if entry.type == "artwork" }
      <ArtworkCard on:open={(e) => openPost(e)} size="md" entry={entry} />
    { :else if entry.type == "text" }
      <WritingCard on:open={(e) => openPost(e)} size="md" entry={entry} />
    { /if }
  { /each }

  { #if loading }
    <div class="w-full py-16 flex flex-col justify-center items-center px-6 md:px-0 text-center">
      <h1 class="text-2xl text-white font-bold">Загружаем ещё...</h1>
      <p class="text-xs text-gray-100 opacity-50 mt-1">Вы можете изменить кол-во показываемых постов. Просто нажмите на шестерёнки сверху!</p>
    </div>
  { /if }
</div>

<!-- "Notification"
TODO: recode -->
{ #if loadedFromStorage }
  <div style="z-index: 998;" class="absolute w-full flex justify-end bottom-0 right-0">
    { #if $cache.hidLoadedFromStorageNotification }
      <button on:click={(e) => {
        updateBrowser();
      }} class="w-7 h-7 rounded-full bg-indigo-400 flex justify-center items-center m-3">
        <Icon name="refresh-cw" attrs={{ class: "w-4 h-4 text-white" }} />
      </button>
    { :else }
        <div class="w-full md:w-1/3 rounded-md p-4 bg-indigo-400 flex items-center m-3 shadow-md">
          <!-- Image -->
          <img class="w-16 md:w-14" src="./stickers/0/20.png" alt="">

          <!-- Content -->
          <div class="ml-3">
            <div>
              <!-- Title -->
              <h1 class="text-2xl text-white font-medium">Хоба!</h1>

              <!-- Descriptin -->
              <p class="text-xs text-gray-100 opacity-75">Мы восстановили вашу прошлую сессию. Круто, да? Продолжайте от туда, от куда закончили!</p>
            </div>

            <!-- Buttons -->
            <div class="mt-2 w-full flex items-center justify-center">
              <button on:click={(e) => {
                updateBrowser();
              }} class="flex w-1/2 items-center justify-center py-1 rounded-md bg-dark">
                <p class="text-xs text-white font-medium">Обновить страничку</p>
              </button>

              <button on:click={(e) => {
                loadedFromStorage = false;
                cache.setCache("hidLoadedFromStorageNotification", true);
              }} class="flex opacity-80 ml-3 w-1/2 items-center justify-center py-1 rounded-md bg-dark">
                <p class="text-xs text-white font-medium">Скрыть</p>
              </button>
            </div>
          </div>
        </div>
    { /if }
  </div>
{ /if }