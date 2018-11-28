const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

// Websocket for listent Events.
// let web3 = new Web3()
// const eventProvider = new Web3.providers.WebsocketProvider("ws://localhost:8545")
// web3.setProvider(eventProvider)

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const address = fs.readFileSync('./address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

web3.eth.getAccounts().then(function (accounts) {
    // bank.events.MintEvent({
    // }, function(error, event){if (error) return console.log("MintEvent error: " + error); console.log("event: " + event['data']); })

    var coinValue = 3 * 10**18
    var input = web3.utils.toBN(coinValue).toString();
    console.log("input: " + input)

    let tx = bank.methods.mint(input).send({from:accounts[0]}, function(error, Receipt){
        if (error) return console.log("mint error: " + error)

        console.log(Receipt); 
        
        web3.eth.getTransactionReceipt(Receipt).then(function (accounts) {
            console.log(accounts); 
        })

        // check CoinBalance
        bank.methods.getCoinBalance().call({from:accounts[0]}, function(error, result){
            if (error) return console.log("error: " + error)
            console.log("CoinBalance: " + result)
        })
    })
})
