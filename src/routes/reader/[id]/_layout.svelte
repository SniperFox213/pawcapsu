<script>
  // Importing modules
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import axios from "axios";

  // Importing stores
  import cache from "../../../stores/cache.js";
  import { stores } from "@sapper/app";
  const { page } = stores();

  // Importing components
  import { Spinner } from "../../../components";

  onMount(async () => {
    // Loding text information
    axios.get(`https://v1.api.paw.unfull.ml/api/post/${ $page.params.id }?extended=true`)
    .then((response ) => {
      let { data } = response;

      // Saving this text's data into cache
      // (so that it can be accessed by our container
      // component and so on)
      cache.setCache("reader/current", { type: "text", data: data, url: $page.path });

      loading = false;
    }).catch(() => {

    });
  });

  let loading = true;
</script>

{ #if loading }
  <!-- Loading screen -->
  <div out:fade style="z-index: 999;" class="absolute inset-0 w-full h-full flex justify-center items-center">
    <Spinner />
  </div>
{ :else }
  <!-- Content itself -->
  <slot></slot>
{ /if }