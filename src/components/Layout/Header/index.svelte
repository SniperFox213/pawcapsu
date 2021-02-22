<script>
  // Importing modules
  import { stores } from "@sapper/app";
  const { page } = stores();

  // Importing different header types
  import OrdinaryHeader from "./types/OrdinaryHeader.svelte";
  import ReaderHeader from "./types/ReaderHeader.svelte";
</script>

{ #if $page.path.includes("reader") }
  <ReaderHeader />
{ :else }
  <OrdinaryHeader />
{ /if }