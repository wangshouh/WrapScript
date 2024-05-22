import { createTestClient, http, parseEther, parseGwei } from 'viem'
import { foundry } from 'viem/chains'
 
const testClient = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(), 
})
await testClient.setBalance({
  address: "0x60D380e77744b05e8761140Daf32e70506609D2B",
  value: parseEther("100")
})
await testClient.sendUnsignedTransaction({
    from: "0x60D380e77744b05e8761140Daf32e70506609D2B",
    to: "0x148184F96C73152166AAfD1C22CF82f5ae7349EE",
    data: "0x095ea7b3000000000000000000000000bb95f85b8e4187e967000dbe5e2b4d9729da9e9affffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
})
