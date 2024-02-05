# WrapScript

Before running this script, you need to install `bun`.

```bash
curl -fsSL https://bun.sh/install | bash
```

> For more detailed installation tutorials, please refer to [this document](https://bun.sh/docs/installation).

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
bun run deployer.ts
```

The script provides the following functionality:

- `Mint Deployer` Pay ETH to get deployer NFT has been used for further interactions
- `Deploy App and Agency` Issue NFT asset pools for deployers. Note that each deployer can only deploy one NFT asset pool.
- `Manage TokenURI` Set default TokenURI engine for managing NFTs
- `Change Deployer NFT TokenURI` Modify Deployer’s tokenURI engine

If you only want to experience NFT wrapping and unwrapping using ERC20 tokens or ETH, run the following command:

```bash
bun run user.ts
```

The script only contains the following three functions:

- `Wrap` Wrap ERC20 tokens or ETH into NFTs
- `Unwrap` Unwrap NFT to obtain ERC20 or ETH assets
- `Update Config` Enter the agent address to obtain relevant information and write it to the configuration file
- `Set TokenURI Engine` Modify the tokenURI engine of personal NFT

- Resolver
- tokenURI

---

1. 铸造 Deployer NFT `Mint Deployer`
    1. 输入 Deployer 名字(不可重复)
    1. 输入滑点值
    1. (NFT 铸造后的代币分发)
1. 修改 Deployer NFT 的 TokenURI 引擎 `Change Deployer NFT TokenURI`
    1. 直接 TokenURI 引擎合约地址
1. 使用 Factory 部署 App 及其 Agency
1. 为 APP 设置 tokenURI engine
1. 提款至 ERC551 账户

---

1. 投票合约
    1. 控制数据(接受、续费、访问) -> filecoin 特殊函数
    1. 控制 DataDAO 金库(操作纯链上) -> 已有项目
1. `mount` 合约
    1. DealID NFT 化
    1. Uploader: 链下(数据 CID 化) -> 对 CID 投票 -> DealID `mount`
    1. DealID NFT 化条件判断: -> filecoin 特殊函数
        1. 数据存储到 Filecoin
        1. 数据的 funding 由 DataDao 提供
        1. 数据所有权属于 DataDao ?
        1. DataDao 上传数据产生的 `DealID` 作为 NFT 凭证给予用户
1. 永久存储合约
    1. 管理 DealID 的续费 -> filecoin 特殊函数
1. 市场合约(可选)
    1. 拍卖或交易 -> 已有项目
1. 协议同一的 CID 数据库(可选)

---

协议链下服务:

1. 控制 DataDAO 金库投票 UI
1. 数据集展示
1. 数据集工具

---

资金收入:

1. filecoin 协议收入(拍卖数据集)
1. 未来的数据集商业化收益

资金去向:

1. 金融 NFT 持有者
1. DataDAO 金库 -> 上传者激励、存储提供方激励