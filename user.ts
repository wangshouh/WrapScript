import select from '@inquirer/select'
import { wrap, unwrap, updateAgenctConfig, setUserTokenURIEngine, createERC6551Account } from './mintDotAgency'
import chalk from 'chalk'
import { getResolverBondInCLI, setResolverBondInCLI, setResolverInCLI } from './utils/resolver'

const userSelect = await select({
    message: "Wrap Coin Interaction Selection",
    choices: [
        {
            name: "Wrap",
            value: "wrap",
            description: `Use ${chalk.blueBright("Agency")} to complete token Wrap`
        },
        {
            name: "Unwrap",
            value: "unwrap",
            description: `Unwrap ${chalk.blueBright("Agency")} NFT To Receive ETH or ERC20 Token`
        },
        {
            name: "Add Agency",
            value: "updateAgenctConfig",
            description: `Update Agent Config`
        },
        {
            name: "Set TokenURI Engine",
            value: "setUserTokenURIEngine",
            description: `Set up your NFT tokenURI Engine`
        },
        {
            name: "Create ERC6551 Account",
            value: "createERC6551Account",
            description: `Create an ERC6551 account for the NFT with the specified tokenId`
        },
        // {
        //     name: "Set Resolver",
        //     value: "setResolver",
        //     description: `Set Agent Resolver`
        // },
        // {
        //     name: "Bond AI APP",
        //     value: "bondAPP",
        //     description: "Use resolver to bond other applications"
        // },
        // {
        //     name: "Read Bond Records",
        //     value: "readBond",
        //     description: "Use resolver to read bind records"
        // }
    ]
})

switch (userSelect) {
    case "wrap":
        await wrap()
        break;

    case "unwrap":
        await unwrap()
        break;
    
    case "updateAgenctConfig":
        await updateAgenctConfig()
        break;

    case "setUserTokenURIEngine":
        await setUserTokenURIEngine()
        break;

    case "createERC6551Account":
        await createERC6551Account()
        break;

    case "setResolver":
        await setResolverInCLI()
        break;
    
    case "bondAPP":
        await setResolverBondInCLI()
        break;
        
    case "readBond":
        await getResolverBondInCLI()
        break;

    default:
        break;
}