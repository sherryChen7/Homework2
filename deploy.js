const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const bytecode = '0x' + fs.readFileSync('./contract/Bank_sol_Bank.bin').toString()

let bank = new web3.eth.Contract(abi)

// bank.new([],{data: bytecode, from: web3.eth.accounts[0], gas: 4700000});

web3.eth.getAccounts().then(function (accounts) {

    // deploy contract
    // your code

    // .eth.accounts

    // code = fs.readFileSync('Voting.sol').toString()
    // solc = require('solc')
    // compiledCode = solc.compile(code)

    // abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
    // VotingContract = web3.eth.contract(abiDefinition)
    // byteCode = compiledCode.contracts[':Voting'].bytecode
    // deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})

    // deployedContract = VotingContract.new()
    // deployedContract.addressweb3
    // contractInstance = VotingContract.at(deployedContract.address)

    // let contractInstance = bank.new([],{data: bytecode, from: web3.eth.accounts[0], gas: 4700000})
    // console.log(accounts[0]);


    // let contractInstance = bank.deploy({data: bytecode}).send({from: accounts[0], gas: 4700000}).then((instance) => {
    //     console.log("Contract mined at " + instance.options.address)
    //     let contractAddress = instance.options.address
    //     console.log(instance);
    //     fs.writeFileSync('./address.txt', contractAddress)
    // })

    let contractInstance = bank.deploy({data: bytecode}).send({from: accounts[0], gas: 470000000}).then((instance) => {
        console.log("Contract instance at " + instance.options.address)
        let contractAddress = instance.options.address
        console.log(instance);
        fs.writeFileSync('./address.txt', contractAddress)
    })
})
