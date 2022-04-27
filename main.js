//Import createPandoraExpressSDK from SDK
const { createPandoraExpressSDK } = require("pandora-express");
const pandoraSDK = createPandoraExpressSDK();

mint = async () =>{
//get current account address
const accounts = await web3.eth.getAccounts(); 
//Get ChainID of current account
const chainId = await web3.eth.net.getId();
//Mint NFT using SDK erc721 nft mint
console.log(chainId);
await pandoraSDK.erc721.nft.mint(web3, chainId, accounts[0], itemURI.value, [
  [accounts[0], 100],
]);
}

const itemURI = document.getElementById("mintNFT");

const createItemButton = document.getElementById("mintBtn");
createItemButton.onclick = mint;

const REQUEST_STATUS = ["Pending", "Active", "Cancelled", "Ended", "Defaulted"];

const LENDING_CONTRACT_ADDRESS = '0x67490a4814a5C127B0522b40d2DaEdF6104BdeA6';
//Connecting with Metamask wallet.
const init = async () => {
//check if metamask is present
  if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  await window.ethereum.enable();
  console.log("Connected");
} else {
  alert("Metamask not found");
}
};

// const erc721ContractAddress = "0x4e38b962783233d82fc8463C0198B240A8a04785";
// const userAddress = "0xe18B1dFb94BB3CEC3B47663F997D824D9cD0f4D2";
// const tokenIdNFT = 17;
const nftContractAddress = document.getElementById("nftContractAddress");
const tokenId = document.getElementById("nftTokenId")

approveNFT = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
   
    const instance = new web3.eth.Contract(tokenABI,nftContractAddress.value,
     {from: accounts[0]});
   
     await instance.methods.approve(LENDING_CONTRACT_ADDRESS, 
       tokenId.value
       )
       .send({
       from: accounts[0],
       })
       .once("receipt", (receipt) => {
         console.log(receipt);
       })
       .catch((err) => {
         console.log(err);
       });
    
   };

   createLoan = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const instance = new web3.eth.Contract(contractABI, LENDING_CONTRACT_ADDRESS, {from: accounts[0]});
    
    await instance.methods.createLoan(nftAddress.value,
      nftId.value,
      loanAmount.value.toString(),
      interestAmount.value.toString(),
      totalTimePeriod.value * 86400,
      maxTimePeriod.value
    ).send({
          from: accounts[0],
        })
        .once("receipt", (receipt) => {
          console.log(receipt);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  acceptLoan = async () =>{
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    
    const instance = new web3.eth.Contract(contractABI, LENDING_CONTRACT_ADDRESS, 
    {from: accounts[0]});
    const sum = ethLoanAmount.value.toString();
  
    await instance.methods.acceptLoan(loanID.value).send({
          value: sum,
          from: accounts[0],
        })
        .once("receipt", (receipt) => {
          console.log(receipt);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  endLoan = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const instance = new web3.eth.Contract(contractABI, LENDING_CONTRACT_ADDRESS, {from: accounts[0]});
    const sum = ethLoanAmount1.value*1 + ethInterestAmount1.value*1;
    console.log(sum);
    await instance.methods.endLoan(loanID1.value).send({
      value: sum.toString(),
      from: accounts[0],
    })
    .once("receipt", (receipt) => {
      console.log(receipt);
    })
    .catch((err) => {
      console.log(err);
    });
  
  }
  extendLoan = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const instance = new web3.eth.Contract(contractABI, LENDING_CONTRACT_ADDRESS, {from: accounts[0]});
  
    await instance.methods.extendLoan(extendLoanId.value).send({
      from: accounts[0],
    })
    .once("receipt", (receipt) => {
      console.log(receipt);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  cancelLoan = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const instance = new web3.eth.Contract(contractABI, LENDING_CONTRACT_ADDRESS, {from: accounts[0]});
    await instance.methods.cancelLoan(cancelLoanId.value).send({
      from: accounts[0],
    })
    .once("receipt", (receipt) => {
      console.log(receipt);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const approves = document.getElementById("approveBtn");
approves.onclick = approveNFT;

const nftAddress = document.getElementById("nftContractAddress1");
const nftId = document.getElementById("nftTokenId1");
const loanAmount = document.getElementById("loanAmount");
const interestAmount = document.getElementById("interestAmount");
const totalTimePeriod = document.getElementById("timePeriod");
const maxTimePeriod = document.getElementById("maxTimePeriod");

const create = document.getElementById("createBtn");
create.onclick = createLoan;

const loanID = document.getElementById("loanId");
const ethLoanAmount = document.getElementById("loanAmount1");
const ethInterestAmount = document.getElementById("interestAmount1");

const accept = document.getElementById("acceptBtn");
accept.onclick = acceptLoan;

const extendLoanId = document.getElementById("extendLoanId");

const extend = document.getElementById("extendBtn")
extend.onclick = extendLoan;

const cancelLoanId = document.getElementById("cancelLoanId");

const cancel = document.getElementById("cancelBtn")
cancel.onclick = cancelLoan;

const loanID1 = document.getElementById("loanId2");
const ethLoanAmount1 = document.getElementById("loanAmount2");
const ethInterestAmount1 = document.getElementById("interestAmount2");

const end = document.getElementById("endBtn")
end.onclick = endLoan;

init();
