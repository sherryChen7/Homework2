const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const address = fs.readFileSync('./address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

web3.eth.getAccounts().then(function (accounts) {

    // accounts[1] buy 1 * 10**18 coins
    // your code
    var buyCoinValue = 1 * 10**18
    var input = web3.utils.toBN(buyCoinValue).toString();
    console.log("input: " + input)

    bank.methods.buy(input).send({from:accounts[1]}, function(error, Receipt){
        if (error) return console.log("buy error: " + error)

        console.log(Receipt); 
        
        web3.eth.getTransactionReceipt(Receipt).then(function (accounts) {
            console.log(accounts); 
        })

        bank.methods.getCoinBalance().call({from:accounts[0]}, function(error, result){
            if (error) return console.log("error: " + error)
            console.log("Owner CoinBalance: " + result)
        })

        bank.methods.getCoinBalance().call({from:accounts[1]}, function(error, result){
            if (error) return console.log("error: " + error)
            console.log("Buyer CoinBalance: " + result)
        })
    })
})
