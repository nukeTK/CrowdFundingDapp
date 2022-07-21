const { expect } = require("chai");

describe("Crowdfunding", () => {
  let contract;
  let contractdeploy;
  let addr1;
  let addr2;
  let addr3;
  let address;

  beforeEach(async () => {
    contract = await ethers.getContractFactory("Crowdfunding");
    [addr1, addr2, addr3, ...address] = await ethers.getSigners();
    contractdeploy = await contract.deploy();
  });
  describe("check manager", () => {
    it("Manager", async () => {
     expect(await contractdeploy.manager()).to.equal(addr1.address);
     expect()
    });
  });
  describe("check funds", () => {
    it("Raised and Time", async () => {
     await contractdeploy.setFundTime(100,3600);
     const raised=await contractdeploy.totalFundNeed();
     expect(raised).to.equal(100);
    });
  });
  describe("set values", () => {
    it("petitions", async () => {
     await contractdeploy.setPetition("Accident",5,addr2.address,0);
    });
  });
});
