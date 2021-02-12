<script>
  // Importing modules
  import { onMount } from "svelte";

  // Exporting some variables

  // @export id
  // - This post id
  export let id;

  // @export post
  // - Preloaded post data
  export let post = {};
</script>

<div class="flex flex-col md:flex-row p-8">
  <!-- Image itself -->
  <div class="rounded-t-md w-full md:w-1/2 relative">
    <img class="w-max h-auto rounded-md" src="{ post.source.image }" alt="">
  </div>
  
  <!-- Texts and so on -->
  <div class="w-full md:w-1/2 h-full relative mt-6 md:mt-0 md:pl-8">
    <!-- Title -->
    <h1 class="text-4xl text-white font-medium">{ post.source.title }</h1>

    <!-- Author -->
    <div class="my-2 w-full flex items-center">
      <div style="background-image: url('{ post.author.avatar }'); background-size: cover; background-position: center;" class="w-10 h-10 rounded-full"></div>
    
      <h1 class="text-md font-medium text-white ml-2">{ post.author.displayName }</h1>
    </div>

    <!-- Description -->
    <p class="text-md mt-3 text-gray-100 opacity-75">{ @html post.source.description.replaceAll("\n", "<br />") }</p>
  </div>
</div>