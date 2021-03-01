<script>
  // Importing modules
  import { goto } from "@sapper/app";
  import { afterUpdate } from "svelte";
  import axios from "axios";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Importing components
  import Spinner from "../Spinner.svelte";
  import Icon from "../Icon.svelte";

  afterUpdate(() => {
    // Updating results
    let search = searchQuery;

    if (search != null && lastQuery != search) {
      loading = true;

      axios.get(`https://v1.api.paw.unfull.ml/api/search/${search}`)
      .then((response) => {
        if (search == searchQuery) {
          results   = response.data;
          lastQuery = search;

          loading = false;
        };
      });
    };
  });

  let searchQuery = "Repressed";
  let lastQuery;
  let results = [];
  let loading = false;
</script>

<!-- background -->
<div style="z-index: 1001;" class="fixed inset-0 w-full h-full bg-dark opacity-70"></div>

<!-- Layout -->
<main style="z-index: 1002;" class="fixed inset-0 w-full h-full flex justify-center items-center">
  <div class="w-full h-screen md:w-4/5 md:h-4/5 flex flex-col p-6 bg-dark rounded-md shadow-md border-2 border-indigo-400">
    <!-- Mini-header -->
    <div class="w-full mb-2 flex justify-between items-center">
      <p class="text-white text-sm">Поиск</p>
      
      <button on:click={(e) => {
        dispatch("close");
      }} class="w-8 h-8 flex justify-center items-center">
        <Icon name="x" attrs={{ class: "w-5 h-5 text-white" }} />
      </button>
    </div>
    
    <!-- Search bar -->
    <div class="w-full flex justify-between items-center pb-6">
      <div class="relative w-4/5 h-8 rounded-md bg-light-dark relative px-2 flex justify-between items-center">
        <input bind:value={searchQuery} type="text" placeholder="Поиск" class="text-white h-8 w-2/3 bg-light-dark">
      </div>

      { #if loading }
        <div class="ml-3 w-8 h-8 bg-light-dark flex justify-center items-center rounded-md">
          <Spinner size="20" />
        </div>
      { :else }
        { #if results.length > 0 }
          <div class="h-8 rounded-md opacity-80 flex justify-center items-center bg-light-dark ml-3 px-3">
            <p class="text-white text-sm font-medium">Результатов: { results.length }</p>
          </div>
        { /if }
      { /if }
    </div>

    <!-- Results -->
    <div class="overflow-hidden overflow-y-auto flex-grow">

      { #each results as entry }
        { #if entry != null && entry.source != null && entry.meta != null && entry.author != null }
          <div on:click={(e) => {
            dispatch("close");
            goto(`/reader/${entry._id}`);
          }} class="cursor-pointer w-full my-3 rounded-md bg-light-dark p-4">
            <!-- Mini-header -->
            <div class="w-full flex justify-between items-center">
              <!-- Author -->
              <div class="h-8 px-2 bg-indigo-400 rounded-md flex items-center justify-center">
                <div class="w-6 h-6 rounded-full bg-indigo-500"></div>

                <p class="ml-2 text-white text-sm">{ entry.author.nickname }</p>
              </div>

              <div class="rounded-md text-sm bg-lighter-dark px-2 h-8 flex items-center">
                90% схожести
              </div>

            </div>

            <!-- Title -->
            <div class="w-full my-2">
              <h1 class="text-2xl text-white opacity-80">{ entry.source.title }</h1>
            </div>

            <!-- Description -->
            <div class="w-full">
              <p class="text-white text-sm">{@html entry.source.description }</p>
            </div>
            
            <!-- Tags -->
            <div class="w-full mt-2 flex flex-wrap text-white">
              { #each entry.meta.tags as tag }
                { #if tag.type == "warning" }
                  <div class="mx-1 my-0.5 px-2 py-0.5 rounded-full bg-red-400 text-xs">
                    { tag.text }
                  </div>
                { :else if tag.type == "relationship" }
                  <div class="mx-1 my-0.5 px-2 py-0.5 rounded-full bg-pink-400 text-xs">
                    { tag.text }
                  </div>
                { :else if tag.type == "character" }
                  <div class="mx-1 my-0.5 px-2 py-0.5 rounded-full bg-indigo-400 text-xs">
                    { tag.text }
                  </div>
                { :else }
                  <div class="bg-dark mx-1 my-0.5 px-2 py-0.5 rounded-full text-xs">
                    { tag.text }
                  </div>
                { /if }
              { /each }
            </div>
          </div>
        { /if }
      { /each }

    </div>
  </div>
</main>