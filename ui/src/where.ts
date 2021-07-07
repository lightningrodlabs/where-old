import {/*AdminWebsocket,*/ AppWebsocket, InstalledAppInfo, AgentPubKey, HoloHash, CellId} from '@holochain/conductor-api'
import { bufferToBase64 } from './utils'

type Attached = {
  appInfo: InstalledAppInfo
  agentPubKey: AgentPubKey
  dna: HoloHash
  dnaStr: string
  me: string
  cellId: CellId
}

export class Zome {
  appClient: AppWebsocket
  appId: string
  conn?: Attached

  constructor(appClient, appId) {
    this.appClient = appClient
    this.appId = appId
  }

  async attach() {
    // setup the dna instance data
    const appInfo = await this.appClient.appInfo({ installed_app_id: this.appId })
    const cellId = appInfo.cell_data[0].cell_id
    const agentPubKey = cellId[1]
    const dna = cellId[0]
    this.conn = {
      appInfo,
      cellId,
      agentPubKey,
      dna,
      dnaStr: bufferToBase64(dna),
      me: bufferToBase64(agentPubKey),
    }
    return this.conn
  }

  async call(fn_name, payload, timeout) {
    if (!this.conn) {
      console.log("Can't call zome when disconnected from conductor")
      return
    }
    try {
      const zome_name = 'where'
      console.log(`Making zome call ${fn_name} with:`, payload)
      const result = await this.appClient.callZome(
        {
          cap: null,
          cell_id: this.conn.cellId as CellId,
          zome_name,
          fn_name,
          provenance: this.conn.agentPubKey,
          payload
        },
        timeout
      )
      return result
    } catch (error) {
      console.log('ERROR: callZome threw error', error)
      throw(error)
      //  if (error == 'Error: Socket is not open') {
      // TODO        return doResetConnection(dispatch)
      // }
    }
  }
}

export class Where {
  appHost: string
  appPort: number
  appId: string
  appClient?: AppWebsocket
  zome?: Zome

  constructor(appHost, appPort, appId) {
    this.appHost = appHost;
    this.appPort = appPort;
    this.appId = appId;
  }

  async connect() {
    var self = this;
    this.appClient = await AppWebsocket.connect(
      `ws://${this.appHost}:${this.appPort}`,
      30000,
      (signal) => signalHandler(self, signal))

    console.log('connection to holochain established:', this)

    this.zome = new Zome(this.appClient, this.appId)
    await this.zome.attach()
  }

  clearState() {
  }

  async callZome(fn_name, payload, timeout) {
    if (!this.zome) {
      console.log("Can't call zome before zome attached to conductor")
    } else {
      return this.zome.call(fn_name, payload, timeout)
    }
  }
}

function signalHandler(where, signal) {
  // ignore signals not meant for me
  if (!where || bufferToBase64(signal.data.cellId[1]) != where.me) {
    return
  }
  console.log('Got Signal', signal.data.payload.signal_name, signal)
  //switch (signal.data.payload.signal_name) {
  //}
}
