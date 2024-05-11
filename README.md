# WrapScript

Before running this script, you need to install `bun`.

```bash
curl -fsSL https://bun.sh/install | bash
```

> For more detailed installation tutorials, please refer to [this document](https://bun.sh/docs/installation).

Use the following command to confirm that `bun` is installed successfully and the version number is required to be greater than `1.0.0`.

```bash
bun --version
```
If the version number is less than 1.0.0, please use the following command to upgrade bun:

```bash
bun upgrade
```

To install dependencies:

```bash
bun install
```

Before performing the following operations, you need to configure `.env` file:

```
PRIVATE_KEY=<YOUR PRIVATE KEY>
RPC_URL=<ETHEREUM SEPOLIA RPC URL>
```

> `RPC_URL` is optional.

If you want to fully experience the protocol please run the following command:

```bash
bun run dotAgency.ts
```

The script provides the following functionality:

- `Mint DotAgency` Pay ETH to get dotAgency NFT has been used for further interactions
- `Deploy App and Agency` Issue NFT asset pools for dotAgencys. Note that each dotAgency can only deploy one NFT asset pool.
- `Manage TokenURI` Set default TokenURI engine for managing NFTs
- `Change DotAgency NFT TokenURI` Modify DotAgency’s tokenURI engine

If you only want to experience NFT wrapping and unwrapping using ERC20 tokens or ETH, run the following command:

```bash
bun run user.ts
```

The script only contains the following three functions:

- `Wrap` Wrap ERC20 tokens or ETH into NFTs
- `Unwrap` Unwrap NFT to obtain ERC20 or ETH assets
- `Update Config` Enter the agent address to obtain relevant information and write it to the configuration file
- `Set TokenURI Engine` Modify the tokenURI engine of personal NFT