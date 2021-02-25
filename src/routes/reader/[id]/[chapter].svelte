<script>
  // Importing modules
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import axios from "axios";

  // Importing stores
  import settings from "../../../stores/account/settings.js";
  import cache from "../../../stores/cache.js";
  
  import { stores } from "@sapper/app";
  const { page } = stores();
  
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

    page.subscribe((obj) => {
      fetchData();
    });

    let element = document.getElementById("content");

    element.addEventListener("scroll", () => {
      // Saving scroll position
      cache.setCache(`reader/currentScroll`, element.scrollTop);

      // if (element.scrollTop + element.clientHeight >= element.scrollHeight - 200) {
      //   fetchData();
      // };
    });
  });

  function fetchData() {
    let chapterId = $page.params.chapter;

    // Getting this text's information from cache storage
    // (if exists)
    if ($cache["reader/currentText"] != null) {
      // Getting all needed information;
      let data = $cache["reader/currentText"];

      if (data.chapter.id != chapterId) {
        fetchNewData();
      } else {
        text            = data.text;
        chapter         = data.chapter.title;
        nextChapter     = data.nextChapter;
        previousChapter = data.previousChapter;

        // Scrolling to reading position;
        setTimeout(() => {
          let element = document.getElementById("content");
          element.scrollTop = $cache[`reader/currentScroll`];
        }, 250);
      };
    } else {
      fetchNewData();
    };
  };

  function fetchNewData() {
    // Getting text information
    axios.get(`https://v1.api.paw.unfull.ml/api/reader/${ data._id }${ $page.params.chapter != null ? `?chapter=${ $page.params.chapter }` : "" }`)
    .then((response) => {
      let { data } = response;

      let element = document.getElementById("content");
      element.scrollTop = 0;

      text            = data.text;
      chapter         = data.title;

      nextChapter     = data.nextChapter != null ? data.nextChapter.id : null;
      previousChapter = data.previousChapter != null ? data.previousChapter.id : null;

      // Saving this information into
      // our cache storage
      cache.setCache("reader/currentText", { chapter: { id: $page.params.chapter, title: chapter }, text: text, chapters: data.chapters, nextChapter: nextChapter, previousChapter: previousChapter });
    });
  };

  // Post information
  let text;
  let chapter = "Загрузка...";
  let nextChapter;
  let previousChapter;

  let data = {
    source: {},
    author: {}
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

  p {
    line-height: 1.5;
  }
</style>

<div style="color: { $settings["reader.theme.text.color"] }; font-family: 'Open Sans', sans-serif; background: { $settings["reader.theme.container.background"] || "#F3F4F6" }" class="transition duration-300 ease-in-out w-full relative">
  <!-- Chapter information -->
  <div class="py-16 text-center">
    <h1 class="text-md font-medium opacity-70">{ data.source.title }</h1>

    <!-- Chapter title -->
    <p class="text-4xl">{ chapter }</p>
  </div>

  <div class="px-4 md:px-12 opacity-80 h-full relative">
    <!-- Text itself -->
    { #if text != null }
      <p>{ @html text }</p>

      <!-- Next chapter (or end notes) -->
      <div class="w-full py-8 flex items-center">
        <!--  -->
        { #if previousChapter != null}
          <button on:click={(e) => {
            goto(`/reader/${ data._id }/${ previousChapter }`);
          }} class="px-4 py-2 w-full rounded-md bg-dark text-white">
            Предыдущая глава
          </button>
        { /if }

        { #if nextChapter != null }
          <button on:click={(e) => {
            goto(`/reader/${ data._id }/${ nextChapter }`);
          }} class="ml-4 px-4 py-2 w-full rounded-md bg-dark text-white">
            Следующая глава
          </button>
        { /if }
      </div>
    { :else }
      <div class="w-full h-screen flex flex-col justify-center items-center">
        <div class="w-24 h-24 bg-white rounded-md flex justify-center items-center">
          <Spinner />
        </div>
      </div>
    { /if }
  </div>
</div>