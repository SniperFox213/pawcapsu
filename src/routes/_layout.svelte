<script>
	// Let's now import our styles component
	import styles from "../components/styles.svelte";
</script>

<!-- Importing some fonts -->
<style>
	@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
</style>

<svelte:head>
	<title>paw universes</title>

	<!-- Favicons and other things -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="theme-color" content="#ffffff">
</svelte:head>

<main style="font-family: 'Raleway', sans-serif;">
	<slot></slot>
</main>