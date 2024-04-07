import select from '@inquirer/select'
import { mintDotAgency, deployAppAndAgency, setTokenURIEngine, changeDotAgencyTokenURI, rebaseFee, claimLockWrapCoin } from './mintDotAgency'
import { approvePush } from "./utils/stake"
import chalk from 'chalk'

const userSelect = await select({
    message: "Wrap Protocol Interaction Selection",
    choices: [
        {
            name: "Bid DotAgency",
            value: "mintDotAgency",
            description: "Spend ETH to mint agency to participate"
        },
        {
            name: "Deploy App and Agency",
            value: "deployAppAndAgency",
            description: `Deploy app and agency. This process can be done after ${chalk.blueBright("Bid DotAgency")}`
        },
        {
            name: "Manage TokenURI",
            value: "setTokenURIEngine",
            description: `Manage agents' TokenURI.`
        },
        {
            name: "Change DotAgency NFT TokenURI",
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
        },
        {
            name: "Claim Lock Wrap Coin",
            value: "claimLockWrapCoin",
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
    
    case "claimLockWrapCoin":
        claimLockWrapCoin()
        break;
    default:
        break;
}