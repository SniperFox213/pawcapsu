<script>
  // Importing modules/stores
  import Popover from "svelte-popover";
  
  import { goto } from "@sapper/app";

  import profile from "../../../../stores/profile.js";
  import notifications from "../../../../stores/notifications.js";

  // Importing icons
  import Login32 from "carbon-icons-svelte/lib/Login32";
  import InformationSquare32 from "carbon-icons-svelte/lib/InformationSquare32";
  import Wallet32 from "carbon-icons-svelte/lib/Wallet32";
  
  import HintonPlot32 from "carbon-icons-svelte/lib/QHintonPlot32";

  // Import components
  import Button from "./Button.svelte";

  let button03Hovered = false;

  let siteMenuOpened = false;

  let page = 1;
</script>

<div class="flex items-center">
  <!-- User Avatar -->
  { #if $profile.id != 0 }
    <div on:click={(e) => {
      siteMenuOpened = true;
      page = 2;
    }} style="width: 2rem; height: 2rem; background-image: url('{$profile.avatar}'); background-repeat: no-repeat; background-position: center; background-size: cover;" class="rounded-full mx-2 cursor-pointer"></div>
  { /if }

  <!-- Popover -->
  <Popover placement="bottom-end" arrow={false} bind:open={siteMenuOpened} overlayColor="rgba(0,0,0,0.25)">
    <button on:click={(e) => {
      page = 1;
    }} slot="target" class="transition duration-200 ease-in-out px-2 py-2 mx-2 text-white hover:text-black hover:bg-white rounded-md relative">
      <HintonPlot32 style="width: 1.2rem; height: 1.2rem; fill: currentColor" />
 
      { #if $notifications.length > 0 }
        <span class="absolute top-0 right-0 rounded-full w-4 h-4 text-white flex items-center justify-center bg-red-400">
          <p class="block text-extra-xss">{ $notifications.length >= 9 ? "9+" : $notifications.length }</p>
        </span>
      { /if }
    </button>

    <div slot="content" class="pt-4 pr-8 md:pr-0 w-full md:w-auto min-w-screen md:min-w-26rem">
      <div class="bg-white relative rounded-md shadow-lg px-3 py-6">
        <!-- User-related information -->

        { #if $profile.id != 0 }
          <div class="w-full flex flex-col items-center mb-6">
            <div class="flex items-center">
              <!-- Avatar -->
              <div style="width: 3.5rem; height: 3.5rem; background-image: url('{$profile.avatar}'); background-repeat: no-repeat; background-position: center; background-size: cover;" class="rounded-full mx-2 cursor-pointer"></div>

              <!-- Texts -->
              <div class="ml-2">
                <h1 class="text-black text-md">{$profile.displayName}</h1>

                <!-- Statistics pane -->
                <div class="flex">
                  <!-- Followers -->
                  <span>
                    <p class="text-xs text-gray-700">Подписчиков: 1k+</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Navbar -->
          <div class="w-full py-3 text-xs flex justify-center items-center">
            <button on:click={(e) => {
              page = 1;
            }} class="mx-2 relative px-3 py-1 { page == 1 ? "border-b-1 border-dotted border-gray-100 text-black" : "text-gray-700" }">
              Панель

              <span class="absolute top-0 right-0 rounded-full w-4 h-4 text-white flex items-center justify-center bg-red-400">
                <p class="block text-extra-xss">9+</p>
              </span>
            </button>

            <button on:click={(e) => {
              page = 2;
            }} class="mx-2 px-3 py-1 { page == 2 ? "border-b-1 border-dotted border-gray-100 text-black" : "text-gray-700" }">
              Творчество
            </button>

            <button on:click={(e) => {
              page = 3;
            }} class="mx-2 px-3 py-1 { page == 3 ? "border-b-1 border-dotted border-gray-100 text-black" : "text-gray-700" }">
              Аккаунт
            </button>
          </div>

          <!-- 
            Content 
            @type: Notifications
            -->
          <div class="flex flex-wrap justify-center">
            { #if page == 1 }
              <!--  -->

              <div class="w-32 h-32 px-3 py-3 relative">
                <div on:click={(e) => {}} style="background: linear-gradient(to right, #ffafbd, #ffc3a0);" class="w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-md bg-gray-200 shadow-md">
                  <!-- Image -->
                  <span class="relative px-4 pt-3">
                    <svg style="width: 1.6rem; height: 1.6rem;" class="mb-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                  </span>

                  <!-- Some Texts -->
                  <h1 class="text-sm text-white">Друзья</h1>
                </div>
              </div>

              <div class="w-32 h-32 px-3 py-3 relative">
                <div on:click={(e) => {}} style="background: linear-gradient(to right, #4568dc, #b06ab3);" class="w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-md bg-gray-200 shadow-md">
                  <!-- Image -->
                  <span class="relative px-4 pt-3">
                    <svg style="width: 1.6rem; height: 1.6rem;" class="mb-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>

                    <!-- Red Notification Dot -->
                    <span class="absolute top-0 right-0 rounded-full w-6 h-6 text-white flex items-center justify-center bg-red-400">
                      <p class="block text-xs">9+</p>
                    </span>
                  </span>

                  <!-- Some Texts -->
                  <h1 class="text-sm text-white">Сообщения</h1>
                </div>
              </div>

              <div class="w-32 h-32 px-3 py-3 relative">
                <div on:click={(e) => {}} style="background: linear-gradient(to right, #f2994a, #f2c94c);" class="w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-md bg-gray-200 shadow-md">
                  <!-- Image -->
                  <span class="relative px-4 pt-3">
                    <svg style="width: 1.6rem; height: 1.6rem;" class="mb-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>

                    <!-- Red Notification Dot -->
                    <span class="absolute top-0 right-0 rounded-full w-6 h-6 text-white flex items-center justify-center bg-red-400">
                      <p class="block text-xs">2</p>
                    </span>
                  </span>

                  <!-- Some Texts -->
                  <h1 class="text-sm text-white">Новости</h1>
                </div>
              </div>

              <!-- Smol help information -->
              <div class="w-full rounded-lg bg-gray-100 mx-4 px-4 py-2">
                <!-- NavBar -->
                <div class="w-full flex items-center justify-between">
                  <!-- Help Icon -->
                  <div class="flex items-center">
                    <svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a202c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    
                    <h1 class="text-gray-900 ml-2">Помощь</h1>
                  </div>

                  <!-- Close Button -->
                  <button class="px-2 py-2">
                    <svg style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

                <!-- Text -->
                <p class="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

            <!-- 
              Content
              @type: Account -->
            { :else if page == 3 }
              <div class="w-32 h-32 px-3 py-3 relative">
                <div on:click={(e) => {}} on:mouseover={(e) => { button03Hovered = true }} on:mouseout={(e) => { button03Hovered = false }} style="{ button03Hovered ? "background-color: white;" : "background: linear-gradient(to right, #ff9966, #ff5e62);" }" class="w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-md bg-gray-200 shadow-md">
                  <!-- Image -->
                  <svg style="width: 1.6rem; height: 1.6rem;" class="mb-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ button03Hovered ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>

                  <!-- Some Texts -->
                  <h1 class="text-sm { button03Hovered ? "text-black" : "text-white" }">Настройки</h1>
                </div>
              </div>

              <div class="w-32 h-32 px-3 py-3 relative">
                <div on:click={(e) => {}} style="background: linear-gradient(to right, #396afc, #2948ff);" class="w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-md bg-gray-200 shadow-md">
                  <!-- Image -->
                  <svg style="width: 1.6rem; height: 1.6rem;" class="mb-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>

                  <!-- Some Texts -->
                  <h1 class="text-sm text-white">Выйти</h1>
                </div>
              </div>
            { /if }
          </div>
        { :else }
          <div class="w-full py-3 text-xs flex justify-center items-center">
            <button class="mx-2 px-3 py-1 border-b-1 border-dotted border-gray-100 text-black">
              Сайт
            </button>
          </div>

          <!-- Login button -->
          <div class="flex flex-wrap justify-center">
            <!-- 
              Content
              @type: Site-relative -->

            <!-- Login button -->
            <Button on:click={(e) => {
                goto("https://authed.unfull.ml/callback?url=http://localhost:3000/authorize/:token");
              }} background="background: linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%);" color="#fff" colorHovered="#000">
              <!-- Image -->
              <Login32 style="fill: currentColor; width: 1.6rem; height: 1.6rem;" />

              <!-- Some Texts -->
              <h1 style="color: currentColor;" class="text-xs text-white mt-2">Войти</h1>
            </Button>

            <!-- Donate button -->
            <Button on:click={(e) => {}} background="background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);" color="#fff" colorHovered="#000">
              <Wallet32 style="fill: currentColor; width: 1.6rem; height: 1.6rem;" />

              <h1 style="color: currentColor;" class="text-xs text-white mt-2">Поддержать</h1>
            </Button>

            <!-- Information button -->
            <Button on:click={(e) => {}} background="background: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);" color="#fff" colorHovered="#000">
              <InformationSquare32 style="fill: currentColor; width: 1.6rem; height: 1.6rem;" />

              <h1 style="color: currentColor;" class="text-xs text-white mt-2">Инфо</h1>
            </Button>
          </div>

          <!-- Help Panel -->
        { /if }

        <!-- "Show all" Button -->
        <!-- <div class="mt-3 w-full flex justify-center">
          <button class="text-xs text-gray-700 border-b-1 border-dotted border-gray-700">
            Показать всё
          </button>
        </div> -->
      </div>
    </div>
  </Popover>
</div>