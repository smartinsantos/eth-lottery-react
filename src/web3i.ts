import Web3 from 'web3'
// injecting metamask provider

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.ethereum.request({ method: 'eth_requestAccounts' })

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const web3i: InstanceType<typeof Web3> = new Web3(window.ethereum)
