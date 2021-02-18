<script>
  // Importing modules
  import { goto } from "@sapper/app";
</script>

<section class="rounded-md w-full h-full flex justify-center items-center px-8 relative">
  <!-- Texts -->
  <div style="background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);" class="w-2/3 rounded-md py-12 px-8 flex flex-col items-center px-3 text-center">
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