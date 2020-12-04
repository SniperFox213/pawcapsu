<script>
  import Popover from "svelte-popover";
  import { fade } from "svelte/transition";

  let page = 1;

  let siteMenuOpened = false;

  let button02Hovered = false;
  let button03Hovered = false;
</script>

<Popover placement="bottom-start" arrow={false} bind:open={siteMenuOpened} overlayColor="rgba(0,0,0,0.25)">
  <div slot="target" class="flex items-center">
    <button on:mouseover={(e) => button02Hovered = true} on:mouseout={(e) => button02Hovered = false} class="px-2 py-2 rounded-md { siteMenuOpened || button02Hovered ? "bg-white" : "" }">
      <svg style="height: 1.4rem; width: 1.4rem;" xmlns="http://www.w3.org/2000/svg" fill="{ button02Hovered || siteMenuOpened ? "#000" : "#fff" }" viewBox="0 0 173.24 181.66"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M140.38,119.5,112.45,91.57a37.23,37.23,0,0,0-52.16,0L32.86,119a36.42,36.42,0,0,0,0,51.5h0a36.42,36.42,0,0,0,51.5,0l2-2L88.88,171a36.42,36.42,0,0,0,51.5,0h0A36.42,36.42,0,0,0,140.38,119.5Z"/><ellipse class="cls-1" cx="22.2" cy="71.96" rx="21.36" ry="31.57" transform="matrix(0.97, -0.26, 0.26, 0.97, -17.87, 8.2)"/><ellipse class="cls-1" cx="151.04" cy="71.96" rx="31.57" ry="21.36" transform="translate(42.44 199.23) rotate(-75)"/><ellipse class="cls-1" cx="63.26" cy="31.57" rx="21.36" ry="31.57"/><ellipse class="cls-1" cx="112.67" cy="31.57" rx="21.36" ry="31.57"/></g></g></svg>
    </button>

    {#if siteMenuOpened}
      <div class="relative ml-1 py-1 px-3 pr-12">
        <h1 class="text-xl text-white font-semibold">Paws</h1>

        <span class="absolute top-0 right-0 rounded-full bg-red-500 px-2 py-1 text-extra-xss text-white">
          prototype
        </span>
      </div>
    {/if}
  </div>

  <div transition:fade slot="content" class="pt-4 pr-8 md:pr-0 w-full md:w-auto min-w-screen md:min-w-26rem">
    <div class="bg-white relative rounded-md shadow-lg px-3 py-6">
      <!-- Navbar -->
      <div class="w-full py-3 text-xs flex justify-center items-center">
        <button on:click={(e) => { page = 1; }} class="mx-2 { page == 1 ? "border-b-1 border-dotted border-gray-100 text-black" : "text-gray-700" }">
          Контент
        </button>

        <button on:click={(e) => { page = 2; }} class="mx-2 { page == 2 ? "border-b-1 border-dotted border-gray-100 text-black" : "text-gray-700" }">
          Общение
        </button>

        <button on:click={(e) => { page = 3; }} class="mx-2 { page == 3 ? "border-b-1 border-dotted border-gray-100 text-black" : "text-gray-700" }">
          Помощь
        </button>
      </div>

      <!-- 
        Content 
        @type: Content
        -->
      <div class="flex flex-wrap justify-center">

        { #if page == 1 }
          <div class="w-32 h-32 px-3 py-3 relative">
            <div on:click={(e) => {}} on:mouseover={(e) => { button03Hovered = true }} on:mouseout={(e) => { button03Hovered = false }} style="{ button03Hovered ? "background-color: white;" : "background: linear-gradient(to right, #0f2027, #203a43, #2c5364);" }" class="w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-md bg-gray-200 shadow-md">
              <!-- Image -->
              <svg style="width: 1.6rem; height: 1.6rem;" class="mb-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{ button03Hovered ? "#000" : "#fff" }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>

              <!-- Some Texts -->
              <h1 class="text-sm { button03Hovered ? "text-black" : "text-white" }">Рассказы</h1>
            </div>
          </div>

          <div class="w-32 h-32 px-3 py-3 relative">
            <div on:click={(e) => {}} style="background: linear-gradient(to right, #00b4db, #0083b0);" class="w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-md bg-gray-200 shadow-md">
              <!-- Image -->
              <svg style="width: 1.6rem; height: 1.6rem;" class="mb-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>

              <!-- Some Texts -->
              <h1 class="text-sm text-white">Картинки</h1>
            </div>
          </div>

          <div class="w-32 h-32 px-3 py-3 relative">
            <div on:click={(e) => {}} style="background: linear-gradient(to right, #11998e, #38ef7d);" class="w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-md bg-gray-200 shadow-md">
              <!-- Image -->
              <svg style="width: 1.6rem; height: 1.6rem;" class="mb-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>

              <!-- Some Texts -->
              <h1 class="text-sm text-white">Новости</h1>
            </div>
          </div>
        { :else if page == 2 }

        { :else if page == 3 }

        { /if }
      </div>

      <!-- "Show all" Button -->
      <div class="mt-3 w-full flex justify-center">
        <button class="text-xs text-gray-700 border-b-1 border-dotted border-gray-700">
          Показать всё
        </button>
      </div>
    </div>
  </div>
</Popover>