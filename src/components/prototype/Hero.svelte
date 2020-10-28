<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let time = 0;
  let maxTime = 12;

  let section = 1;
  let nextSection = 2;
  let sections = [{
    id: 1,
    name: "Новости"
  },
  {
    id: 2,
    name: "Рекомендации"
  }];

  // onMount(() => {
  //   setInterval(() => {
  //     time++;

  //     if (time >= maxTime) {
  //       // Change section;
  //       section++;
  //       time = 0;
        
  //       // Let's now determine our next section
  //       nextSection = section + 1;
  //       if (nextSection > sections.length) {
  //         nextSection = 1;
  //       };

  //       if (section > sections.length) {
  //         section = 1;
  //         nextSection = 2;
  //       };
  //     };
  //   }, 1000);
  // });
</script>

<div style="background-image: url('https://source.unsplash.com/random/1000x900'); background-size: cover; background-repeat: no-repeat;" class="w-full h-100vh relative">
  <!-- Overlay -->
  <div style="background: rgba(0,0,0,0.6)" class="absolute inset-0 w-full h-full flex flex-col md:flex-row px-4 md:px-6 lg:px-8 justify-center md:justify-between items-center">
    <!-- Content -->
    {#if section == 1}
      <div in:fade class="w-full md:w-1/3 px-4 md:px-6">
        <!-- Badges -->
        <div class="flex">
          <span class="mr-2 rounded-full text-sm bg-yellow-500 text-white px-3 py-1">
            Новости
          </span>

          <span class="ml-2 rounded-full text-sm bg-blue-500 text-white px-3 py-1">
            Время чтения: 5 минут
          </span>
        </div>

        <!-- Texts -->
        <div class="mt-4">
          <!-- Heading -->
          <h1 class="text-4xl text-white font-semibold">Lorem ipsum</h1>

          <!-- Subheading -->
          <h2 class="text-sm text-gray-300">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam ducimus neque nostrum officiis atque voluptatem vel earum expedita, nesciunt, consequatur maxime voluptate tempora ratione ad quos necessitatibus harum placeat deleniti iste maiores.</h2>
        </div>

        <!-- Buttons -->
        <div class="flex items-center mt-4">
          <!-- Read Now -->
          <button class="rounded-md mr-2 bg-white hover:bg-black hover:text-white px-4 py-2 text-black">
            Читать сейчас
          </button>

          <!-- Read Later -->
          <button class="px-3 py-3 ml-2 text-white hover:text-black hover:bg-white rounded-md">
            <svg style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </button>
        </div>
      </div>

      <div class="w-2/3">

      </div>
    { :else if section == 2 }
      <div in:fade class="w-full h-full flex flex-col justify-center items-center">
        <!-- Text -->
        <div class="w-full text-center py-6">
          <h1 class="text-4xl text-white font-semibold">Рекомендовано вам</h1>
          <h2 class="text-gray-300 text-sm">Наша птичка потрудилась специально для Вас, найдя самый интересный вам контент.</h2>
        </div>

        <!-- Stories list -->
        <div class="mt-6 flex justify-center w-2/3 flex-wrap">
          <div class="w-full md:w-1/3 p-2 relative">
						<!-- Post Content
						@type: Image Submission -->
						<div style="padding-top: 100%; background-image: url('https://source.unsplash.com/random/800x900'); background-size: cover; background-repeat: no-repeat;" class="relative w-full">
							<!-- Overlay -->
							<div style="background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%);" class="absolute inset-0 w-full h-full flex items-end">
								<!-- Text and some Statistics -->

								<div class="w-full py-2 px-3">
									<!-- Submission name -->
									<span class="flex items-center">
										<!-- Type Icon -->
										<svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
										<p class="text-white text-xl font-semibold ml-1">Some text</p>
									</span>

									<!-- Submission author -->
									<p class="text-gray-100 text-sm">by <span class="border-b-1 border-dotted border-gray-700">Juiipup</span></p>
								
									<!-- Statistics -->
									<div class="w-full flex justify-start mt-1">
										<!-- Likes -->
										<span class="mr-3 flex items-center">
											<svg style="width: 0.8rem; height: 0.8rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
											<p class="text-extra-xs text-gray-500 ml-1">212</p>
										</span>

										<!-- Comments -->
										<span class="mr-3 flex items-center">
											<svg style="width: 0.8rem; height: 0.8rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
											<p class="text-extra-xs text-gray-500 ml-1">16</p>
										</span>
									</div>
								</div>
							</div>
						</div>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <!-- Sections and timer -->
  <div class="absolute inset-x-0 bottom-0 w-full flex justify-center items-center py-6">
    <!-- Sections number -->
    {#each sections as s}

      <!-- {#if nextSection == s.id}
        <span on:click={(e) => {
          section = s.id
        }} class="cursor-pointer flex items-center opacity-75">
          <p class="ml-4 text-white text-sm">{s.name}</p>  
          #Animation
          #<span style="{ Math.round(time/3) <= 1 ? "border-top-color: white;" : Math.round(time/3) <= 2 ? "border-top-color: white; border-right-color: white;" : Math.round(time/3) <= 3 ? "border-top-color: white; border-right-color: white; border-bottom-color: white;" : "border-color: white;" }" class="cursor-pointer w-2 h-2 rounded-full border-2 border-gray-600 border-solid mx-2"></span>
        </span>
      {:else} -->
      {#if section == s.id}
         <!-- content here -->
         <p on:click={(e) => {
          section = s.id;
        }} class="mx-4 cursor-pointer text-white font-semibold text-sm border-b-1 border-solid border-white">{s.name}</p>
      
      { :else }
        <p on:click={(e) => {
          section = s.id;
        }} class="mx-4 cursor-pointer text-white text-sm opacity-75">{s.name}</p>
      {/if}
      <!-- {/if} -->
    {/each}
  </div>
</div>