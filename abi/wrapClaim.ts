export const WrapClaimABI = [
    {
        "type": "function",
        "name": "deposit",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "claim",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "unlockBalanceOfTokenId",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "unlock",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "users",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    }
] as const;

export const WrapClaim = {
    address: "0x49D68de80b79d58bD4215b6A4FD74E917C50926c" as `0x${string}`,
    abi: WrapClaimABI
}