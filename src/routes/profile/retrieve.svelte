<script>
  // Importing modules
  import { onMount } from "svelte";

  // Importing stores
  import { goto, stores } from "@sapper/app";
  const { page } = stores();

  // Importing actions
  import { LoadProfile } from "../../actions/profile";

  // Importing components
  import Icon from "../../../../lococovu-auth/src/components/Icon.svelte";

  // Variables

  // @variable error
  // - Stores current error information
  let error;

  // onMount
  // - Here we'll send load
  // promise to our server
  // and wait.
  onMount(() => {
    LoadProfile($page.query.identifier, $page.query.provider)
    .then((response) => {
      goto(`/profile/${$page.query.identifier}`);
    }).catch((error) => {
      console.log("ERROR");
      console.log(error);
    });
  });
</script>

<!-- Page's Layout -->
<main class="h-full flex justify-center items-center">
  <div class="w-1/3 flex flex-col items-center justify-center text-center">
    <!-- Image (GIF) -->
    <img class="w-1/2 rounded-lg" src="https://media.giphy.com/media/X9tNamOBXSyVpFXOWI/giphy.gif" alt="">

    <!-- Text -->
    <h2 class="text-2xl text-white font-bold mt-2">Загружаем этого человечка...</h2>
    <p class="text-base text-gray-100 opacity-80 w-4/5">Подождите немного пока мы возьмём кое-какие данные этого пользователя. Скоро всё будет готово!</p>
  
    <!-- Buttons -->
    <div class="mt-4 w-4/5 relative flex justify-center">
      <button class="rounded-md px-4 py-2 bg-light-dark text-white flex items-center">
        <!-- Text -->
        <p class="text-sm font-medium">Вернуться назад</p>

        <!-- Icon -->
        <Icon name="home" attrs={{ class: "w-3 h-3 ml-2" }} />
      </button>
    </div>
  </div>
</main>