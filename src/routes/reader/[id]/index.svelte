<script>
  // Importing modules
  import { onMount } from "svelte";
  import axios from "axios";

  // Importing stores
  import cache from "../../../stores/cache.js";

  // Importing components
  import { Icon, Spinner } from "../../../components";

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

    // Getting text information
    axios.get(`https://v1.api.paw.unfull.ml/api/reader/${ data._id }${ data.meta.firstChapter != null ? `?chapter=${ data.meta.firstChapter }` : "" }`)
    .then((response) => {
      let { data } = response;
      
      text    = data.text;
      chapter = data.title;
    });
  })

  // Post information
  let text;
  let chapter = "Загрузка...";
  let data = {};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

  p {
    line-height: 1.5;
  }
</style>

{ #if data.loaded }
  <div style="font-family: 'Open Sans', sans-serif;" class="w-full relative bg-gray-100">
    <!-- Chapter information -->
    <div class="py-16 text-center">
      <h1 class="text-md font-medium opacity-70">{ data.source.title }</h1>

      <!-- Chapter title -->
      <p class="text-4xl">{ chapter }</p>
    </div>

    <div class="px-4 md:px-12 pb-8 opacity-80 h-full relative">
      <!-- Text itself -->
      { #if text != null }
        <p>{ @html text }</p>
      { :else }
        <div class="w-full h-screen flex flex-col justify-center items-center">
          <div class="w-24 h-24 bg-dark rounded-md flex justify-center items-center">
            <Spinner />
          </div>
        </div>
      { /if }
    </div>
  </div>
{ /if }