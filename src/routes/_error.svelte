<script>
	export let status;
	export let error;

	const mode = process.env.NODE_ENV;
	const dev = mode === "development";
</script>

<section class="flex flex-1 flex-col items-center justify-center">
	<h1 class="text-red-700 text-2xl">{error.message}</h1>
	<h2 class="mt-1 text-red-700 text-lg">{status}</h2>
</section>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

<div class="border-2 border-4 border-white"></div>

<div class="bg-pink-500"></div>
<div class="bg-purple-400"></div>

<div class="hidden w-1/5"></div>
<div class="hidden w-2/5"></div>
<div class="hidden w-3/5"></div>
<div class="hidden w-4/5"></div>
<div class="hidden w-5/5"></div>

<div class="hidden w-1/3"></div>
<div class="hidden w-2/3"></div>
<div class="hidden w-3/3"></div>

<div class="hidden w-1/6"></div>
<div class="hidden w-2/6"></div>
<div class="hidden w-3/6"></div>
<div class="hidden w-4/6"></div>
<div class="hidden w-5/6"></div>
<div class="hidden w-6/6"></div>

<div class="hidden h-1/5"></div>
<div class="hidden h-2/5"></div>
<div class="hidden h-3/5"></div>
<div class="hidden h-4/5"></div>
<div class="hidden h-5/5"></div>

<div class="hidden h-1/3"></div>
<div class="hidden h-2/3"></div>
<div class="hidden h-3/3"></div>

<div class="hidden w-1/12"></div>
<div class="hidden w-2/12"></div>
<div class="hidden w-3/12"></div>
<div class="hidden w-4/12"></div>
<div class="hidden w-5/12"></div>
<div class="hidden w-6/12"></div>
<div class="hidden w-7/12"></div>
<div class="hidden w-8/12"></div>
<div class="hidden w-9/12"></div>
<div class="hidden w-10/12"></div>
<div class="hidden w-11/12"></div>
<div class="hidden w-12/12"></div>
