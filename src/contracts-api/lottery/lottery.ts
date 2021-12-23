import { AbiItem } from 'web3-utils'
import { web3i } from 'web3i'

const address = '0xcf37437cF7A31e73BBE8fE339436ad06285f977e'

const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor', signature: 'constructor' },
  {
    inputs: [],
    name: 'enter',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
    signature: '0xe97dcb62'
  },
  {
    inputs: [],
    name: 'getPlayers',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x8b5b9ccc'
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x481c6a75'
  },
  {
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x5d495aea'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'players',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xf71d96cb'
  }
]

const lottery = new web3i.eth.Contract(abi as AbiItem[], address)

export const getManager = async () => await lottery.methods.manager().call()

export const getPlayers = async () => await lottery.methods.getPlayers().call()

export const getBalance = async () => {
  const balance = await web3i.eth.getBalance(address)
  return web3i.utils.fromWei(balance)
}

export const enter = async (address: string, value: number) => {
  await lottery.methods.enter().send({
    from: address,
    value
  })
}

export const pickWinner = async (address: string) => {
  await lottery.methods.pickWinner().send({ from: address })
}
