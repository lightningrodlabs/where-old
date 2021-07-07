import { writable/*, readable, derived*/ } from 'svelte/store'

export const spaces = writable(
  [{name: "fish"}]
)
