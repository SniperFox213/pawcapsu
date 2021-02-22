<script>
  // Importing modules

  // Importing stores
  import profile from "../../../../stores/profile.js";

  // Importing components
  import Icon from "../../../Icon.svelte";

  import SessionsPopover from "../components/SessionsPopover.svelte";

  let profileHidden = true;
</script>

<!-- Header -->
<div class="w-full flex justify-between items-center h-16 px-6 md:px-8 relative">
  <!-- Pawcapsu Logotype (mobile) -->
  <div class="absolute inset-x-0 left-0 flex items-center px-6">
    <img class="w-7 h-7" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1610810215/logotypes/pawcapsu-white-small.svg" alt="pawcapsu logotype">
  </div>

  <!-- Actions -->
  <div style="z-index: 2;" class="w-full flex justify-center items-center">

    <!-- Reader Settings -->
    <button class="mx-1 p-2 relative">
      <Icon name="grid" attrs={{ class: "w-5 h-5 text-light-dark" }}/>

      <div class="w-3 h-3 bg-red-400 rounded-full absolute top-0 right-0"></div>
    </button>

    <!-- Chapters -->
    <button class="mx-1 p-2">
      <Icon name="layers" attrs={{ class: "w-5 h-5 text-light-dark" }}/>
    </button>
  </div>

  <!-- Account -->
  <div class="absolute inset-x-0 right-0 flex justify-end items-center px-6">
    <!-- Avatar -->
    { #if $profile.avatar == null }
      <div class="w-8 h-8 rounded-full border border-indigo-400 flex justify-center items-center">
        <Icon name="feather" attrs={{ class: "text-white w-4 h-4" }} />
      </div>
    { /if }

    <!-- Name -->
    { #if !profileHidden }
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

        <button on:click={(e) => {
          profileHidden = true;
        }} class="mx-1 p-2">
          <Icon name="chevron-right" attrs={{ class: "w-5 h-5 text-light-dark" }}/>
        </button>
      </div>
    { :else }
      <!-- Show profile information -->
      <button on:click={(e) => {
        profileHidden = false;
      }} class="mx-1 p-2">
        <!-- Grid Icon -->
        <Icon name="more-horizontal" attrs={{ class: "w-5 h-5 text-light-dark" }} />
      </button>
    { /if }
  </div>
</div>
