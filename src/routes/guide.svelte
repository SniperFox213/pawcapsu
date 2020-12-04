<script>
  import { goto } from "@sapper/app";
  import moment from "moment";

  import Cookie from "cookie-universal";

  const cookies = Cookie();

  let stages = [0,1,2];

  let stage = 0;
</script>

<main class="w-full h-screen flex justify-center items-center relative bg-black">

  <!-- Header -->
  <header class="absolute inset-x-0 top-0 w-full bg-black py-2 flex justify-center items-center">
    <!-- Logotype -->
    <button class="px-2 py-2 rounded-md text-white hover:bg-white hover:text-black">
      <svg style="height: 1.4rem; width: 1.4rem;" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 173.24 181.66"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M140.38,119.5,112.45,91.57a37.23,37.23,0,0,0-52.16,0L32.86,119a36.42,36.42,0,0,0,0,51.5h0a36.42,36.42,0,0,0,51.5,0l2-2L88.88,171a36.42,36.42,0,0,0,51.5,0h0A36.42,36.42,0,0,0,140.38,119.5Z"/><ellipse class="cls-1" cx="22.2" cy="71.96" rx="21.36" ry="31.57" transform="matrix(0.97, -0.26, 0.26, 0.97, -17.87, 8.2)"/><ellipse class="cls-1" cx="151.04" cy="71.96" rx="31.57" ry="21.36" transform="translate(42.44 199.23) rotate(-75)"/><ellipse class="cls-1" cx="63.26" cy="31.57" rx="21.36" ry="31.57"/><ellipse class="cls-1" cx="112.67" cy="31.57" rx="21.36" ry="31.57"/></g></g></svg>
    </button>
  </header>

  <!-- Content -->
  <div class="">
    <!-- First stage -->
    { #if stage == 0 }
      <section class="relative w-full px-6 md:px-8 lg:px-16 flex justify-center">
        <!-- Texts -->
        <div class="w-1/3">
          <!-- Title -->
          <h1 class="text-2xl font-medium text-white">Добро пожаловать!</h1>

          <!-- Description -->
          <p class="text-sm mt-2 text-gray-100">Мы действительно рады тому, что Вы решили посетить этот сайт! И перед тем, как запустить Вас на сайт, мы просто должны Вам про него немного рассказать. Если Вам интересно - то продолжайте чтение. Если же Вам не интересно - то просто нажмите на соответствующую кнопку снизу!</p>
       
          <!-- Buttons -->
          <div class="flex mt-6 px-3 justify-between">
            <button on:click={(e) => {
              // Let's now update our cookie
              cookies.set('guide', true, { path: "/", expires: moment().add('1', 'year').toDate() });

              goto("/");
            }} class="transition duration-200 ease-in-out border-1 border-white text-sm rounded-md bg-transparent transform hover:scale-110 active:scale-125 hover:shadow-md hover:bg-white hover:text-black px-4 py-2 text-white">
              Мне не интересно
            </button>

            <button class="transition duration-200 ease-in-out text-sm rounded-md bg-white transform hover:scale-110 active:scale-125 hover:shadow-md hover:bg-white hover:text-black px-4 py-2 text-black">
              Продолжить
            </button>
          </div>
        </div>
      </section>
    { /if }

    <!-- Dots -->
    <div class="absolute inset-x-0 bottom-0 pb-8 w-full flex justify-center items-center">
      { #each stages as s }
        <div class="mx-4 cursor-pointer rounded-full { s == stage ? "bg-white w-4 h-4" : "w-3 h-3 bg-black border-2 border-white" }"></div>
      { /each }
    </div>
  </div>

</main>