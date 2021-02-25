<script>
  // Importing modules
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import axios from "axios";

  // Importing stores
  import settings from "../../../stores/account/settings.js";
  import cache from "../../../stores/cache.js";
  import { stores } from "@sapper/app";
  const { page } = stores();

  // Importing components
  import { Spinner, Icon } from "../../../components";

  onMount(async () => {
    // Loding text information
    axios.get(`https://v1.api.paw.unfull.ml/api/post/${ $page.params.id }?extended=true`)
    .then((response ) => {
      let { data } = response;

      // Saving this text's data into cache
      // (so that it can be accessed by our container
      // component and so on)
      cache.setCache("reader/current", { type: "text", data: data, url: $page.path });

      post    = data;
      loading = false;

      // Getting reader settings
      if ($cache[`reader.${ data.id }.theme`] != null) {
        let theme = $cache[`reader.${ data.id }.theme`];

        for (const key in theme) {
          settings.setSetting("reader.theme.choosen", theme.name);

          if (Object.hasOwnProperty.call(theme, key)) {
            const element = theme[key];
            
            settings.setSetting(key, element);
          };
        };
      };
    }).catch(() => {
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

  let post    = {};
  let loading = true;
</script>

{ #if loading }
  <!-- Loading screen -->
  <div out:fade style="z-index: 999;" class="absolute bg-white inset-0 w-full h-full flex justify-center items-center">
    <Spinner />
  </div>
{ :else }
  <!-- Choose theme (if not choosen) -->
  { #if !$settings["reader.theme.choosen"] }
    <!-- Background -->
    <div style="z-index: 999;" class="fixed inset-0 w-full h-full bg-dark opacity-50"></div>

    <div style="z-index: 1000;" class="fixed inset-0 w-full h-screen p-6 flex justify-center">
      <!-- Modal -->
      <div style="z-index: 2;" class="w-full md:w-1/3 h-full rounded-md bg-dark relative flex flex-col items-center justify-center px-4">
        <!-- Close buttons -->
        <div class="absolute top-0 w-full flex justify-between items-center p-4">
          <p class="text-sm text-white opacity-80">Тема читалки</p>

          <button on:click={(e) => {
            changeTheme("light");
          }}>
            <Icon name="x" attrs={{ class: "w-5 h-5 text-white" }} />
          </button>
        </div>

        <!-- Image -->
        <img class="w-2/3" src="./stickers/0/30.png" alt="Emoji">

        <!-- Texts -->
        <div class="text-center my-4">
          <h1 class="text-xl md:text-3xl text-white">Но перед началом...</h1>
          <p class="text-xs md:text-sm text-gray-100 opacity-80">Перед тем, как продолжить, вам стоит выбрать тему читалки! Это невероятно важный шаг, ибо... Это просто очень важный шаг короче, да! Просто выберите уже тему читалки и начинайте читать! Мы запомним ваш выбор, но не факт что навсегда :></p>
        </div>

        <!-- Buttons -->
        <div class="w-full flex mt-2">
          <!-- Dark Theme -->
          <div class="w-full h-16 mx-2 relative flex items-end">
            { #if $cache[`reader.${ post.id }.theme`].name == "dark" }
              <div class="absolute top-0 right-0">
                <p class="text-xs text-indigo-400">Выбранная</p>
              </div>
            { /if }

            <div on:click={() => changeTheme("dark")} class="cursor-pointer { $cache[`reader.${ post.id }.theme`].name == "dark" ? " border-2 border-indigo-400" : "" } w-full h-12 flex items-center justify-center rounded-md bg-light-dark">
              <Icon name="moon" attrs={{ class: "w-6 h-6 text-white" }} />
              
              <p class="ml-2 text-white text-sm">Тёмная</p>
            </div>
          </div>

          <!-- Light Theme -->
          <div class="w-full h-16 mx-2 relative flex items-end">
            { #if $cache[`reader.${ post.id }.theme`].name == "light" }
              <div class="absolute top-0 right-0">
                <p class="text-xs text-indigo-400">Выбранная</p>
              </div>
            { /if }
              
            <div on:click={() => changeTheme("light")} class="cursor-pointer { $cache[`reader.${ post.id }.theme`].name == "light" ? " border-2 border-indigo-400" : "" } w-full h-12 flex items-center justify-center rounded-md bg-gray-200">
              <Icon name="sun" attrs={{ class: "w-6 h-6 text-dark" }} />
              
              <p class="ml-2 text-dark text-sm">Светлая</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  { /if }

  <!-- Content itself -->
  <slot></slot>
{ /if }