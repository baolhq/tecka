<script>
	import { fade } from 'svelte/transition';
	import { blogList } from '../store.js';
</script>

<svelte:head>
	<title>Tecka</title>
</svelte:head>

{#each $blogList as blog}
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
