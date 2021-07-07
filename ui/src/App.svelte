<script lang="ts">
  import { onMount } from 'svelte'
  import { spaces } from './stores'
  import { Where } from './where'
  let where

  let appHost= 'localhost'
  let appPort=8888
  let appId='where'

 onMount(async () => {
    console.log("fish")
    where = new Where(appHost, appPort, appId)
    console.log("fish2")
    //await where.connect()
    console.log("fish3")
  });
</script>

<main>
	<h1>Hello {$spaces[0].name}!</h1>

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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
