export const CONTRACT_ADDRESS = "0x60f51b781B20Ee608327859673289De837170438";

export const CONTRACT_ABI = [
{
"anonymous": false,
"inputs": [
{"indexed": false,"internalType": "string","name": "hash","type": "string"},
{"indexed": false,"internalType": "address","name": "owner","type": "address"},
{"indexed": false,"internalType": "uint256","name": "timestamp","type": "uint256"}
],
"name": "ProofStored",
"type": "event"
},
{
"inputs":[{"internalType":"string","name":"hash","type":"string"}],
"name":"storeProof",
"outputs":[],
"stateMutability":"nonpayable",
"type":"function"
},
{
"inputs":[{"internalType":"string","name":"hash","type":"string"}],
"name":"verifyProof",
"outputs":[
{"internalType":"bool","name":"exists","type":"bool"},
{"internalType":"address","name":"owner","type":"address"},
{"internalType":"uint256","name":"timestamp","type":"uint256"}
],
"stateMutability":"view",
"type":"function"
}
];