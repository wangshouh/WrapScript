export const agencyABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "dotAgencyContract_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "wrapCoin_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "premiumDAOVault_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "wrapFoundationVault_",
                "type": "address",
                "internalType": "address payable"
            },
            {
                "name": "swapVault_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "stakingVault_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "erc6551AccountImp_",
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
        "name": "_getPrice",
        "inputs": [],
        "outputs": [
            {
                "name": "currentPrice",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "approve",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
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
        "name": "cancel",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
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
        "name": "creator",
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
        "name": "debtsOfTokenId",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "debts",
                "type": "uint256",
                "internalType": "uint256"
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
        "name": "feeCount",
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
        "name": "forceApprove",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "forceCancel",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getStrategy",
        "inputs": [],
        "outputs": [
            {
                "name": "app",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "asset",
                "type": "tuple",
                "internalType": "struct Asset",
                "components": [
                    {
                        "name": "currency",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "basePremium",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "feeRecipient",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "mintFeePercent",
                        "type": "uint16",
                        "internalType": "uint16"
                    },
                    {
                        "name": "burnFeePercent",
                        "type": "uint16",
                        "internalType": "uint16"
                    }
                ]
            },
            {
                "name": "attributeData",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "getUnwrapOracle",
        "inputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "swap",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "fee",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getWrapOracle",
        "inputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "swap",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "fee",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "inbox",
        "inputs": [
            {
                "name": "",
                "type": "bytes4",
                "internalType": "bytes4"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isApproved",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "data",
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
        "name": "isForceApproved",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "internalType": "bytes4"
            },
            {
                "name": "target",
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
        "name": "isRenounceForceApprove",
        "inputs": [],
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
        "name": "isRenounceForceCancel",
        "inputs": [],
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
        "name": "perTokenReward",
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
        "name": "premiumDAOVault",
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
        "name": "rebase",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceForceApprove",
        "inputs": [
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
        "name": "renounceForceCancel",
        "inputs": [
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
        "name": "swapVault",
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
        "name": "tokenIdOfDotAgency",
        "inputs": [],
        "outputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "unwrap",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "wrap",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "wrapCoin",
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
        "name": "wrapFoundationVault",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address payable"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "Approve",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "indexed": true,
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "data",
                "type": "bytes",
                "indexed": false,
                "internalType": "bytes"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Cancel",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "indexed": true,
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "data",
                "type": "bytes",
                "indexed": false,
                "internalType": "bytes"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ForceApprove",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "indexed": true,
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ForceCancel",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "indexed": true,
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RenounceForceApprove",
        "inputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RenounceForceCancel",
        "inputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Unwrap",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "premium",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "fee",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Wrap",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "premium",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "fee",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "AddressEmptyCode",
        "inputs": [
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "AddressInsufficientBalance",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "FailedInnerCall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ForceApproveRenounced",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ForceCancelRenounced",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidPullTarget",
        "inputs": [
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "MustRenounce",
        "inputs": []
    },
    {
        "type": "error",
        "name": "PullLocked",
        "inputs": [
            {
                "name": "selector",
                "type": "bytes4",
                "internalType": "bytes4"
            },
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ]
    },
    {
        "type": "error",
        "name": "ReentrancyGuardReentrantCall",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SafeERC20FailedOperation",
        "inputs": [
            {
                "name": "token",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "TokenIdNotMatch",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "WrapV2AutionCallerNotApp",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "WrapV2AutionExceededSlippagePrice",
        "inputs": [
            {
                "name": "required",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "available",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "WrapV2AutionInsufficientFunds",
        "inputs": [
            {
                "name": "expectation",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "reality",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "WrapV2AutionLessThanMinimumValue",
        "inputs": [
            {
                "name": "required",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "available",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "WrapV2AutionNotOwnerAndNotApproved",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "WrapV2AutionNotOwnerOfApp",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "WrapV2AutionNotOwnerOfDotAgency",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ]
    }
] as const;

export const appABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "agency_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "factory_",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "account",
        "inputs": [
            {
                "name": "implementation",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "salt",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "chainId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "tokenContract",
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
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "approve",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
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
        "name": "balanceOf",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "result",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "burn",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createAccount",
        "inputs": [
            {
                "name": "implementation",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "salt",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "chainId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "tokenContract",
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
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "dotAgency",
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
        "name": "getAgency",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address payable"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getApproved",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "result",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMaxSupply",
        "inputs": [],
        "outputs": [
            {
                "name": "maxSupply",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "getName",
        "inputs": [
            {
                "name": "node",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getName",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getNode",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "node",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getProxyTokenURIEngine",
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
        "name": "getResolver",
        "inputs": [
            {
                "name": "node",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
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
        "name": "getTokenId",
        "inputs": [
            {
                "name": "node",
                "type": "bytes32",
                "internalType": "bytes32"
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
        "name": "getTokenURIEngine",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
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
        "name": "init",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "result",
                "type": "bool",
                "internalType": "bool"
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
        "name": "isRecordExists",
        "inputs": [
            {
                "name": "node",
                "type": "bytes32",
                "internalType": "bytes32"
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
        "name": "mint",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "nextTokenId",
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
        "name": "ownerOf",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "result",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "setAgency",
        "inputs": [
            {
                "name": "agency",
                "type": "address",
                "internalType": "address payable"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "isApproved",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
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
        "name": "setProxyTokenURIEngine",
        "inputs": [
            {
                "name": "proxyTokenURIEngine",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setResolver",
        "inputs": [
            {
                "name": "node",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "resolver",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setSubnode",
        "inputs": [
            {
                "name": "parentNode",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "name",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setSubnodeRecord",
        "inputs": [
            {
                "name": "parentNode",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "name",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "resolver",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "subnode",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setTokenURIEngine",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "tokenURIEngine",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
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
        "name": "symbol",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tokenIdOfDotAgency",
        "inputs": [],
        "outputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "tokenURI",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "output",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalSupply",
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
        "name": "transferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "event",
        "name": "Approval",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "id",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ApprovalForAll",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "isApproved",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "anonymous": false
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
        "name": "ERC6551AccountCreated",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "implementation",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "salt",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "chainId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "tokenContract",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Mint",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "bytes",
                "indexed": true,
                "internalType": "bytes"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewResolver",
        "inputs": [
            {
                "name": "node",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "resolver",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewSubNode",
        "inputs": [
            {
                "name": "parentNode",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "subnode",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "name",
                "type": "bytes",
                "indexed": true,
                "internalType": "bytes"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SetProxyTokenURIEngine",
        "inputs": [
            {
                "name": "oldTokenURIEngine",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "newTokenURIEngine",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SetTokenURIEngine",
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "tokenURIEngine",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "id",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "ANSNameMinted",
        "inputs": [
            {
                "name": "name",
                "type": "bytes",
                "internalType": "bytes"
            }
        ]
    },
    {
        "type": "error",
        "name": "ANSNotAuthorised",
        "inputs": []
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
        "name": "AccountBalanceOverflow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AccountCreationFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AgentCallerIsNotAgency",
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
        "name": "AgentCannotRedeploy",
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
        "name": "AgentInvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AgentMaxSupplyExceeded",
        "inputs": [
            {
                "name": "maxSupply",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "BalanceQueryForZeroAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidTokenURIEngine",
        "inputs": [
            {
                "name": "tokenURIEngine",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "NameContainsInvalidCharacters",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NameLengthInvalid",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NotInitializing",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NotOwnerNorApproved",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NotOwnerOrApproved",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TokenAlreadyExists",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TokenDoesNotExist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TokenURISettingsNonexistentToken",
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
        "name": "TransferFromIncorrectOwner",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TransferToNonERC721ReceiverImplementer",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TransferToZeroAddress",
        "inputs": []
    }
] as const