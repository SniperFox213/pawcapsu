<script>
  // Importing modules
  import { onMount } from "svelte";
  import moment from "moment";
  import "moment/locale/ru";

  moment.locale("ru");

  // Importing components
  import {
    ArtworkCard,
    PostContent
  } from "../../index.js";

  // Fetching data
	async function fetchData() {
    if (!loading) { 
      loading = true;
      let after = null;

      // Checking if we need to fetch new data
      if (last != null && last.ref["@ref"].id != null) {
        after = last.ref["@ref"].id;
      };

      const response = await fetch(`https://v1.api.paw.unfull.ml/api/explore/popular?size=${size}${ after != null ? `&after=${after}` : "" }`);
      newBatch = await response.json();
      
      if (last != null) newBatch.shift();

      // Saving last element as last element
      last = newBatch[newBatch.length - 1];
      loading = false;
    };
	};

  // Infinite scroller settings
  let last;
  let loading = false;
  let size = 14;
  
  let data = [];
  let newBatch = [];

  onMount(() => {
    fetchData();

    // Implementing infinite scrolling features
    let element = document.getElementById("list");

    element.addEventListener("scroll", () => {
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
</script>

{ #if currentPost.show }

  <div style="z-index: 999;" class="absolute inset-0 w-full h-full">
    <div on:click={(e) => {
      currentPost.show = false;

      // Updating history state back to normal
      window.history.pushState({}, "", `/explore`);
    }} class="w-full h-1/4 bg-dark opacity-75"></div>

    <div style="overflow: hidden; overflow-y: auto;" class="relative w-full h-3/4 bg-light-dark rounded-t-md">
      <PostContent id={currentPost.id} post={currentPost} />

      <!-- :after -->
      <div class="w-full h-1/6 flex justify-center items-center">
        <p class="text-xs text-gray-100 opacity-60 text-center">Данный контент был взят с сайта <span class="border-b border-dotted border-gray-100">FurryNetwork</span><br/> Дата взятия данного контента с сайта: <span class="border-b border-dotted border-gray-100">{ moment.unix(currentPost.scrapped).calendar() }</span> <br /><br />Мы не несём отвественности за данный контент.</p>
      </div>
    </div>
  </div>

{ /if }

<div class="w-full h-full flex flex-wrap items-center px-6">
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
							<div class="w-1/6 h-full flex justify-center items-center relative">
								
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
    <ArtworkCard on:open={(e) => openPost(e)} size="md" entry={entry} />
  { /each }

  { #if loading }
    <div class="w-full py-16 flex flex-col justify-center items-center">
      <h1 class="text-2xl text-white font-bold">Загружаем ещё...</h1>
      <p class="text-xs text-gray-100 opacity-50 mt-1">Вы можете изменить кол-во показываемых постов. Просто нажмите на шестерёнки сверху!</p>
    </div>
  { /if }
</div>