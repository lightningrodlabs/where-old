import { writable/*, readable, derived*/ } from 'svelte/store'

export const spaces = writable(
  [{name: "Earth",
    meta: {
      url: "https://h5pstudio.ecampusontario.ca/sites/default/files/h5p/content/9451/images/image-5f6645b4ef14e.jpg",
      size: {x: 1920, y: 1019}
    },
    wheres: [
      { entry: {location: {x: 1150, y: 450}, meta: "My house"},
        authorPic: "https://i.imgur.com/oIrcAO8.jpg",
        authorName: "Eggy",
        authorPubkey: "mememememememememememememememeeeeee"},
      { entry: {location: {x: 1890, y: 500}, meta: "My apartment"},
        authorPic: "https://i.imgur.com/4BKqQY1.png",
        authorName: "Monk",
        authorPubkey: "sntahoeuabcorchaotbkantgcdoesucd"}
    ]
   },
   {name: "Ecuador",
    meta: {
      url: "https://www.freeworldmaps.net/southamerica/ecuador/ecuador-map.jpg",
      size: {x: 500, y: 300}
    },
    wheres: [
      { entry: {location: {x: 0, y: 0}, meta: "My apartment"},
        authorPic: "https://i.imgur.com/4BKqQY1.png",
        authorName: "Monk",
        authorPubkey: "sntahoeuabcorchaotbkantgcdoesucd"}
    ]
   }
  ]
)
