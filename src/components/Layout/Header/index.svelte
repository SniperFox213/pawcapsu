<script>
  // Importing components
  import PawDropdown from "./components/PawDropdown.svelte";
  import UserDropdown from "./components/UserDropdown.svelte";
</script>

<!-- Header -->
<header style="z-index: 1;" class="bg-black fixed w-full px-4 py-2 md:px-12 flex justify-between items-center">
  <!-- Logotype -->
  <PawDropdown />

  <!-- Page-related content -->
  <div class="w-full flex items-center md:px-8">
    <!-- Search-bar -->
    <div class="rounded-full hidden md:flex items-center bg-white px-4 py-1 w-1/2">
      <!-- Search Icon -->
      <svg style="width: 1rem; height: 1rem;" class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>

      <input class="w-full text-black" type="text" placeholder="Поиск...">
    </div>
  </div>

  <!-- User-related -->
  <UserDropdown />
</header>