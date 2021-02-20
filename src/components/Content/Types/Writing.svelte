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
    <div on:click={() => openPost()} on:mouseenter={() => hover = true} on:mouseleave={() => hover = false} class="absolute cursor-pointer inset-0 w-full h-full bg-light-dark rounded-lg flex flex-col justify-center items-center">
      <!-- Author name + Text title -->
      <div class="px-4 text-center">
        <p class="text-gray-100 text-sm opacity-75">{ entry.author.nickname }</p>
        
        <h1 class="text-2xl text-white font-medium my-0.5">{ entry.source.title }</h1>
      
        <p class="text-gray-100 text-sm opacity-75">ビースターズ | BEASTARS</p>
      </div>

      <!-- Tags -->
      <div>

      </div>

      <!-- Dots -->
      <div class="absolute inset-x-0 bottom-0 w-full py-4 text-center opacity-60">
        <!-- Little help -->
        <p class="text-xs text-white">Нажмите, что бы узнать больше</p>

        <!-- Pages -->
        <div class="flex items-center justify-center mt-1">
          <div class="w-4 h-4 rounded-full bg-white mx-2"></div>
          <div class="w-3 h-3 rounded-full border-2 border-white mx-2"></div>
        </div>
      </div>
    </div>
  </div>
</div>