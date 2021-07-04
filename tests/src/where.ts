import { Orchestrator, Config, InstallAgentsHapps } from '@holochain/tryorama'
import path from 'path'
import * as _ from 'lodash'
import { RETRY_DELAY, RETRY_COUNT, localConductorConfig, networkedConductorConfig, installAgents, awaitIntegration, delay } from './common'

module.exports = async (orchestrator) => {

  orchestrator.registerScenario('where basic tests', async (s, t) => {
    // Declare two players using the previously specified config, nicknaming them "alice" and "bob"
    // note that the first argument to players is just an array conductor configs that that will
    // be used to spin up the conductor processes which are returned in a matching array.
    const [a_and_b_conductor] = await s.players([localConductorConfig])

    // install your happs into the conductors and destructuring the returned happ data using the same
    // array structure as you created in your installation array.
    let [alice_where_happ/*, bobbo_where_happ*/] = await installAgents(a_and_b_conductor,  ["alice"/*, 'bobbo'*/])
    const [alice_where] = alice_where_happ.cells
//    const [bobbo_where] = bobbo_where_happ.cells


    // Create a space
    let space1 = {
      name: "mountain map",
/*      dimensionality: {
        type: "orthogonal",
        coords: {x: "integer", y:"integer"},
        range: {x: {min: 0, max: 1024}, y:{min:0, max: 1024}}
      },*/
      meta: {
        url: "https://mountant-map-images.com/everest"
      }
    };
    const space1_hash = await alice_where.call('where', 'create_space', space1 );
    t.ok(space1_hash)
    console.log(space1_hash);

    const spaces = await alice_where.call('where', 'get_spaces', null );
    console.log(spaces);
    t.deepEqual(spaces, [space1]);

 /*
    let where1 = {
      {
        location: {x: 12354, y: 725},
        meta: {tags: ["personal summit", "feeling good"]}
      }
    }
    const where1_hash = await alice_where.call('where', 'add_where', {space: space1_hash, where: where1});
    t.ok(where1_hash)
    console.log(where1_hash);
*/
  })
}