<script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let blogList = [];

	// Fetch data to array
	onMount(async () => {
		let response = await fetch('/blogs.json');
		let data = await response.json();
		blogList = Object.values(data);

		let keyList = Object.keys(data);
		for (let i = 0; i < keyList.length; i++) {
			Object.assign(blogList[i], { slug: keyList[i] });
		}
	});
</script>

<svelte:head>
	<title>Home - Tecka</title>
</svelte:head>

{#each blogList as blog}
	<a href="/blog/{blog.slug}" in:fade={{ duration: 400 }}># {blog.title}</a>
	<br />
{/each}

<style>
	a {
		text-decoration: none;
		font-size: 1.4em;
		color: var(--fg);
		transition: color 0.4s ease;
		display: inline-block;
		margin-bottom: 0.75rem;
	}

	a:hover {
		color: var(--link);
	}
</style>
