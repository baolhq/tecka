import { writable } from 'svelte/store';

export const isMenuOpen = writable(false);
export const isMobile = writable(false);
export const theme = writable('dark');
