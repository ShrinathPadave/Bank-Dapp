const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank", function () {
    let account1,account2;
    let account1Address;
    let account2Address;
    let Bank;
    let bank;
    let accountBalance1;

    beforeEach(async function(){
        [account1,account2] = await ethers.getSigners(); 
        Bank = await ethers.getContractFactory("Bank",{
            signer:account1
        });
        bank = await Bank.deploy();
        await bank.deployed();
        
        account1Address = await account1.getAddress();
        account2Address = await account2.getAddress();
    })
    
  it("Should return the Account Balance", async function () {
    expect(await bank.balanceOf(account1Address)).to.equal(0);
  });



  it("Should return the Account Balance after deposit", async function () {

    const depositTx  = await bank.deposit({from:account1Address,value:ethers.utils.parseEther("1")});
    await depositTx.wait();
    expect(await bank.balanceOf(account1Address)).to.equal(ethers.utils.parseEther("1"));
    const transferTx = await bank.connect(account1).withdraw(ethers.utils.parseEther("1"));
    await transferTx.wait();
  });

  
  it("Withdrawing balance from account", async function () {
    const depositTx  = await bank.deposit({from:account1Address,value:ethers.utils.parseEther("1")});
    await depositTx.wait();
    expect(await bank.balanceOf(account1Address)).to.equal(ethers.utils.parseEther("1"));


    const transferTx = await bank.connect(account1).withdraw(ethers.utils.parseEther("1"));
    await transferTx.wait();
    expect(await bank.balanceOf(account1Address)).to.equal(ethers.utils.parseEther("0"));
  });

  it("Transfer balance from account", async function () {
    const depositTx  = await bank.deposit({from:account1Address,value:ethers.utils.parseEther("1")});
    await depositTx.wait();
    expect(await bank.balanceOf(account1Address)).to.equal(ethers.utils.parseEther("1"));


    const transferTx = await bank.transferAmount(account2Address,ethers.utils.parseEther("1"));
    await transferTx.wait();

    expect(await bank.balanceOf(account1Address)).to.equal(ethers.utils.parseEther("0"));
    expect(await bank.balanceOf(account2Address)).to.equal(ethers.utils.parseEther("1"));
  });


});
