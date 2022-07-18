<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { blogList } from '../../store.js';

	let blogs = [];
	let tag = $page.params.slug;

	onMount(async () => {
		// If blog list is empty fetch from db
		if ($blogList.length === 0) await fetchData();

		blogs = filterByTag(tag, $blogList);
	});

	const fetchData = async () => {
		let response = await fetch('/blogs.json');
		let data = await response.json();
		blogList.set(Object.values(data));

		let keyList = Object.keys(data);
		for (let i = 0; i < keyList.length; i++) {
			Object.assign($blogList[i], { slug: keyList[i] });
		}
	};

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

{#each blogs as blog}
	<a href="/blog/{blog.slug}" in:fade={{ duration: 400 }}><span># {blog.title}</span></a>
	<br />
{/each}

<style>
	a {
		text-decoration: none;
		font-size: 1.2em;
		color: var(--fg);
		transition: color 0.4s ease;
		display: block;
		margin-bottom: 0.75rem;
		padding: 14px;
		padding-left: 6px;
		border-radius: 12px;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		background: var(--card-bg);
	}

	a:hover {
		color: var(--link);
	}
	span {
		border: 4px solid transparent;
		display: block;
		padding-left: 14px;
		width: 100%;
		height: 100%;
		transition: border 0.4s ease;
	}
	span:hover {
		border-left: 4px solid var(--link);
	}
</style>
