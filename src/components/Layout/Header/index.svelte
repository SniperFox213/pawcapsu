<script>
  // Importing modules

  // Importing stores
  import profile from "../../../stores/profile.js";

  // Importing components
  import Icon from "../../Icon.svelte";

  // Popovers
  import SessionsPopover from "./components/SessionsPopover.svelte";
</script>

<!-- Header -->
<div class="w-full flex justify-between items-center h-16 px-6 md:px-8">
  <!-- Pawcapsu Logotype (mobile) -->
  <div class="w-1/6 md:hidden flex items-center">
    <img class="w-7 h-7" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1610810215/logotypes/pawcapsu-white-small.svg" alt="pawcapsu logotype">
  </div>

  <!-- Search -->
  <div class="w-min md:w-2/3 rounded-md py-2 px-4 bg-light-dark flex items-center justify-between">
    <input class="w-min bg-light-dark text-white" placeholder="Search" type="text">

    <!-- Icon -->
    <svg class="hidden md:block w-4 h-4 text-light-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  </div>

  <!-- Account -->
  <div class="w-1/6 md:w-1/3 flex justify-end items-center">
    <!-- Avatar -->
    { #if $profile.avatar == null }
      <div class="w-8 h-8 rounded-full border border-indigo-400 flex justify-center items-center">
        <Icon name="feather" attrs={{ class: "text-white w-4 h-4" }} />
      </div>
    { /if }

    <!-- Name -->
    <div class="hidden md:block ml-2">
      <h2 class="text-md text-white font-medium">{ $profile.displayName }</h2>
      <p class="text-xs text-gray-100 opacity-60">@{ $profile.nickname }</p>
    </div>

    <!-- Buttons -->
    <div class="ml-6 hidden md:flex items-center">
      <!-- Current Session button -->
      <SessionsPopover />

      <!-- Notifications -->
      <button class="mx-1 p-2 relative">
        <!-- Bell Icon -->
        <svg class="w-5 h-5 text-light-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        
        <!-- Notification badge -->
        <div class="absolute top-0 right-0 mt-1 mr-1 w-3 h-3 bg-red-500 rounded-full"></div>
      </button>

      <!-- Other Services -->
      <button class="mx-1 p-2">
        <!-- Grid Icon -->
        <svg class="w-5 h-5 text-light-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
      </button>
    </div>
  </div>
</div>
