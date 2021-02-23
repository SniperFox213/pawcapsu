<script>
  // Importing modules
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";

  // Importing stores
  import cache from "../../../stores/cache.js";

  onMount(() => {
    // Let's now subscribe to our
    // cache store
    cache.subscribe((obj) => {
      if (obj["reader/current"] != null) {
        let reader = obj["reader/current"];

        if (reader.type == "text") {
          data        = reader.data;
          data.loaded = true;
        } else {
          // Error
        };
      };
    });

    goto(`/reader/${ data._id }/${ data.meta.firstChapter == null ? "content" : data.meta.firstChapter }`);
  });

  let data = {};
</script>