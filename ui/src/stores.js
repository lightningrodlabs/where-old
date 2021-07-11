import { writable /*, readable, derived*/ } from 'svelte/store';
const entry = { location: { x: 540, y: 410 }, meta: "My house" };
const wheres = [{ entry, authorPic: "https://i.imgur.com/oIrcAO8.jpg", authorName: "Eggy" }];
export const spaces = writable([{ name: "Earth",
        meta: {
            url: "https://www.freeworldmaps.net/world/worldmap-physical-hd.jpg",
            size: { x: 1920, y: 1019 }
        },
        wheres },
    { name: "Ecuador",
        meta: {
            url: "https://www.freeworldmaps.net/southamerica/ecuador/ecuador-map.jpg"
        } }]);
//# sourceMappingURL=stores.js.map