<script>
  // Importing components
  import Icon from "../../Icon.svelte";
  // Exporting some variables

  // @export post
  // - Preloaded post data
  export let post = {};
</script>

<div class="flex flex-col md:flex-row h-full relative">
  <!-- Image itself -->
  <div class="h-full w-full md:w-2/3 border-b md:border-r border-gray-700 flex justify-center items-center relative">
    <img class="w-auto h-full rounded-md py-6 px-2" src="{ post.source.image }" alt="">

    <!-- Image manipulation Buttons -->
    <div style="z-index: 2;" class="absolute bottom-0 right-0 px-6 flex justify-end items-center">
      <!-- Open in new tab -->
      <button class="mx-3 cursor-pointer">
        <Icon name="external-link" attrs={{ class: "w-4 h-4 text-light-dark" }} />
      </button>

      <!-- Download image -->
      <button class="cursor-pointer">
        <Icon name="download" attrs={{ class: "w-4 h-4 text-light-dark" }} />
      </button>
    </div>
  </div>
  
  <!-- Texts and so on -->
  <div style="overflow: hidden; overflow-y: auto;" class="relative h-full w-full md:w-1/3 mt-6 md:mt-0 md:pl-8">
    <!-- Title -->
    <h1 class="text-4xl text-white font-medium">{ post.source.title }</h1>

    <!-- Description -->
    <p class="text-md mt-3 text-gray-100 opacity-75">{ @html post.source.description.replaceAll("\n", "<br />") }</p>
  
    <!-- Author -->
    <div class="mt-8 my-2 w-full flex items-center relative">
      <div style="background-image: url('{ post.author.avatar }'); background-size: cover; background-position: center;" class="w-10 h-10 rounded-full"></div>
    
      <div class="ml-2">
        <h1 class="text-md font-medium text-white">{ post.author.displayName }</h1>
        <p class="text-xs text-gray-100 opacity-70">Show on <span class="border-b border-dotted border-gray-100">FurryNetwork</span></p>
      </div>

      <!-- Profile-related buttons -->
      <div class="absolute right-0 h-full flex items-center justify-center">
        <!-- Subscribe -->
        <button class="mx-4">
          <Icon name="heart" attrs={{ class: "w-4 h-4 text-white" }} />
        </button>

        <!-- Show profile -->
        <button class="">
          <Icon name="external-link" attrs={{ class: "w-4 h-4 text-white" }} />
        </button>
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-3 mb-6 w-full flex items-stretch justify-center">
      <button class="flex w-1/3 items-center justify-center py-2 rounded-md bg-indigo-400">
        <p class="text-sm text-white font-medium">Like</p>
      </button>

      <button class="flex mx-2 w-1/3 items-center justify-center py-2 rounded-md bg-indigo-400">
        <p class="text-sm text-white font-medium">Like</p>
      </button>

      <button class="flex w-1/3 items-center justify-center py-2 rounded-md bg-indigo-400">
        <p class="text-sm text-white font-medium">Like</p>
      </button>
    </div>

    <!-- Comments section -->
    <div class="w-full">
      <!-- Add comment -->
      <div class="">

      </div>

      <!-- Comments themselves -->
      <div class="mt-3">
        <!-- Comment -->
        <div class="w-full flex">
          <!-- Avatar -->
          <div class="w-6 h-6 rounded-full bg-red-400"></div>

          <!-- Texts -->
          <div class="ml-2 w-5/6">
            <!-- Author name -->
            <div class="flex items-center">
              <h1 class="text-md text-white font-medium">Juiipup</h1>

              <!-- Timestamp -->
              <p class="mx-2 text-sm text-gray-100 opacity-60">13 секунд назад</p>
            </div>

            <!-- Author comment -->
            <div class="my-2">
              <p class="text-white text-sm opacity-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, quod modi. Dolor adipisci at corrupti?</p>
            </div>

            <!-- Likes and other buttons -->
            <div class="w-full flex items-center">
              <!-- Like -->
              <button>
                <Icon name="heart" attrs={{ class: "w-4 h-4 text-white opacity-70" }} />
              </button>

              <!-- Reply -->
              <button class="mx-5">
                <Icon name="message-square" attrs={{ class: "w-4 h-4 text-white opacity-70" }} />
              </button>

              <!-- Share -->
              <button>
                <Icon name="share-2" attrs={{ class: "w-4 h-4 text-white opacity-70" }} />
              </button>
            </div>
          </div>

          <!-- Subcomment -->
        </div>
      </div>
    </div>
  </div>
</div>