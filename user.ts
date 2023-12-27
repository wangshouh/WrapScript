import select from '@inquirer/select'
import { wrap, unwrap, updateAgenctConfig } from './mintDeployer'
import chalk from 'chalk'

const userSelect = await select({
    message: "Wrap Protocol Interaction Selection",
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
            name: "Update Config",
            value: "updateAgenctConfig",
            description: `Update Agent Config`
        }
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
    default:
        break;
}