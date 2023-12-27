import select from '@inquirer/select'
import { mintDeployer, deployAppAndAgency, wrap, unwrap } from './mintDeployer'
import chalk from 'chalk'

const userSelect = await select({
    message: "Wrap Protocol Interaction Selection",
    choices: [
        {
            name: "Mint Deployer",
            value: "mintDeployer",
            description: "Spend ETH to mint deployer to participate"
        },
        {
            name: "Deploy App and Agency",
            value: "deployAppAndAgency",
            description: `Deploy app and agency. This process can be done after ${chalk.blueBright("Mint Deployer")}`
        }
    ]
})


switch (userSelect) {
    case "mintDeployer":
        await mintDeployer()
        break;

    case "deployAppAndAgency":
        await deployAppAndAgency()
        break;
        
    default:
        break;
}