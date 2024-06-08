import { createTestClient, http, parseEther, parseGwei } from 'viem'
import { foundry } from 'viem/chains'
 
const testClient = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(), 
})
await testClient.setBalance({
  address: "0x4e00243D892B1d6D23aa0Af84818559457fBC214",
  value: parseEther("100")
})
await testClient.sendUnsignedTransaction({
    from: "0x4e00243D892B1d6D23aa0Af84818559457fBC214",
    to: "0xE9D0dc778cc6be88F905e80997Bf87dAdDAC4E20",
    data: "0x2e8b5081000000000000000000000000c4d5dd95e04860140e0200e5b19b34eaa482fda6",
})
