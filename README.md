# WrapScript

```bash
curl -fsSL https://bun.sh/install | bash
```

To install dependencies:

```bash
bun install
```

Before performing the following operations, you need to configure `.env` file:

```
PRIVATE_KEY=<YOUR PRIVATE KEY>
RPC_URL=<ETHEREUM GOERLI RPC URL>
```

> `RPC_URL` is optional.

If you want to fully experience the protocol please run the following command:

```bash
bun run index.ts
```

The script provides the following functionality:

- `Mint Deployer` Pay ETH to get deployer NFT has been used for further interactions
- `Deploy App and Agency` Issue NFT asset pools for deployers. Note that each deployer can only deploy one NFT asset pool.
- `Wrap` Wrap ERC20 tokens or ETH into NFTs
- `Unwrap` Unwrap NFT to obtain ERC20 or ETH assets

If you only want to experience NFT wrapping and unwrapping using ERC20 tokens or ETH, run the following command:

```bash
bun run easy.ts
```

The script only contains the following three functions:

- `Wrap` Wrap ERC20 tokens or ETH into NFTs
- `Unwrap` Unwrap NFT to obtain ERC20 or ETH assets
- `Update Config` Enter the agent address to obtain relevant information and write it to the configuration file

TODO:
- svg 渲染
- `MintFeePercent` > 300
- `agent.lr` -> `.lr`