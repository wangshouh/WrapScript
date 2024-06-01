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
    to: "0x28D88A6B210b1BD9ef7961846E6D46e501EF7CCD",
    data: "0x2e8b50810000000000000000000000009274d322e5e79568336aa74ab42ca38663af28ed",
})
