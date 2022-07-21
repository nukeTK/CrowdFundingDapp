
require("@nomiclabs/hardhat-waffle")
require("dotenv").config();
const {API_KEY,PRIVATE_KEY} = process.env;
module.exports = {
  solidity: "0.8.9",
  networks:{
    goerli:{
      url:`${API_KEY}`,
      accounts:[`0x${PRIVATE_KEY}`]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./crowdfunding/src/artifacts"
  },
};
