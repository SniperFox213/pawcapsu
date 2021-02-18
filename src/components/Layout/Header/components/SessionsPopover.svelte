<script>
  // Importing modules
  import { onMount } from "svelte";
  import UAParser from "ua-parser-js";

  // Importing stores

  // Importing components
  import Popover from "svelte-popover";
  import Icon from "../../../Icon.svelte";

  let currentAgent = {};
  onMount(() => {
    currentAgent = new UAParser(window.navigator.userAgent);
  });
</script>

<!-- Main Layout -->
<Popover arrow={false} placement="bottom-end">
  <div slot="target">
    <button class="rounded-md mx-1 p-2 relative">
      <Icon name="airplay" attrs={{ class: "w-5 h-5 text-light-dark" }} />

      <!-- Notification badge -->
      <div class="absolute top-0 right-0 mt-1 mr-1">
        <div class="flex justify-center items-center w-3 h-3 bg-indigo-500 rounded-full">
          <p style="font-size: 0.55rem;" class="text-white">2</p>
        </div>
      </div>
    </button>
  </div>

  <div slot="content" style="height: 60vh; width: 25vw;" class="flex flex-col bg-light-dark rounded-md p-4 mt-4 relative">
    <!-- Texts -->
    <div>
      <h1 class="text-xl text-white font-medium">Сессии</h1>
      <p class="text-xs text-gray-100 opacity-60">У вас всегда есть возможность вернуться к тому, что вы делали!</p>
    </div>

    <!-- Sessions list -->
    <div style="overflow: hidden; overflow-y: auto;" class="my-2 w-full flex-grow relative">

      <div class="absolute inset-0 w-full h-full">
        <!-- Current Session -->
        <div class="w-full border border-indigo-400 h-12 relative mb-2 rounded-md flex items-center bg-dark px-3">    
          <!-- Icon (if needed) -->
          <!-- <div class="mr-2">
            <Icon name="" attrs={{ class: "w-5 h-5 text-white" }} />
          </div> -->
          
          <!-- Texts -->
          <div class="">
            <h1 class="text-sm text-white">Текущая</h1>
            <p class="text-xs text-gray-100 opacity-60">{ currentAgent.getBrowser().name } на { currentAgent.getOS().name }</p>
          </div>

          <!-- Actions -->
          <div class="absolute inset-y-0 right-0 h-full flex justify-center items-center opacity-50">
            <!-- Share Button -->
            <button class="w-8 h-8">
              <Icon name="share-2" attrs={{ class: "w-4 h-4 text-white" }} />
            </button>
            
            <!-- Delete Button -->
            <button class="w-8 h-8">
              <Icon name="trash-2" attrs={{ class: "w-4 h-4 text-red-500" }} />
            </button>
          </div>
        </div>
      
        <!-- Divider -->
        <div style="height: 2px" class="opacity-50 w-full rounded-full bg-dark"></div>

        <!-- Other Sessions -->
        <div class="w-full h-12 relative my-2 rounded-md flex items-center bg-dark px-3">    
          <!-- Icon (if needed) -->
          <div class="mr-2">
            <Icon name="smartphone" attrs={{ class: "w-5 h-5 text-white" }} />
          </div>
          
          <!-- Texts -->
          <div class="">
            <h1 class="text-sm text-white">Телефон</h1>
            <p class="text-xs text-gray-100 opacity-60">минуту назад</p>
          </div>

          <!-- Actions -->
          <div class="absolute inset-y-0 right-0 h-full flex justify-center items-center opacity-50">
            <!-- Switch to this button -->
            <button class="w-8 h-8">
              <Icon name="download" attrs={{ class: "w-4 h-4 text-white" }} />
            </button>
            
            <!-- Delete Button -->
            <button class="w-8 h-8">
              <Icon name="trash-2" attrs={{ class: "w-4 h-4 text-red-500" }} />
            </button>
          </div>
        </div>

        <div class="w-full h-12 relative my-2 rounded-md flex items-center bg-dark px-3">    
          <!-- Icon (if needed) -->
          <div class="mr-2">
            <Icon name="monitor" attrs={{ class: "w-5 h-5 text-white" }} />
          </div>
          
          <!-- Texts -->
          <div class="">
            <h1 class="text-sm text-white">Компьютер</h1>
            <p class="text-xs text-gray-100 opacity-60">несколько часов назад</p>
          </div>

          <!-- Actions -->
          <div class="absolute inset-y-0 right-0 h-full flex justify-center items-center opacity-50">
            <!-- Switch to this button -->
            <button class="w-8 h-8">
              <Icon name="download" attrs={{ class: "w-4 h-4 text-white" }} />
            </button>
            
            <!-- Delete Button -->
            <button class="w-8 h-8">
              <Icon name="trash-2" attrs={{ class: "w-4 h-4 text-red-500" }} />
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- More info -->
    <div class="w-full rounded-md bg-indigo-400 px-4 py-2">
      <h1 class="text-sm text-white">Узнать больше</h1>
      <p class="text-xs text-white">про систему сессий</p>
    </div>
  </div>
</Popover>