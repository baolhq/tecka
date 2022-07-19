<script>
	import Spinner from '$lib/components/Spinner.svelte';
	import { onMount } from 'svelte';

	let tagList = [];
	onMount(async () => {
		tagList = await fetchTagList();
	});

	// Fetch tag list from blog.json and return array of tags
	const fetchTagList = async () => {
		let response = await fetch('/blogs.json');
		let data = await response.json();
		let blogList = Object.values(data);
		let result = [];

		blogList.forEach((blog) => {
			blog.tags.forEach((tag) => {
				// Only add non-existing tag
				if (!result.includes(tag)) result = [...result, tag];
			});
		});
		return result;
	};

	// Randomize font size of this elem
	const onload = (elem) => {
		let rand = (Math.random() * -0.5 + 1.5).toFixed(2);
		elem.style.fontSize = `${rand}em`;
	};
</script>

<svelte:head>
	<title>Tags - Tecka</title>
</svelte:head>

<div class="container">
	{#each tagList as tag}
		<a use:onload href="/tags/{tag}">#{tag}</a>
	{/each}
</div>

<style>
	.container {
		width: 100%;
	}
	a {
		padding: 8px 12px;
		margin: 8px;
		border-radius: 10px;
		display: inline-block;
		text-decoration: none;
		color: var(--fg);
		transition: background 0.4s ease, color 0.4s ease;
	}
	a:hover {
		background: var(--fg);
		color: var(--bg);
	}
</style>
