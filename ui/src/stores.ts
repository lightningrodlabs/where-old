import { writable/*, readable, derived*/ } from 'svelte/store'


const wheres = [
  { entry: {location: {x: 540, y: 410}, meta: "My house"},
    authorPic: "https://i.imgur.com/oIrcAO8.jpg",
    authorName: "Eggy",
    authorPubkey: "mememememememememememememememeeeeee"},
  { entry: {location: {x: 900, y: 420}, meta: "My apartment"},
    authorPic: "https://i.imgur.com/4BKqQY1.png",
    authorName: "Monk",
    authorPubkey: "sntahoeuabcorchaotbkantgcdoesucd"}
]

export const spaces = writable(
  [{name: "Earth",
    meta: {
      url: "https://www.freeworldmaps.net/world/worldmap-physical-hd.jpg",
      size: {x: 1920, y: 1019}
    },
    wheres},
   {name: "Ecuador",
    meta: {
      url: "https://www.freeworldmaps.net/southamerica/ecuador/ecuador-map.jpg",
      size: {x: 500, y: 300}
    },
    wheres: []
   }
  ]
)
