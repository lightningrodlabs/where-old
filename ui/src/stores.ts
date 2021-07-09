import { writable/*, readable, derived*/ } from 'svelte/store'

export const spaces = writable(
  [{name: "Earth",
    meta: {
      url: "https://www.freeworldmaps.net/world/worldmap-physical-hd.jpg"
    }},
  {name: "Ecuador",
    meta: {
      url: "https://www.freeworldmaps.net/southamerica/ecuador/ecuador-map.jpg"
    }}]
)
