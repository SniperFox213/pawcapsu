<script>
  // Importing modules
  import { afterUpdate, createEventDispatcher } from "svelte";
  import moment from "moment";

  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";

  const dispatch = createEventDispatcher();

  // Importing components
  import Icon from "../../Icon.svelte";
  import Spinner from "../../Spinner.svelte";

  // Variables

  // @variable hover
  // - Hover state of this card
  let hover = false;

  // @variable profileIconHover
  let profileIconHover = false;

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

  // @export hideStats
  // - Hide or show statistics
  // text?
  export let hideStats = false;

  // @export hideContent
  // - Do we need to hide
  // content section (artwork name, statistics)
  export let hideContent = false;
</script>

<!-- ContentCard layout -->
<div in:fade class="w-full md:w-{ sizes.width } relative p-2">
  <div style="padding-top: 120%" class="w-full relative">
    <div on:click={() => openPost()} on:mouseenter={() => hover = true} on:mouseleave={() => hover = false} class="absolute cursor-pointer inset-0 w-full h-full bg-light-dark rounded-lg flex flex-col">
      <!-- Avatar + Badge -->
      <div on:mouseenter={() => profileIconHover = true} on:mouseleave={() => profileIconHover = false} style="z-index: 3;" class="absolute top-0 right-0 p-2 opacity-80">
        <div class="transition duration-200 ease-in-out bg-dark { profileIconHover ? "pl-3" : "" } rounded-full flex items-center">
          { #if profileIconHover }
            <!-- User Name -->
            <div on:click={() => openProfile()} in:fade class="mr-3 flex items-center text-white cursor-pointer">
              <h1 class="text-md font-medium border-b border-dotted border-white">{ entry.author.nickname }</h1>
              
              <!-- Icon -->
              <Icon name="link" attrs={{ class: "w-3 h-3 ml-1" }} />
            </div>
          { /if }
          
          <!-- Avatar -->
          <div style="background-image: url('{ entry.author.avatar }'); background-size: cover; background-position: center;" class="w-8 h-8 rounded-full"></div>
        </div>
      </div>

      <!-- Text Title -->
      <div style="z-index: 2;" class="p-3">
        <!-- Image Name -->
        <h2 class="text-xl text-white font-bold my-2">{ entry.source.title }</h2>

        <!-- Statistics -->
        <div class="flex items-center opacity-50">
          <!-- Post Views -->
          <p class="text-white text-xs">{ entry.source.views } просмотров</p>

          <!-- Dot -->
          <div class="w-1 h-1 mx-2 bg-white rounded-full"></div>
          
          <!-- Post Time -->
          <p class="text-white text-xs">{ moment(entry.source.published).fromNow() }</p>
        </div>
      </div>

      <!-- Description -->
      <div style="overflow: hidden; overflow-y: auto;" class="w-full flex-grow h-auto px-3 relative">
        <p class="text-white text-sm opacity-80">{ @html entry.source.description.replace("\n", "<br />") }</p>
      </div>

      <!-- Stats -->
      <div class="absolute inset-x-0 bottom-0 w-full flex justify-around items-center px-4 py-4">
        <p class="text-white text-xs">{ entry.meta.chapters } { entry.meta.chapters == 1 ? "глава" : entry.meta.chapters > 4 ? "глав" : "главы" }</p>
        <p class="text-white text-xs">{ entry.meta.words } слов</p>
      </div>
    </div>
  </div>
</div>