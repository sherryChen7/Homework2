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




// var event = bank.Deposit();

// // watch for changes
// bank.watch(function(error, result){
//     // result contains non-indexed arguments and topics
//     // given to the `Deposit` call.
//     if (!error)
//         console.log(result);
// })

// console.log(address); 
// var event = bank.MintEvent();

// var events = require('events');
// var eventEmitter = bank.MintEvent();
// eventEmitter.watch('MintEvent', function(from, value, timestamp) { 
//     console.log('MintEvent occur'); 
// })

web3.eth.getAccounts().then(function (accounts) {

    // accounts[0] mint 3 * 10**18 coins
    // your code

    // const B = require('Bank')

    // if (accounts[0] !== address)
    //     return

    // console.log(accounts); 
    // console.log(bank.options.address); 


    // var events2 = require('events');
    // var eventEmitter2 = new events2.EventEmitter();
    // eventEmitter2.on('MintEvent', function(from, value, timestamp) { 
    //     console.log('MintEvent occur'); 
    // })


    // var retValueEvent = bank.methods.MintEvent
    // var mintEvent = bank.MintEvent({_owner:accounts[0]});
    // mintEvent.watch(function(err, result){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log(result.args.value);
    // });

    // const ethers = require('ethers');
    // const input1 = ethers.utils.bigNumberify(1000000000000);

    // const { toHex } = web3.utils;
    var coinValue = 3 * 10**18

    var input = web3.utils.toBN(coinValue).toString();
    // input = new BN(1000000)
    console.log("input: " + input)

    // bank.events.MintEvent({
    // }, function(error, event){if (error) return console.log("MintEvent error: " + error); console.log("event: " + event['data']); })

    let tx = bank.methods.mint(input).send({from:accounts[0]}, function(error, Receipt){
        if (error) return console.log("mint error: " + error)

        console.log(Receipt); 
        
        web3.eth.getTransactionReceipt(Receipt).then(function (accounts) {
            console.log(accounts); 
        })

        let CoinBalance = bank.methods.getCoinBalance().call({from:accounts[0]}, function(error, result){
            if (error) return console.log("error: " + error)
            // web3.eth.getCoinBalance(accounts[0]).then(function (first) {
                console.log("CoinBalance: " + result)
            // })
        })

        // CoinBalance.then(function (first) {
        //     console.log("CoinBalance: " + first)
        // })
    })
})
