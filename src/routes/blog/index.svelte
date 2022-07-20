<script>
	import BlogCard from '$lib/components/BlogCard.svelte';
	import { blogList } from '../../store.js';
</script>

<svelte:head>
	<title>Tecka</title>
</svelte:head>

{#each $blogList as blog}
	<BlogCard slug={blog.slug} title={blog.title} />
{/each}
