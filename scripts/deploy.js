const main=async()=>{
    const Contract = await ethers.getContractFactory("Crowdfunding");
    const contractDeploy = await Contract.deploy();
    console.log("Contract Address",contractDeploy.address);
}

main().then(()=>process.exit(0))
.catch((err)=>{
    console.log(err);
    process.exit(1);
});
