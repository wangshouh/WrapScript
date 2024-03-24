import select from '@inquirer/select'
import { mintDotAgency, deployAppAndAgency, setTokenURIEngine, changeDotAgencyTokenURI, rebaseFee } from './mintDotAgency'
import { approvePush } from "./utils/stake"
import chalk from 'chalk'

const userSelect = await select({
    message: "Wrap Protocol Interaction Selection",
    choices: [
        {
            name: "Bid Agency",
            value: "mintDotAgency",
            description: "Spend ETH to mint agency to participate"
        },
        {
            name: "Deploy App and Agency",
            value: "deployAppAndAgency",
            description: `Deploy app and agency. This process can be done after ${chalk.blueBright("Mint DotAgency")}`
        },
        {
            name: "Manage TokenURI",
            value: "setTokenURIEngine",
            description: `Manage agency's TokenURI.`
        },
        {
            name: "Change Agency NFT TokenURI",
            value: "changeDotAgencyTokenURI",
            description: `Change Agency's TokenURI.`
        },
        {
            name: "Exact Fee From Agency",
            value: "rebaseFee",
            description: `Exact fee from agency to dotAgency NFT ERC6551 Account.`
        },
        {
            name: "Config Stake Push",
            value: "approvePush",
            description: `Config Push to Stake NFT.`
        }
    ]
})


switch (userSelect) {
    case "mintDotAgency":
        await mintDotAgency()
        break;

    case "deployAppAndAgency":
        await deployAppAndAgency()
        break;
    
    case "setTokenURIEngine":
        await setTokenURIEngine()
        break;

    case "changeDotAgencyTokenURI":
        await changeDotAgencyTokenURI()
        break;

    case "rebaseFee":
        await rebaseFee()
        break;

    case "approvePush":
        await approvePush()
        break;
        
    default:
        break;
}