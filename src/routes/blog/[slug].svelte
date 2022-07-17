<script>
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let slug = $page.params.slug;
	let title = '';
	let content = '';

	onMount(async () => {
		let response = await fetch('/blogs.json');
		let data = await response.json();

		title = data[slug].title;
		content = marked.parse(data[slug].content);
	});
</script>

<svelte:head>
	<title>{title} - Tecka</title>
</svelte:head>

<h1 id="title">{title}</h1>
{@html content}

<style>
	#title {
		font-family: 'Lora', serif;
		font-size: 2.5em;
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
</style>
