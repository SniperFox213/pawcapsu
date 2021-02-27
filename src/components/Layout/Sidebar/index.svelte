<script>
  // Importing modules
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import storage from "local-storage";

  // Importing configuration files
  import { pages } from "../../../config/layout";

  // Importing stores
  import { goto, stores } from "@sapper/app";
  const { page } = stores();

  // Importing components
  import Icon from "../../Icon.svelte";

  // Variables

  // @variable collapsed
  // - Is menu collapsed or no
  let collapsed = true;

  // @variable categories
  // - category information
  // - pages
  //   - each page informaiton
  let categories = [];

  function switchLayout() {
    if (collapsed) {
      // Saving this preferences to our
      // local-storage
      storage.set("settings.layout.collapsedSidebar", false);
      collapsed = false;
    } else {
      storage.set("settings.layout.collapsedSidebar", true);
      collapsed = true;
    };
  };

  // onMount event
  // - Here we'll update our categories
  // array and check for current layout settings 
  onMount(() => {
    // Checking for layout setting:
    // settings.layout.collapsedSidebar
    let collapsedSidebar = storage.get("settings.layout.collapsedSidebar");
    if (collapsedSidebar != null) collapsed = collapsedSidebar || false;

    // Updating categories array
    let newCategories = [];

    pages.forEach((page) => {
      if (newCategories.findIndex((x) => x.id == page.category) < 0) {
        newCategories.push({ id: page.category, title: page.category, list: [page] })
      } else {
        newCategories[newCategories.findIndex((x) => x.id == page.category)].list.push(page);
      };
    });

    categories = newCategories;
  });
</script>

<!-- Sidebar -->
<sidebar style="z-index: 1;" class="w-20 { $page.path.includes("reader") ? "hidden" : "hidden md:flex" } fixed h-full flex-col bg-dark">
  <!-- Logotype -->
  <div class="h-16 flex { collapsed ? "flex-col justify-center" : "justify-between pl-6 pr-3" } items-center w-full">
    <!-- Logotype -->
    <img class="w-8 h-8 mb-4 mt-9" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1610810215/logotypes/pawcapsu-white-small.svg" alt="pawcapsu logotype">
  
    <!-- Button -->
  </div>

  <!-- Links -->
  <div class="px-6 flex-grow w-full mt-8">
    <!-- Current Profile -->
    { #if $page.path.includes('profile') }
      <div class="mb-8">
        <!-- Avatar -->
        <div style="background: url('https://d3gz42uwgl1r1y.cloudfront.net/sh/shiuk/avatar/2015/11/8feaa64e36f4d20f6732e9fd8e2f3df6.jpg'); background-size: cover; background-position: center;" class="w-9 h-9 rounded-lg"></div>
      </div>
    { /if }

    { #each categories as category }
      <!-- Items -->
      <div in:fade class="relative">
        { #each category.list as link }
          <div on:click={() => goto(link.href)} class="cursor-pointer w-full my-6 flex items-center relative { $page.path.includes(link.id) ? "" : "opacity-70" }">
            <!-- Icon -->
            <div class="w-9 h-9 flex justify-center items-center rounded-lg { $page.path.includes(link.id) ? "bg-yellow-400" : "bg-light-dark" }">
              <Icon name="{ link.icon }" attrs={{ class: "w-4 h-4 text-white" }} />
            </div>
            
            { #if link.blocked }
              <div style="z-index: 2;" class="absolute inset-0 w-full h-full bg-black opacity-70 rounded-md"></div>
              <div style="z-index: 3;" class="absolute inset-0 w-full h-full opacity-80 flex justify-center items-center">
                <Icon name="lock" attrs={{ class: "w-4 h-4 text-white" }} />
              </div>
            { /if }
          </div>
        { /each }
      </div>

      <!-- Divider -->
      <div style="height: .1rem" class="w-full my-6 rounded-lg bg-light-dark"></div>
    { /each }
    
    <!-- More -->
    <div class="my-6 flex items-center opacity-70">
      <!-- Icon -->
      <div class="w-9 h-9 flex justify-center items-center rounded-lg bg-light-dark">
        <!-- Chevron Down Icon -->
        <svg class="w-4 h-4 text-lighter-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
      </div>
    </div>
  </div>
</sidebar>