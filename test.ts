import { keccak256, toHex, concat  } from 'viem'

const name = "btc"
const nameHash = keccak256(toHex(name))
const dotAgencyNode = keccak256(concat(['0xb43dbfc1d2fecc659fffd218f4abb6ed0b35bd3896ba6be21f0ca46fb2102ab1', nameHash]))

console.log(dotAgencyNode)