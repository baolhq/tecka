<script>
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let slug = $page.params.slug;
	let title = '';
	let content = '';

	onMount(async () => {
		// Fetch blog list to get metadata
		let jsonRes = await fetch(`/blogs.json`);
		let jsonData = await jsonRes.json();

		title = jsonData[slug].title;

		// Fetch content base on slug and blog list
		let mdRes = await fetch(`/blogs/${slug}.md`);
		let mdData = await mdRes.text();
		content = marked.parse(mdData);
	});
</script>

<svelte:head>
	<title>{title} - Tecka</title>
</svelte:head>

<h1 id="title">{title}</h1>
<div class="container">
	{@html content}
</div>

<style>
	#title {
		font-family: 'Lora', serif;
		font-size: 2.5em;
	}
	.container {
		margin-top: 2.5rem;
	}

	:global(img) {
		max-width: 100%;
		height: auto;
	}
	:global(a) {
		text-decoration: none;
		transition: color 0.4s ease;
		color: var(--link);
	}
	:global(hr) {
		background: var(--surface);
		border: none;
		height: 2px;
	}
	:global(pre) {
		background: var(--surface);
		padding: 10px 16px;
		border-radius: 8px;
		overflow-x: scroll;
	}
	:global(code) {
		background: var(--surface);
		padding: 0 4px;
		border-radius: 4px;
		font-family: 'Poppins', monospace;
	}
	:global(table, tr, td, th) {
		border: 1px solid var(--surface);
		border-collapse: collapse;
	}
	:global(td, th) {
		padding: 4px 12px;
	}
	:global(th) {
		text-align: center;
	}
	:global(input, button) {
		background: transparent;
		font-size: 1em;
		border: 1px solid var(--surface);
		color: var(--fg);
		padding: 8px;
	}
	:global(button:hover, input[type='submit']) {
		cursor: pointer;
	}
</style>
