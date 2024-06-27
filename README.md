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

- `Bid .Agency` Pay ETH to get dotAgency NFT has been used for further interactions
- `Deploy ERC7527` Issue NFT asset pools for dotAgencys. Note that each dotAgency can only deploy one NFT asset pool.
- `Manage TokenURI` Set default TokenURI engine for managing NFTs
- `Change .Agency TokenURI` Modify DotAgency’s tokenURI engine
- `Config Stake Push` If you use ETH or Wrap Coin as Agency's currency, you can run this command to enable staking configuration.
- `Claim Lock Wrap Coin` Withdraw locked Wrap Coin

If you only want to experience NFT wrapping and unwrapping using ERC20 tokens or ETH, run the following command:

```bash
bun run user.ts
```

The script only contains the following three functions:

- `Wrap` Wrap ERC20 tokens or ETH into NFTs
- `Unwrap` Unwrap NFT to obtain ERC20 or ETH assets
- `Add Agency` Enter the agency address to obtain relevant information and write it to the configuration file
- `Set TokenURI Engine` Modify the tokenURI engine of personal NFT
- `Create ERC6551 Account` Create an ERC6551 account for NFT
- `Manage Resolver` Manage the resolver of NFT, contains the following functions:
    - `Set Resolver` Set the resolver of NFT
    - `Bond AI APP` Use `TXT` record form to bind keys and corresponding values
    - `Read Bond Records` Enter key to find its corresponding value

The following command is used for staking of ERC7527. Before running the following command, please make sure you have executed the `Config Stake Push` command in `bun dotAgency.ts`.

```bash
bun run stake.ts
```

The script only contains the following five functions:

- `ERC7527 Stake` Staking ERC7527 using Wrap Coin and ETH as currency 
    - `Stake ERC7527` Staking ERC7527 obtained through wrap
    - `Unstake ERC7527` Unstaking ERC7527
    - `Update Pool L1` Start the L1 staking epoch.
    - `Withdraw L1 Reward` Withdraw dotAgency rewards and divide funds for L2
    - `Update Pool L2` Use the funds allocated by L1 to L2 to start the epoch of L2
    - `Withdraw ERC7527 Stake Reward` Withdraw rewards from staked ERC7527
- `LP Token Stake` Staking WRAP-ETH LP Token in Uniswap V2
    - `Stake LP Token` Staking LP Token
    - `Claim LP Token Reward` Claim LP Token rewards
    - `Unstake LP Token` Withdraw LP Token