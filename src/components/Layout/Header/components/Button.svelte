<script>
  // Importing modules
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Importing components
  import Spinner from "../../../Spinner.svelte";

  // Variables
  let hovered = false
  let loading = false;

  // Exporting some variables
  export let color = "#fff";
  export let colorHovered = "#000";

  export let background = "background: black";
  export let hoveredBackground = "background: white;"
</script>

<div class="w-32 h-32 px-3 py-3 relative">
  <div 
    on:click={(e) => {
      loading = true;

      dispatch("click", e);
    }}
    on:mouseover={(e) => hovered = true} 
    on:mouseout={(e) => hovered = false} 
    style="{ hovered ? hoveredBackground : background }; { hovered ? `color: ${colorHovered};` : `color: ${color}` }" class="group { hovered ? "shadow-xl" : "" } transition duration-200 ease-in-out w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-md">
    
    { #if loading }
      <Spinner color="currentColor" size="20" />
    { :else }
      <slot></slot>
    { /if }
  </div>
</div>