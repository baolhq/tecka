<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	let blogList = [];
	let tag = $page.params.slug;

	// Fetch data to array
	onMount(async () => {
		let response = await fetch('/blogs.json');
		let data = await response.json();
		blogList = Object.values(data);

		let keyList = Object.keys(data);
		for (let i = 0; i < keyList.length; i++) {
			Object.assign(blogList[i], { slug: keyList[i] });
		}

		blogList = filterByTag(tag, blogList);
	});

	// Filter blogs by tag
	const filterByTag = (tagFilter, blogs) => {
		if (!tagFilter) return blogs;

		let result = [];

		blogs.forEach((blog) => {
			let isContainsTag = false;

			blog.tags.forEach((tag) => {
				if (tag === tagFilter) {
					isContainsTag = true;
				}
			});

			if (isContainsTag) {
				result.push(blog);
			}
		});
		return result;
	};
</script>

<svelte:head>
	<title>Tagged with "{tag}" - Tecka</title>
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
