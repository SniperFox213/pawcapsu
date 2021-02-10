<script>
  // Importing modules
  import { goto } from "@sapper/app";
</script>

<section style="background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);" class="rounded-md w-full h-full flex justify-center items-center px-8 relative">
  <!-- Waves Background -->
  <div style="z-index: 0;" class="flex items-end absolute inset-0 w-full h-full">
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L80,261.3C160,267,320,277,480,240C640,203,800,117,960,117.3C1120,117,1280,203,1360,245.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> -->
  </div>

  <!-- Texts -->
  <div class="w-1/2 flex flex-col items-center px-3 text-center">
    <h1 class="text-5xl text-gray-100 font-bold">Больше приложений - больше возможностей</h1>
    <p class="mt-2 text-md text-gray-100 opacity-75">Некоторый функционал мы не смогли поместить в сам сайт. Именно поэтому мы решили добавить приложения! Их максимально много и они максимально маленькие, зато в них много потенциала!</p>

    <!-- Buttons -->
    <div class="w-2/3 mt-6">
      <div class="flex justify-center items-center w-full relative">
        <!-- Start -->
        <button on:click={() => goto('/apps/browse')} class="flex w-1/2 items-center justify-center py-2 rounded-md bg-white">
          <p class="text-sm text-black font-medium">Библиотека приложений</p>
        </button>

        <!-- More -->
        <button class="cursor-not-allowed opacity-60 ml-4 w-1/2 flex items-center justify-center py-2 rounded-md bg-white">
          <p class="text-sm text-black font-medium">Узнать больше</p>
        </button>
      </div>
    </div>
  </div>
</section>