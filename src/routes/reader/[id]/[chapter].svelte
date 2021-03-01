<script>
  // Importing modules
  import { fade } from "svelte/transition";

  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import axios from "axios";

  // Importing stores
  import settings from "../../../stores/account/settings.js";
  import cache from "../../../stores/cache.js";
  
  import { stores } from "@sapper/app";
  const { page } = stores();
  
  // Importing components
  import { Icon } from "../../../components";

  function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  onMount(() => {
    // Let's now subscribe to our
    // cache store
    cache.subscribe((obj) => {
      if (obj["reader/current"] != null) {
        let reader = obj["reader/current"];

        if (reader.type == "text") {
          post        = reader.data;
          post.loaded = true;
        } else {
          // Error
        };
      };
    });

    page.subscribe(() => {
      fetchData();
    });

    window.addEventListener("scroll", () => scroll());
  });

  function scroll() {
    let element = document.scrollingElement;

    // Saving scroll position
    cache.setCache(`reader.${ post.id }.scroll`, element.scrollTop);

    // Determining current reader progress
    let progress = (100/(element.scrollHeight - (element.scrollHeight/4))) * element.scrollTop;
    if (progress > 100) progress = 100;
    if (progress < 0) progress = 0;

    settings.setSetting("reader.progress", progress);

    if (element.scrollTop >= element.scrollHeight/1.8) {
      console.log("READ");
    };
  };

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
        chapters        = data.chapters;
        nextChapter     = data.nextChapter;
        previousChapter = data.previousChapter;

        loaded = true;

        // Scrolling to reading position;
        setTimeout(() => {
          let element = document.scrollingElement;
          element.scrollTop = $cache[`reader.${ post.id }.scroll`];
        }, 250);
      };
    } else {
      fetchNewData();
    };
  };

  function fetchNewData() {
    loaded = false;

    // Getting text information
    axios.get(`https://v1.api.paw.unfull.ml/api/reader/${ post._id }${ $page.params.chapter != null ? `?chapter=${ $page.params.chapter }` : "" }`)
    .then((response) => {
      let { data } = response;

      let element = document.getElementById("content");
      element.scrollTop = 0;

      text            = data.text;
      chapter         = data.title;
      chapters        = data.chapters;

      nextChapter     = data.nextChapter != null ? data.nextChapter.id : null;
      previousChapter = data.previousChapter != null ? data.previousChapter.id : null;

      // Saving this information into
      // our cache storage
      cache.setCache("reader/currentText", { chapter: { id: $page.params.chapter, title: chapter }, text: text, chapters: data.chapters, nextChapter: nextChapter, previousChapter: previousChapter });
    
      setTimeout(() => {
        loaded = true;
      }, 150);
    });
  };

  // Post information
  let text;
  let loaded = false;
  let chapter = "Загрузка...";
  let nextChapter;
  let previousChapter;

  let chapters = [];

  let post = {
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

<div style="color: { $settings["reader.theme.text.color"] }; font-family: 'Open Sans', sans-serif; background: { $settings["reader.theme.container.background"] }" class="transition duration-300 ease-in-out w-full relative">
  <!-- Chapter information -->
  <div class="py-16 text-center">
    <!-- Chapter title -->
    { #if loaded }
      <h1 in:fade class="text-md font-medium opacity-70">{ post.source.title }</h1>

      <p in:fade class="text-4xl">{ chapter }</p>
    { :else }
      <div in:fade class="flex flex-col items-center justify-center">
        <div class="w-1/3 flex relative">
          <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="w-{ randomInteger(1, 4) }/12 mx-2 rounded-full h-4 my-2"></div>
          <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="w-full mx-2 rounded-full h-4 my-2"></div>
        </div>

        <div class="w-full flex relative px-6">
          <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="w-{ randomInteger(1, 4) }/12 mx-2 rounded-full h-8 my-2"></div>
          <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="w-full mx-2 rounded-full h-8 my-2"></div>
        </div>
      </div>
    { /if }
  </div>

  <div class="px-4 md:px-12 h-full relative">
    <!-- Text itself -->
    { #if text != null && loaded }
      <p in:fade style="font-size: { $settings["reader.theme.text.size"] }px;" class="opacity-80">{ @html text }</p>

      <!-- End notes -->
      <div class="w-full pt-8">
        
        <div class="w-full flex justify-center items-stretch">
          <div style="z-index: 1; background: { $settings["reader.theme.menu.plateBackground"] }" class="w-full md:w-1/3 flex flex-col items-center justify-center px-4 py-6 rounded-md relative">
            <!-- Header -->
            <div class="absolute inset-x-0 top-0 w-full flex justify-between p-4">
              <p class="text-sm opacity-80">Конец</p>

              <button>
                <Icon name="x" attrs={{ class: "w-5 h-5" }} />
              </button>
            </div>
            
            <!-- Text -->
            <div class="mt-6 text-center">
              <h1 class="text-2xl">Главы</h1>
              <p class="text-sm opacity-80">Этот рассказ ещё не закончился! Продолжайте читать его и наслаждаться потрясающим сюжетом! Не забудьте заглянутьв <span style="border-color: { $settings["reader.theme.text.color"] }" class="border-b border-dotted">Плейс</span> этого рассказа.</p>
            </div>

            <!-- Chapters list -->
            <div class="w-full mt-6">
              { #if chapters != null && chapters.length > 0 }
              
                { #each chapters.filter((x) => {
                  let index = chapters.indexOf(x);
                  let ids   = [chapters[index - 1], chapters[index + 1]];

                  if (ids.find((x) => x != null ? x.id == $page.params.chapter || x.id == nextChapter || x.id == previousChapter : false)) return true;
                }) as chapter }
                  <div style="background: { $page.params.chapter != chapter.id ? $settings["reader.theme.menu.background"] : "" };" on:click={(e) => goto(`/reader/${ $page.params.id }/${ chapter.id }`)} class="{ $page.params.chapter == chapter.id ? "bg-indigo-400 text-white" : "" } w-full my-4 rounded-md p-3 flex items-center text-sm relative">
                    { chapter.title }
      
                    <!-- Status -->
                    { #if $page.params.chapter == chapter.id || nextChapter == chapter.id }
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <p class="text-xs opacity-80">{ $page.params.chapter == chapter.id ? "Текущая" : "Следующая" }</p>
                      </div>
                    { /if }
                  </div>
                { /each }

              { /if }
            </div>

            <!-- Buttons -->
            <div class="my-6 mb-12 w-full flex justify-center items-center">
              <!-- Previous chapter -->
              { #if previousChapter != null }
                <button style="background: { $settings["reader.theme.menu.background"] };" on:click={(e) => goto(`/reader/${ $page.params.id }/${ previousChapter }`)} class="w-full rounded-md flex justify-center items-center py-3 my-3">
                  <Icon name="chevron-left" attrs={{ class: "w-5 h-5" }} />

                  <p class="text-sm ml-2">Предыдущая <span class="hidden md:inline-block">глава</span></p>
                </button>
              { /if }

              <!-- Next Chapter -->
              { #if nextChapter != null }
                <button style="background: { $settings["reader.theme.menu.background"] };" on:click={(e) => goto(`/reader/${ $page.params.id }/${ nextChapter }`)} class="{ previousChapter != null ? "ml-3" : "" } w-full rounded-md flex justify-center items-center py-3 my-3">
                  <p class="text-sm mr-2">Следующая <span class="hidden md:inline-block">глава</span></p>

                  <Icon name="chevron-right" attrs={{ class: "w-5 h-5" }} />
                </button>
              { /if }
            </div>

            <!-- Dots -->
            <div class="absolute inset-x-0 bottom-0 w-full flex md:hidden items-center opacity-60 justify-center py-4">
              <div style="background: { $settings["reader.theme.text.color"] }" class="w-4 h-4 rounded-full mx-2"></div>
              <div style="border-color: { $settings["reader.theme.text.color"] }" class="w-3 h-3 border-2 rounded-full mx-2"></div>
            </div>
          </div>

          <!-- Place ad -->
          <div style="z-index: 1; background: { $settings["reader.theme.menu.plateBackground"] }" class="hidden w-1/3 ml-4 md:flex flex-col items-center justify-center px-4 py-6 rounded-md relative">
            
          </div>
        </div>

        <div class="w-full mt-4 flex justify-end items-center">
          <div style="background-color: { $settings["reader.theme.menu.plateBackground"] }" class="opacity-80 rounded-md px-2 py-0.5 md:py-1 md:px-4 mr-2">
            <p class="text-xs md:hidden">Нажми на второй кружочек, дружочек<br />У меня есть что тебе показать...</p>
            <p class="text-base hidden md:block">Посмотри на <span class="border-b border-dotted border-gray-900">Плейсы!</span><br /> Это отличная вещь для невероятно крутого общения!</p>
          </div>

          <img class="w-1/6 rounded-md" src="./stickers/0/32.png" alt="">
        </div>
      </div>
    { :else }
      <!-- Loading -->
      <div class="flex flex-wrap w-full relative">
        { #each new Array(20) as i }
          <div in:fade class="w-full flex relative">
            <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="w-{ randomInteger(1, 10) }/12 mx-2 rounded-full h-6 my-2"></div>
            <div style="background: { $settings["reader.theme.menu.plateBackground"] }" class="w-full mx-2 rounded-full h-6 my-2"></div>
          </div>
        { /each }
      </div>
    { /if }
  </div>
</div>