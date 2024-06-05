import select from '@inquirer/select'
import { mintDotAgency, deployAppAndAgency, setTokenURIEngine, changeDotAgencyTokenURI, rebaseFee, claimLockWrapCoin, renouncePush } from './mintDotAgency'
import { approvePush } from "./utils/stake"
import chalk from 'chalk'

const userSelect = await select({
    message: "Wrap Coin Interaction Selection",
    choices: [
        {
            name: "Bid .Agency",
            value: "mintDotAgency",
            description: "Spend ETH to mint agency to participate"
        },
        {
            name: "Deploy ERC7527",
            value: "deployAppAndAgency",
            description: `Deploy ERC7527. This process can be done after ${chalk.blueBright("Bid .Agency")}`
        },
        {
            name: "Manage Agents TokenURI",
            value: "setTokenURIEngine",
            description: `Manage agents' TokenURI.`
        },
        {
            name: "Change .Agency NFT TokenURI",
            value: "changeDotAgencyTokenURI",
            description: `Change .Agency's TokenURI.`
        },
        {
            name: "Exact Fee From Agency",
            value: "rebaseFee",
            description: `Exact fee from agency to dotAgency NFT ERC6551 Account.`
        },
        {
            name: "Claim Lock Wrap Coin",
            value: "claimLockWrapCoin",
        },
        {
            name: "Config Stake Push",
            value: "approvePush",
            description: `Config Push to Stake NFT.`
        },
        {
            name: "Renounce push management",
            value: "renouncePush",
            description: "Renounce forceApprove or forceCancel"
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
    
    case "renouncePush":
        renouncePush()
        break;
        
    default:
        break;
}