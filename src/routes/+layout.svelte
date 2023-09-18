<script lang="ts">
	import '../app.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import Header from '$lib/components/header.svelte';
</script>

<svelte:head>
	<title>RT-VN</title>
</svelte:head>
<body class="p-6 flex flex-col gap-8 h-full">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
</body>
