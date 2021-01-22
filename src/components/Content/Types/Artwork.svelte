<script>
  // Importing modules
  import { afterUpdate } from "svelte";
  import moment from "moment";

  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";

  // Importing components
  import { Icon } from "../../";

  // Variables

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

  // After Update
  // - Updating card sizes
  afterUpdate(() => {
    // Updating sizes
    switch (size) {
      case "sm":
        sizes = {
          width: "1/4",

          imageHeight: "2/3",
          textHeight: "1/3",
          
          titleSize: "md",
          textSize: "xs"
        };
        break;
    
      case "md":
        sizes = {
          width: "1/3",

          imageHeight: "4/5",
          textHeight: "1/5",

          titleSize: "md",
          textSize: "xs"
        };
        break;
    
      case "xl":
        sizes = {
          width: "1/2",

          imageHeight: "5/6",
          textHeight: "1/6",

          titleSize: "xl",
          textSize: "sm"
        };
        break;
    }
  });

  // Exporting variables

  // @export entry
  // - Post information
  export let entry = {};

  // @export cardSize
  // - Card size. Default: 1/4
  // values: 1/4, 1/3, 1/2
  export let size = "1/4";
</script>

<!-- ContentCard layout -->
<div in:fade class="w-{ sizes.width } relative p-2">
  <div style="padding-top: 120%" class="w-full relative">
    <div class="absolute inset-0 w-full h-full bg-light-dark rounded-lg flex flex-col">
      { #if entry.source.nsfw }
        <!-- Image itself -->
        <div style="z-index: 0; overflow: hidden;" class="rounded-t-md h-{ sizes.imageHeight } w-full relative">
          <!-- Image -->
          <div style="z-index: 1; filter: blur(5px); background: url('{ entry.source.image }'); background-position: center; background-size: cover;" class="absolute inset-0"></div>

          <div style="z-index: 2;" class="absolute inset-0 w-full h-full bg-dark opacity-95 rounded-t-md flex justify-center items-center">
            <!-- Badge -->
            <div class="px-3 py-1 bg-light-dark rounded-full text-white text-sm">
              NSFW
            </div>
          </div>
        </div>
      { :else }
        <!-- Image itself -->
        <div style="background: url('{ entry.source.image }'); background-position: center; background-size: cover;" class="rounded-t-md h-{ sizes.imageHeight } w-full relative">
          <div class="absolute inset-0 w-full h-full bg-dark opacity-30 rounded-t-md"></div>
        </div>
      { /if }

      <!-- Avatar + Badge -->
      <div on:mouseenter={() => profileIconHover = true} on:mouseleave={() => profileIconHover = false} class="absolute top-0 right-0 p-2 opacity-80">
        <div class="transition duration-200 ease-in-out bg-dark { profileIconHover ? "pl-3" : "" } rounded-full flex items-center">
          { #if profileIconHover }
            <!-- User Name -->
            <div on:click={() => openProfile()} in:fade class="mr-3 flex items-center text-white cursor-pointer">
              <h1 class="text-md font-medium border-b border-dotted border-white">{ entry.author.displayName }</h1>
              
              <!-- Icon -->
              <Icon name="link" attrs={{ class: "w-3 h-3 ml-1" }} />
            </div>
          { /if }
          
          <!-- Avatar -->
          <div style="background: url('{ entry.author.avatar }'); background-size: cover; background-position: center;" class="w-8 h-8 rounded-full"></div>
        </div>
      </div>

      <!-- Text -->
      <div class="h-{ sizes.textHeight } w-full p-2">
        <!-- Image Name -->
        <h2 class="text-{ sizes.titleSize } text-white font-bold my-2">{ entry.source.title }</h2>

        <!-- Statistics -->
        <div class="flex items-center opacity-50 text-{ sizes.textSize }">
          <!-- Post Views -->
          <p class="text-white">{ entry.source.views } просмотров</p>

          <!-- Dot -->
          <div class="w-1 h-1 mx-2 bg-white rounded-full"></div>
          
          <!-- Post Time -->
          <p class="text-white">{ moment(entry.source.published).fromNow() }</p>
        </div>
      </div>
    </div>
  </div>
</div>