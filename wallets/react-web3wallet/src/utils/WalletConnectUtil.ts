import { Core } from '@walletconnect/core'
import { ICore } from '@walletconnect/types'
import { Web3Wallet, IWeb3Wallet } from '@walletconnect/web3wallet'
import EthereumProvider from '@walletconnect/ethereum-provider'
export let web3wallet: IWeb3Wallet
export let core: ICore
export let ethereumProvider: EthereumProvider

export async function createWeb3Wallet(relayerRegionURL: string) {
  core = new Core({
    logger: 'debug',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    relayUrl: relayerRegionURL ?? process.env.NEXT_PUBLIC_RELAY_URL
  })

  web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: 'React Web3Wallet',
      description: 'React Web3Wallet for WalletConnect',
      url: 'https://walletconnect.com/',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    }
  })
}

export async function createEthereumProvider() {
  // Init ethereum provider
  ethereumProvider = await EthereumProvider.init({
    optionalChains: [1337],
    projectId: '89080488436c9df43eebf70e7e490918',
    showQrModal: true,
    qrModalOptions: { enableExplorer: false },
    chains: [1],
    rpcMap: {
      1337: 'http:localhost:8540'
    },
    methods: ['eth_sendTransaction', 'eth_signTypedData_v4', 'personal_sign'],
    events: ['chainChanged', 'accountsChanged']
  })
}

export async function pair(params: { uri: string }) {
  console.log(params)
  return await web3wallet.pair({ uri: params.uri })
}
