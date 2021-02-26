<script>
  // Importing modules
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";

  // Importing stores
  import settings from "../../../../stores/account/settings.js";
  import cache from "../../../../stores/cache.js";
  import profile from "../../../../stores/profile.js";

  import { stores } from "@sapper/app";
  const { page } = stores();

  // Importing components
  import Icon from "../../../Icon.svelte";

  onMount(() => {
    cache.subscribe((obj) => {
      let data = obj["reader/currentText"];

      if (data != null) {
        chapters = {
          list: data.chapters,
          current: data.chapter.id,

          next: data.nextChapter,
          previous: data.previousChapter
        };
      };

      let postData = obj["reader/current"];

      if (postData != null) {
        post = postData.data;
      };
    });
  });

  function changeTheme(themeName) {
    settings.setSetting("reader.theme.choosen", themeName);

    let theme = {};
    
    if (themeName == "dark") {
      // Changing theme to dark
      theme = {
        "reader.theme.container.background": "#1f1d2b",
        "reader.theme.text.color": "#fff",

        "reader.theme.header.background": "#1f1d2b",
        "reader.theme.header.borderColor": "#353340",

        "reader.theme.menu.background": "#1f1d2b",
        "reader.theme.menu.plateBackground": "#353340",

        "reader.theme.iconColor": "#fff"
      };
  
    } else {
      theme = {
        "reader.theme.container.background": "#F3F4F6",
        "reader.theme.text.color": "#000",

        "reader.theme.header.background": "#F3F4F6",
        "reader.theme.header.borderColor": "#E5E7EB",

        "reader.theme.menu.background": "#F3F4F6",
        "reader.theme.menu.plateBackground": "#D1D5DB",

        "reader.theme.iconColor": "#000"
      };
    };

    // Updating theme settings
    for (const key in theme) {
      if (Object.hasOwnProperty.call(theme, key)) {
        const element = theme[key];
        
        settings.setSetting(key, element);
      };
    };

    theme.name = themeName;

    // Saving this theme settings to our cache storage
    if (post.id != null) cache.setCache(`reader.${ post.id }.theme`, theme);
  };


  let menuOpened = false;
  let menuPage   = 0;

  let summaryExpanded = false;
  let tagsExpanded = false;

  let chapters = [];
  let post = {};
</script>

<!-- Mobile menu -->
{ #if menuOpened }
  <div style="z-index: 1000; overflow: hidden; overflow-y: auto; background: { $settings["reader.theme.menu.background"] }; color: { $settings["reader.theme.text.color"] }" class="transition duration-300 ease-in-out fixed md:hidden inset-0 w-full h-full mt-16 pb-24">
    { #if menuPage == 0 }
      <!-- Text nameSummary -->
      <div class="w-full px-2 py-4">
        <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="transition duration-300 ease-in-out w-full rounded-md { summaryExpanded ? "h-auto" : "h-64" } overflow-hidden py-4 relative">
          <!-- Settings -->
          <div class="absolute w-full flex justify-between inset-x-0 top-0 p-4">
            <p class="text-sm opacity-80">Вы читаете</p>

            <Icon name="more-horizontal" attrs={{ class: "w-4 h-4" }}/>
          </div>

          <!-- Content -->
          <div class="my-10">
            <!-- Author -->
            <div class="flex items-center px-4">
              <div class="w-5 h-5 rounded-full bg-indigo-400"></div>
            
              <a href="/" style="border-color: { $settings["reader.theme.text.color"] };" class="ml-1 text-xs border-b border-dotted">{ post != null ? post.author.nickname : "" }</a>
            </div>

            <!-- Title -->
            <h1 class="text-2xl mt-0.5 px-4">{ post != null ? post.source.title : "" }</h1>

            <!-- Description -->
            <div class="{ post.source.description.split(" ").length > 100 ? "h-48 overflow-hidden overflow-y-auto" : "h-auto" } w-full mt-4 px-4">
              <p>{ @html post.source.description }</p>
            </div>

            <!-- Tags? -->
            <div class="mt-4 px-2">
              <div style="height: 0.05rem;" class="w-full bg-gray-100 opacity-40 px-4"></div>

              { #if post != null && post.meta.tags != null && post.meta.tags.length > 0 }

                <!-- Warning -->
                <div class="my-3">
                  <p class="text-sm uppercase px-2">Предупреждения</p>

                  <div class="w-full flex flex-wrap mt-2">
                    { #each post.meta.tags.filter((x) => x.type == "warning") as tag }
                      <div class="mx-1 my-0.5 px-2 py-0.5 rounded-full bg-red-400 text-xs">
                        { tag.text }
                      </div>
                    { /each }
                  </div>
                </div>

                { #if tagsExpanded }
                  <!-- Relationships -->
                  <div class="my-3">
                    <p class="text-sm uppercase px-2">Пэйринги</p>

                    <div class="w-full flex flex-wrap mt-2">
                      { #each post.meta.tags.filter((x) => x.type == "relationship") as tag }
                        <div class="mx-1 my-0.5 px-2 py-0.5 rounded-full bg-pink-400 text-xs">
                          { tag.text }
                        </div>
                      { /each }
                    </div>
                  </div>

                  <!-- Characters -->
                  <div class="my-3">
                    <p class="text-sm uppercase px-2">Персонажи</p>

                    <div class="w-full flex flex-wrap mt-2">
                      { #each post.meta.tags.filter((x) => x.type == "characters") as tag }
                        <div class="mx-1 my-0.5 px-2 py-0.5 rounded-full bg-indigo-400 text-xs">
                          { tag.text }
                        </div>
                      { /each }
                    </div>
                  </div>

                  <!-- Freeform -->
                  <div class="my-3">
                    <p class="text-sm uppercase px-2">Другие теги</p>

                    <div class="w-full flex flex-wrap mt-2">
                      { #each post.meta.tags.filter((x) => x.type == "freeform") as tag }
                        <div class="mx-1 my-0.5 px-2 py-0.5 rounded-full bg-dark text-xs">
                          { tag.text }
                        </div>
                      { /each }
                    </div>
                  </div>
                { /if }

                <div on:click={(e) => {
                  if (tagsExpanded) {
                    tagsExpanded = false;
                  } else {
                    tagsExpanded = true;
                  };
                }} class="w-full flex items-center justify-center py-2 rounded-md bg-dark mt-2 px-2">
                  { #if tagsExpanded }
                    <Icon name="chevron-up" attrs={{ class: "w-5 h-5" }} />

                    <p class="text-sm ml-2">Скрыть</p>
                  { :else }
                    <Icon name="more-horizontal" attrs={{ class: "w-5 h-5" }} />

                    <p class="text-sm ml-2">Больше тегов <span style="border-color: { $settings["reader.theme.text.color"] }" class="border-b border-dotted">({ post.meta.tags.length })</span></p>
                  { /if }                
                </div>
              { /if }
            </div>
          </div>

          <!-- Show more -->
          <div style="background-color: { $settings["reader.theme.menu.plateBackground"] }" class="absolute inset-x-0 bottom-0 flex justify-center items-center p-4">
            <button on:click={(e) => {
              if (summaryExpanded) {
                summaryExpanded = false;
              } else {
                summaryExpanded = true;
              };
            }} class="">
              <Icon name="{ summaryExpanded ? "chevron-up" : "chevron-down" }" attrs={{ class: "w-5 h-5" }} />
            </button>
          </div>
        </div>
      </div>

      <!-- Fast-actions -->
      <div class="px-2 py-4">
        <!-- Title -->
        <div class="mx-2 w-full border-b-2 border-indigo-400 py-2">
          <h1 class="text-2xl ">Быстрые действия</h1>
          <p class="text-sm opacity-70">Всё то, что вам может пригодится прямо тут и прямо сейчас.</p>
        </div>

        <!-- Content -->
        <div class="w-full flex flex-wrap relative mt-2">
          <!-- Reader settings -->
          <div class="w-full p-2">
            <div style="padding-top: 30%" class="w-full relative">
              <div on:click={(e) => menuPage = 1} style="background: { $settings["reader.theme.menu.plateBackground"] }" class="absolute inset-0 w-full h-full rounded-md flex justify-center items-center px-6">
                <!-- Image -->
                <img class="h-2/4" src="./icons/wrench.png" alt="Wrench Icon">

                <!-- Texts -->
                <div class="ml-6 w-max">
                  <h1 class="text-base">Настройки читалки</h1>
                  <p class="text-xs opacity-70">Настройте цвет фона, букв; размер отступов, размер букв и ещё много-много другого.</p>
                </div>
              </div>
            </div>
          </div>
        
          <!-- Other -->
          <div class="w-1/3 p-2">
            <div style="padding-top: 100%;" class="w-full relative">
              <div on:click={(e) => {
                menuPage = 2;
              }} style="background: { $settings["reader.theme.menu.plateBackground"] }" class="absolute inset-0 w-full h-full rounded-md flex flex-col items-center justify-center">
                <!-- Image -->
                <img class="h-1/3" src="./icons/bookmark-tabs.png" alt="Wrench Icon">

                <!-- Texts -->
                <div class="mt-4">
                  <h1 class="text-md">Главы</h1>
                </div>
              </div>
            </div>
          </div>

          <div class="w-1/3 p-2">
            <div style="padding-top: 100%;" class="w-full relative">
              <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="absolute border-2 border-dotted border-indigo-400 inset-0 w-full h-full rounded-md flex flex-col items-center justify-center">
                <!-- Image -->
                <img class="h-1/3" src="./icons/house-with-garden.png" alt="Chat bubble Icon">

                <!-- Texts -->
                <div class="mt-4">
                  <h1 class="text-md">Плейс</h1>
                </div>
              </div>
            </div>
          </div>

          <div class="w-1/3 p-2">
            <div style="padding-top: 100%;" class="w-full relative">
              <div class="absolute inset-0 w-full h-full rounded-md border-4 border-dotted border-light-dark flex flex-col items-center justify-center">
                <div class="w-2/3 text-center">
                  <p class="text-sm">Ещё что-то</p>
                  <!-- <p class="text-xs opacity-70">Скоро тут что-то будет...</p> -->
                </div>
              </div>
            </div>
          </div>

          <!-- Place ad -->
          <div class="w-full p-2 pt-4">
            <div style="padding-top: 30%" class="w-full relative">
              <div class="absolute inset-0 w-full h-full rounded-md bg-indigo-400 opacity-60 flex justify-center items-center px-6">
                <!-- Image -->
                <img class="h-3/4" src="./stickers/0/6.png" alt="Emoji">

                <!-- Texts -->
                <div class="ml-6 w-max text-white">
                  <p class="text-xs opacity-70"><span class="border-b border-dotted border-white">Плейсы</span>. Это невероятно крутая вещь! Попробуйте сами!</p>
                
                  <!-- Buttons -->
                  <div class="mt-2 w-full flex justify-center items-center">
                    <button on:click={(e) => {
                      // cache.setCache("hidLoadedFromStorageNotification", true);
                    }} class="flex opacity-80 w-full items-center justify-center py-1 rounded-md bg-dark">
                      <p class="text-xs font-medium">Скрыть</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Site Pages -->
      <div class="px-2 py-4">
        <!-- Title -->
        <div class="mx-2 w-full border-b-2 border-indigo-400 py-2">
          <h1 class="text-2xl">Навигация</h1>
          <p class="text-sm opacity-70">Удобная и быстрая навигация по всему сайту именно тут!</p>
        </div>

        <!-- Content -->
        <div class="w-full flex flex-wrap relative mt-2">
          <!-- Reader settings -->
          <div class="w-full p-2">
            <div style="padding-top: 30%" class="w-full relative">
              <div on:click={(e) => {
                menuOpened = false;
                menuPage = 0;

                goto("/explore");
              }} style="background: { $settings["reader.theme.menu.plateBackground"] }" class="absolute inset-0 w-full h-full rounded-md flex justify-center items-center px-6">
                <!-- Image -->
                <img class="h-2/4" src="./icons/compass.png" alt="Wrench Icon">

                <!-- Texts -->
                <div class="ml-6 w-max">
                  <h1 class="text-base">Исследовать</h1>
                  <p class="text-xs opacity-70">Исследуйте новый контент прямо на лету!</p>
                </div>
              </div>
            </div>
          </div>
        
          <!-- Other -->
          <div class="w-1/3 p-2">
            <div style="padding-top: 100%;" class="w-full relative">
              <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="absolute inset-0 w-full h-full rounded-md">
                
              </div>
            </div>
          </div>

          <div class="w-1/3 p-2">
            <div style="padding-top: 100%;" class="w-full relative">
              <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="absolute inset-0 w-full h-full rounded-md">
                
              </div>
            </div>
          </div>

          <div class="w-1/3 p-2">
            <div style="padding-top: 100%;" class="w-full relative">
              <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="absolute inset-0 w-full h-full rounded-md">
                
              </div>
            </div>
          </div>

        </div>
      </div>
    { :else if menuPage == 1 }
      <!-- Reader Settings -->
      <div class="px-2 py-4">
        <!-- Back button -->
        <div on:click={(e) => menuPage = 0} class="w-full py-4 flex items-center">
          <Icon name="chevron-left" attrs={{ class: "w-6 h-6 text-light-dark" }} />

          <div class="ml-4">
            <h1 class="text-md">Назад</h1>
            <p class="text-xs opacity-80">Вернуться назад, ага да</p>
          </div>
        </div>

        <!-- Text size -->
        <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="w-full my-4 rounded-md h-32 flex justify-between items-center px-6">
          <!-- Texts -->
          <div class="w-1/4">
            <h1 class="text-xl">Шрифт</h1>
            <!-- <p class="text-xs opacity-80">Выберите идеальный размер шрифта</p> -->
          </div>

          <!-- Text size -->
          <div class="w-3/4 flex items-center flex justify-center items-center">
            <!-- Plus -->
            <button on:click={(e) => {
              settings.setSetting("reader.theme.text.size", parseInt($settings["reader.theme.text.size"] || 16) - 1);
            }}>
              <Icon name="chevron-down" attrs={{ class: "w-6 h-6 text-whtie" }} />
            </button>

            <!-- Sample -->
            <p style="font-size: { $settings["reader.theme.text.size"] }px;" class="mx-2">Aa</p>

            <!-- Minus -->
            <button on:click={(e) => {
              settings.setSetting("reader.theme.text.size", parseInt($settings["reader.theme.text.size"] || 16) + 1);
            }}>
              <Icon name="chevron-up" attrs={{ class: "w-6 h-6 text-whtie" }} />
            </button>
          </div>
        </div>

        <!-- Theme -->
        <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="w-full my-4 rounded-md py-4 flex flex-col justify-between items-center px-6">
          <!-- Texts -->
          <div class="text-center">
            <h1 class="text-xl">Тема</h1>
            <p class="text-sm opacity-80">Тёмная - что бы глазкам не было больно, светлая... Просто так</p>
          </div>
          
          <!-- Theme picker -->
          <div class="w-full flex justify-center items-center mt-2">
            
            <!-- Light -->
            <div class="w-1/2 mx-2">
              <div on:click={(e) => {
                changeTheme("light");
              }} class="{ $cache[`reader.${ post.id }.theme`] != null ? $cache[`reader.${ post.id }.theme`].name == "light" ? "border-2 border-indigo-400" : "" : "" } w-full h-8 rounded-md bg-gray-200 flex justify-center items-center">
                <Icon name="sun" attrs={{ class: "w-5 h-5 text-dark" }} />

                <p class="ml-2 text-dark text-sm">Светлая</p>
              </div>
            </div>

            <!-- Dark -->
            <div class="w-1/2 mx-2">
              <div on:click={(e) => {
                changeTheme("dark");
              }} class="{ $cache[`reader.${ post.id }.theme`] != null ? $cache[`reader.${ post.id }.theme`].name == "dark" ? "border-2 border-indigo-400" : "" : "" } w-full h-8 rounded-md bg-dark flex justify-center items-center">
                <Icon name="moon" attrs={{ class: "w-5 h-5 text-white" }} />

                <p class="ml-2 text-white text-sm">Тёмная</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

    { :else if menuPage == 2 }
      <!-- Chapters -->
      <div class="px-2 py-4">
        <!-- Back button -->
        <div on:click={(e) => menuPage = 0} class="w-full py-4 flex items-center">
          <Icon name="chevron-left" attrs={{ class: "w-6 h-6 text-light-dark" }} />

          <div class="ml-4">
            <h1 class="text-md">Назад</h1>
            <p class="text-xs opacity-80">Вернуться назад, ага да</p>
          </div>
        </div>

        <!-- List -->
        <div class="w-full">
          { #each chapters.list as chapter }
            <div on:click={(e) => {
              menuPage = 0;
              menuOpened = false;

              goto(`/reader/${ $page.params.id }/${ chapter.id }`);
            }} style="{ chapters.current == chapter.id ? "" : `background: ${ $settings["reader.theme.menu.plateBackground"]}` }" class="{ chapters.current == chapter.id ? "bg-indigo-400 text-white" : "" } w-full my-4 rounded-md p-3 flex items-center text-sm relative">
              { chapter.title }

              <!-- Status -->
              { #if chapters.current == chapter.id || chapters.next == chapter.id }
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <p class="text-xs opacity-80">{ chapters.current == chapter.id ? "Текущая" : "Следующая" }</p>
                </div>
              { /if }
            </div>
          { /each }
        </div>
      </div>
    { /if }
  </div>
{ /if }

<!-- Header -->
<div style="z-index: 999; background: { $settings["reader.theme.header.background"] }; border-color: { $settings["reader.theme.header.borderColor"] }" class="fixed top-0 w-full flex justify-between bg-white border-b items-center h-16 px-6 md:px-8">
  <!-- Pawcapsu Logotype (mobile) -->
  <div on:click={(e) => {
    if (menuOpened) {
      menuOpened = false;
    } else {
      menuOpened = true;
    };
  }} style="z-index: 1000;" class="absolute cursor-pointer inset-0 md:left-0 flex justify-center items-center px-6">
    { #if menuOpened }
      <Icon name="x" attrs={{ style: `color: ${ $settings["reader.theme.iconColor"] }`, class: "w-7 h-7" }}/>
    { :else }

      { #if $settings["reader.theme.choosen"] == "dark" }
        <img class="w-7 h-7" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1610810215/logotypes/pawcapsu-white-small.svg" alt="pawcapsu logotype">
      { :else }
        <img class="w-7 h-7" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1614110162/logotypes/pawcapsu-black-small.svg" alt="pawcapsu logotype">
      { /if }

    { /if }
  </div>

  <!-- Actions -->
  <div style="z-index: 2;" class="hidden w-full md:flex justify-center items-center">

    <!-- Reader Settings -->
    <button class="mx-1 p-2 relative">
      <Icon name="grid" attrs={{ class: "w-5 h-5 text-black" }}/>

      <div class="w-3 h-3 bg-red-400 rounded-full absolute top-0 right-0"></div>
    </button>

    <!-- Chapters -->
    <button class="mx-1 p-2">
      <Icon name="layers" attrs={{ class: "w-5 h-5 text-black" }}/>
    </button>
  </div>

  <!-- Account -->
  <div class="hidden absolute inset-x-0 right-0 md:flex justify-end items-center px-6">
    <!-- Avatar -->
    { #if $profile.avatar == null }
      <div class="w-8 h-8 rounded-full border border-indigo-400 flex justify-center items-center">
        <Icon name="feather" attrs={{ class: "text-gray-800 w-4 h-4" }} />
      </div>
    { /if }

    <!-- Show profile information -->
    <button on:click={(e) => {
      
    }} class="mx-1 w-8 h-8 md:flex justify-center items-center">
      <!-- Grid Icon -->
      <Icon name="more-vertical" attrs={{ class: "w-5 h-5 text-black" }} />
    </button>
  </div>
</div>
