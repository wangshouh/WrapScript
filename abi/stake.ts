export const stakeABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "factory_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "requestedCurrency_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "rewardToken_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "dotAgencyContract_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "erc6551AccountImp_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "stakingVault_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "accessManager",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "receive",
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "authority",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "dotAgencyContract",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "endBlockOfEpoch",
        "inputs": [],
        "outputs": [
            {
                "name": "endBlockOfEpoch",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "erc6551AccountImp",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "factory",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getState",
        "inputs": [
            {
                "name": "l2",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "state",
                "type": "uint8",
                "internalType": "enum NFTStaking.State"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isConsumingScheduledOp",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes4",
                "internalType": "bytes4"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isLocked",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "internalType": "bytes4"
            },
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "l1StakingOfERC20",
        "inputs": [],
        "outputs": [
            {
                "name": "tvlOfTotal",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "accTokenPerShare",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "l1StakingOfETH",
        "inputs": [],
        "outputs": [
            {
                "name": "tvlOfTotal",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "accTokenPerShare",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "lastRewardBlock",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pendingRewards",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
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
    },
    {
        "type": "function",
        "name": "pull",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "internalType": "bytes4"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "requestedCurrency",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "rewardToken",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setAuthority",
        "inputs": [
            {
                "name": "newAuthority",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setWhiteListOfERC7527Agency",
        "inputs": [
            {
                "name": "ERC7527Agency",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "isWhiteListed",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "stake",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            },
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
        "name": "stakingOfNFT",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "tvl",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "points",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "lastRewardBlock",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "accTokenPerShare",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "rewardDebt",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "tokenPerBlock",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "unspentRewards",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "endBlockOfEpoch",
                "type": "uint248",
                "internalType": "uint248"
            },
            {
                "name": "currencyType",
                "type": "uint8",
                "internalType": "enum NFTStaking.Type"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "stakingVault",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            {
                "name": "interfaceId",
                "type": "bytes4",
                "internalType": "bytes4"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tokenIdRewardDebt",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            },
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
    },
    {
        "type": "function",
        "name": "tokenPerBlock",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "unstake",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "reward",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updatePoolL1",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updatePoolL2",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateRewardL1",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateRewardL2",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "whilteListOfERC7527Agency",
        "inputs": [
            {
                "name": "ERC7527Agency",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "withdrawReward",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "reward",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "AuthorityUpdated",
        "inputs": [
            {
                "name": "authority",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Stake",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "l2",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Unstake",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "l2",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "WithdrawReward",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "reward",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "AccessManagedInvalidAuthority",
        "inputs": [
            {
                "name": "authority",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "AccessManagedRequiredDelay",
        "inputs": [
            {
                "name": "caller",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "delay",
                "type": "uint32",
                "internalType": "uint32"
            }
        ]
    },
    {
        "type": "error",
        "name": "AccessManagedUnauthorized",
        "inputs": [
            {
                "name": "caller",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "NFTStakingCurrencyInvalid",
        "inputs": [
            {
                "name": "currency",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "NFTStakingERC7527AgencyInvalid",
        "inputs": [
            {
                "name": "ERC7527Agency",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "NFTStakingNFTInvalid",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "NFTStakingNotForcePushed",
        "inputs": [
            {
                "name": "nft",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "NFTStakingNotOwnerOrApproved",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "NFTStakingNotStaked",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "NFTStakingStaked",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "NFTStakingZeroAddressInvalid",
        "inputs": []
    }
] as const;

export const nftStake = {
    address: "0xdc62d5D7D3d780353E083524d658655504Dd3f6D",
    abi: stakeABI
} as const;