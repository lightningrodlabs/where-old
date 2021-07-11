<script lang="ts">
  import { onMount } from 'svelte'
  import { spaces } from './stores'
  import { Where } from './where'
  let where

  let appHost= 'localhost'
  let appPort=8888
  let appId='where'

 onMount(async () => {
    where = new Where(appHost, appPort, appId)
    await where.connect()
  });

  let current = 0
  let me = "mememememememememememememememeeeeee"
</script>

<main>
  <h1>Where: {$spaces[current].name}!</h1>
  <select bind:value={current} >
    {#each $spaces as space, i}
      <option value={i}>
	{space.name}
      </option>
    {/each}
  </select>
  <div class="map">
    <img src="{$spaces[current].meta.url}">
    {#each $spaces[current].wheres as where}
      <img class="where-marker" class:me={where.authorPubkey == me} style="left:{where.entry.location.x - (40/2)}px;top: {where.entry.location.y - (40/2)}px" src="{where.authorPic}">
      <div class="where-details" class:me={where.authorPubkey == me} style="left:{where.entry.location.x - (40/2)}px;top: {where.entry.location.y + (40/2)}px" src="{where.authorPic}">
        <h3>{where.authorName}</h3>
        <p>{where.entry.meta}</p>
      </div>
    {/each}
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

  .map{
    position: relative;
  }

  img.where-marker {
    max-width:100%;
    max-height:100%;
    border-radius: 10000px;
    border: black 1px solid;
    position: absolute;
    height: 40px; /* hardcoded for now */
    width: 40px;
  }

  img.where-marker.me {
    border: orange 2px solid;
  }

  .where-details {
    display: none;
    position: absolute;

    background: white;
    border-radius: 10px;
    border: black 1px solid;
    padding: 15px;
    text-align: left;
  }

  .where-details.me {
    border: orange 2px solid;
  }

  .where-details h3 {
    margin: 0;
  }

  .where-details p:last-of-type {
    margin-bottom: 0;
  }

  .where-marker:hover + .where-details, .where-details:hover {
    display: block;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
