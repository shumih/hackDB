import { writable } from "svelte/store";

export let pageStorageItem = writable("initial");
export let addressStorageItem = writable("");
