<script>
	import { isMenuOpen, isMobile, theme } from '../../store.js';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	onMount(() => {
		if (window.innerWidth <= 500) {
			isMobile.set(true);
		}
	});

	const setMenuOpen = (open) => {
		isMenuOpen.set(open);
	};

	const toggleDarkMode = () => {
		theme.update((v) => (v = v === 'dark' ? 'light' : 'dark'));
		localStorage.setItem('theme', $theme);
		document.documentElement.setAttribute('data-theme', $theme);
	};
</script>

{#if $isMenuOpen || $isMobile}
	<div class="menu" on:mouseenter={() => setMenuOpen(true)} on:mouseleave={() => setMenuOpen()}>
		<a href="/" transition:fade={{ duration: 200 }}>
			<ion-icon name="home-outline" />
		</a>
		<button on:click={() => window.scrollTo(0, 0)} transition:fade={{ duration: 300 }}>
			<ion-icon name="chevron-up-outline" />
		</button>
		<a href="/tags" transition:fade={{ duration: 400 }}>
			<ion-icon name="pricetag-outline" />
		</a>
		<button on:click={toggleDarkMode} transition:fade={{ duration: 500 }}>
			<ion-icon name={$theme === 'light' ? 'partly-sunny-outline' : 'moon-outline'} />
		</button>
		<a href="/about" transition:fade={{ duration: 600 }}>
			<ion-icon name="help-outline" />
		</a>
	</div>
{/if}

<style>
	.menu {
		position: fixed;
		top: 68px;
		left: 30px;
		width: fit-content;
		display: flex;
		flex-direction: column;
	}
	button {
		background: transparent;
		border: none;
	}
	a,
	button {
		margin-top: 24px;
		padding: 0 8px;
	}
	a:hover,
	button:hover {
		cursor: pointer;
	}
	ion-icon {
		color: var(--fg);
		font-size: 1.5em;
		pointer-events: none;
	}
	@media screen and (max-width: 500px) {
		.menu {
			top: 0;
			left: 12px;
		}
	}
</style>
