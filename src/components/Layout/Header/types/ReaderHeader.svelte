<script>
  // Importing modules

  // Importing stores
  import profile from "../../../../stores/profile.js";

  // Importing components
  import Icon from "../../../Icon.svelte";

  let menuOpened = false;
</script>

<!-- Mobile menu -->
{ #if menuOpened }
  <div style="z-index: 1000; overflow: hidden; overflow-y: auto;" class="fixed md:hidden inset-0 w-full h-full bg-dark mt-16 pb-24">
    <!-- Fast-actions -->
    <div class="px-2 py-4">
      <!-- Title -->
      <div class="mx-2 w-full border-b-2 border-indigo-400 py-2">
        <h1 class="text-2xl text-white">Быстрые действия</h1>
        <p class="text-sm text-gray-100 opacity-70">Всё то, что вам может пригодится прямо тут и прямо сейчас.</p>
      </div>

      <!-- Content -->
      <div class="w-full flex flex-wrap relative mt-2">
        <!-- Reader settings -->
        <div class="w-full p-2">
          <div style="padding-top: 30%" class="w-full relative">
            <div class="absolute inset-0 w-full h-full rounded-md bg-light-dark flex justify-center items-center px-6">
              <!-- Image -->
              <img class="h-2/4" src="./icons/wrench.png" alt="Wrench Icon">

              <!-- Texts -->
              <div class="ml-6 w-max">
                <h1 class="text-2xl text-white">Настройки читалки</h1>
                <p class="text-sm text-gray-100 opacity-70">Настройте цвет фона, букв; размер отступов, размер букв и ещё много-много другого.</p>
              </div>
            </div>
          </div>
        </div>
      
        <!-- Other -->
        <div class="w-1/3 p-2">
          <div style="padding-top: 100%;" class="w-full relative">
            <div class="absolute inset-0 w-full h-full rounded-md bg-light-dark flex flex-col items-center justify-center">
              <!-- Image -->
              <img class="h-1/3" src="./icons/bookmark-tabs.png" alt="Wrench Icon">

              <!-- Texts -->
              <div class="mt-4">
                <h1 class="text-xl text-white">Главы</h1>
              </div>
            </div>
          </div>
        </div>

        <div class="w-1/3 p-2">
          <div style="padding-top: 100%;" class="w-full relative">
            <div class="absolute inset-0 w-full h-full rounded-md bg-light-dark flex flex-col items-center justify-center">
              <!-- Image -->
              <img class="h-1/3" src="./icons/speech-balloon.png" alt="Chat bubble Icon">

              <!-- Texts -->
              <div class="mt-4">
                <h1 class="text-xl text-white">Обсуждения</h1>
              </div>
            </div>
          </div>
        </div>

        <div class="w-1/3 p-2">
          <div style="padding-top: 100%;" class="w-full relative">
            <div class="absolute inset-0 w-full h-full rounded-md border-4 border-dotted border-light-dark flex flex-col items-center justify-center">
              <div class="w-2/3 text-center">
                <p class="text-md text-white">Ещё что-то</p>
                <p class="text-xs text-gray-100 opacity-70">Скоро тут что-то будет...</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Site pages -->
    <div class="px-2 py-4">
      <!-- Title -->
      <div class="mx-2 w-full border-b-2 border-indigo-400 py-2">
        <h1 class="text-2xl text-white">Навигация</h1>
        <p class="text-sm text-gray-100 opacity-70">Удобная и быстрая навигация по всему сайту именно тут!</p>
      </div>

      <!-- Content -->
      <div class="w-full flex flex-wrap relative mt-2">
        <!-- Reader settings -->
        <div class="w-full p-2">
          <div style="padding-top: 30%" class="w-full relative">
            <div class="absolute inset-0 w-full h-full rounded-md bg-light-dark">
              s
            </div>
          </div>
        </div>
      
        <!-- Other -->
        <div class="w-1/3 p-2">
          <div style="padding-top: 100%;" class="w-full relative">
            <div class="absolute inset-0 w-full h-full rounded-md bg-light-dark">
              s
            </div>
          </div>
        </div>

        <div class="w-1/3 p-2">
          <div style="padding-top: 100%;" class="w-full relative">
            <div class="absolute inset-0 w-full h-full rounded-md bg-light-dark">
              s
            </div>
          </div>
        </div>

        <div class="w-1/3 p-2">
          <div style="padding-top: 100%;" class="w-full relative">
            <div class="absolute inset-0 w-full h-full rounded-md bg-light-dark">
              s
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
{ /if }

<!-- Header -->
<div class="w-full flex justify-between bg-white border-b border-gray-200 items-center h-16 px-6 md:px-8 relative">
  <!-- Pawcapsu Logotype (mobile) -->
  <div on:click={(e) => {
    if (menuOpened) {
      menuOpened = false;
    } else {
      menuOpened = true;
    };
  }} style="z-index: 1000;" class="absolute cursor-pointer inset-x-0 left-0 flex items-center px-6">
    { #if menuOpened }
      <Icon name="x" attrs={{ class: "w-7 h-7 text-black" }}/>
    { :else }
      <img class="w-7 h-7" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1614110162/logotypes/pawcapsu-black-small.svg" alt="pawcapsu logotype">
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
  <div class="absolute inset-x-0 right-0 flex justify-end items-center px-6">
    <!-- Avatar -->
    { #if $profile.avatar == null }
      <div class="w-8 h-8 rounded-full border border-indigo-400 flex justify-center items-center">
        <Icon name="feather" attrs={{ class: "text-gray-800 w-4 h-4" }} />
      </div>
    { /if }

    <!-- Show profile information -->
    <button on:click={(e) => {
      profileHidden = false;
    }} class="hidden mx-1 w-8 h-8 md:flex justify-center items-center">
      <!-- Grid Icon -->
      <Icon name="more-vertical" attrs={{ class: "w-5 h-5 text-black" }} />
    </button>
  </div>
</div>
