'use strict';

const mongoose = require('mongoose')
const Application = mongoose.model('application');
const EthAccount = mongoose.model('ethAccount');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

module.exports = {
  
  create: (req, res, next) => {
    var newEthAccount, contract, account;
    Application.findById(req.body.application, async function (err, app) {
      account = await createAccount();
      contract = await deployContract(account, app);  
      newEthAccount = new EthAccount({
        applicationId: app,
        accountAddress: account,
        contractAddress: contract
      });
      try {
        await newEthAccount.save()
        res.redirect('/applications/' + app._id);
      } catch (err) {
        res.render('applications');
      }
    })
  }
}

async function createAccount() {
  var newAccount = await web3.eth.accounts.create();
  return newAccount.address;
}

async function deployContract(owner, application) {
  var account, contractAddress;
  await web3.eth.getAccounts().then((accounts) => { account = accounts[0]; })
  await getContract()
  .deploy({
    data: '0x' + bytecode,
    arguments: [owner, application.applicantName, application.applicantDob]
  })
  .send({
    from: account,
    gas: 3000000
  })
  .on('receipt', (receipt) => {
    contractAddress = receipt.contractAddress
  })
  return contractAddress;
}

function getContract() {
  var input, output, abi;
  input = fs.readFileSync('./contracts/Identity.sol');
  output = solc.compile(input.toString(), 1);
  bytecode = output.contracts[':Identity'].bytecode;
  abi = JSON.parse(output.contracts[':Identity'].interface);
  return new web3.eth.Contract(abi);
}

var bytecode;
