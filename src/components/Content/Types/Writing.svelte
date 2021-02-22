<script>
  // Importing modules
  import { afterUpdate, createEventDispatcher } from "svelte";
  
  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";

  const dispatch = createEventDispatcher();

  // Importing components
  import Icon from "../../Icon.svelte";

  // Variables

  export let hover;

  // @variable screen
  // - Current screen of this card
  let screen = 1;
  let pages  = [1,2,3];

  // @variable sizes
  // - Card sizes + text sizes
  let sizes = {
    width: "1/4",

    imageHeight: "2/3",
    textHeight: "1/3",

    titleSize: "md",
    textSize: "xs"
  };

  // Function, that'll redirect
  // client to this profile account
  function openProfile() {
    goto(`/profile/retrieve?provider=${ entry.provider || "internal" }&identifier=${entry.author.nickname}`);
  };

  // Function, that'll open this post for
  // this user
  function openPost() {
    // Firstly we need to send event to our browser component
    // (or whatever component we have as parent component)
    dispatch("open", entry);

    // And now we need to change our current url
    // url.searchParams.set('foo', 'bar');
    window.history.pushState({}, "", `/post/${entry.id}`);
  };

  function changeScreen() {
    screen += 1;

    if (screen > pages.length) {
      screen = 1;
    };
  };

  // After Update
  // - Updating card sizes
  afterUpdate(() => {
    // Updating sizes
    switch (size) {
      case "sm":
        sizes = {
          width: "1/4",

          imageHeight: hideContent ? "full" : "2/3",
          textHeight: hideContent ? "none" : "1/3",
          
          titleSize: "md",
          textSize: "xs"
        };
        break;
    
      case "md":
        sizes = {
          width: "1/3",

          imageHeight: hideContent ? "full" : "4/5",
          textHeight: hideContent ? "none" : "1/5",

          titleSize: "md",
          textSize: "xs"
        };
        break;
    
      case "xl":
        sizes = {
          width: "1/2",

          imageHeight: hideContent ? "full" : "5/6",
          textHeight: hideContent ? "none" : "1/6",

          titleSize: "xl",
          textSize: "sm"
        };
        break;
    };
  });

  // Exporting variables

  // @export entry
  // - Post information
  export let entry = {};

  // @export cardSize
  // - Card size. Default: 1/4
  // values: 1/4, 1/3, 1/2
  export let size = "1/4";
  
  // @export hideContent
  // - Do we need to hide
  // content section (artwork name, statistics)
  export let hideContent = false;
</script>

<!-- ContentCard layout -->
<div in:fade class="w-full md:w-{ sizes.width } relative p-2">
  <div style="padding-top: 120%" class="w-full relative">
    <div on:click={() => changeScreen()} on:mouseenter={() => hover = true} on:mouseleave={() => hover = false} class="absolute cursor-pointer inset-0 w-full h-full bg-light-dark rounded-lg flex flex-col justify-center items-center">
      { #if screen == 1 }
        <!-- Author name + Text title -->
        <div class="px-4 text-center">
          <p class="text-gray-100 text-sm opacity-75">{ entry.author.nickname }</p>
          
          <h1 class="text-2xl text-white font-medium my-0.5">{ entry.source.title }</h1>
        
          <p class="text-gray-100 text-sm opacity-75">ビースターズ | BEASTARS</p>
        </div>
      <!-- Summary screen -->
      { :else if screen == 2 }
      
        <!-- Title -->
        <div class="mt-4 text-center">
          <h1 class="text-2xl text-white font-medium my-0.5">{ entry.source.title }</h1>
          <p class="text-gray-100 text-sm opacity-75">ビースターズ | BEASTARS</p>
        </div>

        <!-- Tags -->
        <div class="my-4 px-4 w-full flex justify-center items-center">
          <div class="mx-1 px-2 py-0.5 rounded-full bg-red-400 opacity-70">
            <p class="text-xs text-white">Smut</p>
          </div>
          
          <div class="mx-1 px-2 py-0.5 rounded-full bg-dark opacity-60">
            <p class="text-xs text-white">Fluff</p>
          </div>

          <div class="mx-1 px-2 py-0.5 rounded-full bg-dark opacity-60">
            <p class="text-xs text-white">Angst</p>
          </div>
          
          <div class="mx-1 px-2 py-0.5 rounded-full bg-dark opacity-60">
            <p class="text-xs text-white">Platonic ...</p>
          </div>
          
        </div>
        
        <!-- Description  -->
        <div style="overflow: hidden; overflow-y: auto;" class="px-4 flex-grow mb-20">
          <p class="text-gray-100 text-base opacity-80">{ entry.source.description }</p>
        </div>
      <!-- Statistics, author and so on -->
      { :else }
        <!-- Title -->
        <div class="mt-4 text-center">
          <h1 class="text-2xl text-white font-medium my-0.5">{ entry.source.title }</h1>
          <p class="text-gray-100 text-sm opacity-75">ビースターズ | BEASTARS</p>
        </div>

        <!-- Author and statistics -->
        <div style="overflow: hidden; overflow-y: auto;" class="flex-grow w-full px-4">
          <!-- Author -->
          <div class="w-full flex justify-start items-center py-6 px-4 relative">
            <!-- Avatar -->
            <div class="w-10 h-10 rounded-full bg-dark"></div>

            <!-- Texts -->
            <div class="ml-2">
              <h1 class="text-base text-white">{ entry.author.nickname }</h1>
              <p class="text-xs text-gray-100 opacity-70">Lorem ipsum dolor sit.</p>
            </div>

            <!-- Buttons -->
            <div class="absolute inset-y-0 right-0 h-full flex items-center">
              <!-- More actions -->
              <button class="mx-1 h-8 w-8 rounded-md flex justify-center items-center bg-dark opacity-80">
                <Icon name="grid" attrs={{ class: "text-white h-4 w-4" }} />
              </button>

              <!-- Add to favourites -->
              <button class="mx-1 h-8 w-8 rounded-md flex justify-center items-center bg-dark opacity-80">
                <Icon name="star" attrs={{ class: "text-white h-4 w-4" }} />
              </button>
            </div>
          </div>

          <!-- Statistics -->
          <div class="w-full text-center relative">
            <div class="mt-2 w-full">
              <!-- Views -->
              <div class="w-full flex items-center justify-start my-2">
                <Icon name="eye" attrs={{ class: "text-white h-4 w-4 opacity-60" }} />
             
                <p class="text-sm text-gray-100 ml-2"><span class="text-white">Просмотров:</span> { entry.source.views }</p>
              </div>

              <!-- Chapters -->
              <div class="w-full flex items-center justify-start my-2">
                <Icon name="align-center" attrs={{ class: "text-white h-4 w-4 opacity-60" }} />
              
                <p class="text-sm text-gray-100 ml-2"><span class="text-white">Слов:</span> { entry.meta.words } шт.</p>
              </div>

              <!-- Words -->
              <div class="w-full flex items-center justify-start my-2">
                <Icon name="layers" attrs={{ class: "text-white h-4 w-4 opacity-60" }} />
             
                <p class="text-sm text-gray-100 ml-2"><span class="text-white">Глав:</span> { entry.meta.chapters }</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div style="z-index: 2;" class="absolute h-16 inset-x-0 bottom-0 bg-dark border-2 border-t-0 rounded-b-md border-light-dark w-full px-6 flex justify-center items-center">
          <button on:click={(e) => {
            goto(`/reader/${ entry._id }`);
          }} class="w-1/2 flex justify-center items-center h-8 border-r border-light-dark">
            <Icon name="book-open" attrs={{ class: "w-4 h-4 text-white" }} />
            
            <p class="text-white ml-2">Читать</p>
          </button>

          <button class="w-1/2 flex justify-center items-center h-8">
            <Icon name="clock" attrs={{ class: "w-4 h-4 text-white" }} />

            <p class="text-white ml-2">На потом</p>
          </button>
        </div>
      { /if }

      <!-- Dots -->
      <div class="absolute inset-x-0 bottom-0 w-full py-4 text-center opacity-60">
        <!-- Little help -->
        <p class="text-xs text-white">Нажмите, что бы узнать больше</p>

        <!-- Pages -->
        <div class="flex items-center justify-center mt-1">
          { #each pages as page }
            <div class="{ page == screen ? "w-4 h-4 bg-white" : "w-3 h-3 border-2 border-white" } rounded-full mx-2"></div>
          { /each }
        </div>
      </div>
    </div>
  </div>
</div>