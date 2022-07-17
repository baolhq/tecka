<script context="module">
	export const load = async ({ url: { pathname } }) => ({
		props: { pathname }
	});
</script>

<script>
	import MenuIcon from '../lib/components/MenuIcon.svelte';
	import Menu from '../lib/components/Menu.svelte';
	import PageTransition from '../lib/components/PageTransition.svelte';
	import { isMenuOpen, isMobile, theme } from '../store.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let pathname;

	onMount(() => {
		isMobile.set(detectMobile());
		getTheme();
		console.log($theme);
		document.documentElement.setAttribute('data-theme', $theme);
	});

	const detectMobile = () => {
		const toMatch = [
			/Android/i,
			/webOS/i,
			/iPhone/i,
			/iPad/i,
			/iPod/i,
			/BlackBerry/i,
			/Windows Phone/i
		];

		return toMatch.some((toMatchItem) => {
			return navigator.userAgent.match(toMatchItem);
		});
	};

	const getTheme = () => {
		let localTheme = localStorage.getItem('theme');
		if (localTheme === null || localTheme === 'dark') {
			localStorage.setItem('theme', 'dark');
			theme.set('dark');
		} else {
			theme.set('light');
		}
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="/global.css" />
</svelte:head>

<MenuIcon />
<Menu />

<main>
	<PageTransition {pathname}>
		<slot />
	</PageTransition>
</main>

<style>
	main {
		width: 60%;
		margin: auto;
		margin-top: 3rem;
	}
</style>
