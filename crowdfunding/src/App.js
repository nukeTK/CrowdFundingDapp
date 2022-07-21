import "./App.css";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contract from "./artifacts/contracts/Crowdfunding.sol/Crowdfunding.json";
import Metamask from "./components/Metamask";
import { SetDeadline } from "./components/SetDeadline";
import Postpetiiton from "./components/Postpetiiton";
import { Button, Tab, Tabs, Alert } from "react-bootstrap";
import Petitionslist from "./components/Petitionslist";
import logo from "./images/logo.png";

const contractAddress = "0x9EA36458e452698F040F893F485De81187e84Dae";
const App = () => {

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [web3, setWeb3] = useState({
    provider: "",
    contract: "",
    signer: "",
  });
  const [walletPage, setWalletPage] = useState(false);
  const [deadlines, setDeadlines] = useState({
    totalFundNeed: "",
    deadlineTime: "",
  });
  const [petitions, setPetitions] = useState({
    petitionName: "",
    amountNeed: "",
    recipientAddress: "",
    isFullfilled: "",
  });
  const [listPetition, setListPetition] = useState([]);
  const [page, setPage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [account, setAccount] = useState("");
  const [raiedAmount, SetRaisedAmount] = useState();
  const walletConnect = async () => {
    if (typeof window.ethereum == "undefined") {
      setWalletPage(true);
    } else {
      try {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        if (_provider) {
          await _provider.send("eth_requestAccounts", []);
          const _signer = _provider.getSigner();
          const acc = await _signer.getAddress();
          setAccount(acc);
          const fundingContract = new ethers.Contract(
            contractAddress,
            contract.abi,
            _provider
          );
          setWeb3({
            provider: _provider,
            contract: fundingContract,
            signer: _signer,
          });
          setPage(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  //checking contract balance Start!!
  useEffect(() => {
    const checkBalance = async () => {
      const balance = await web3.provider.getBalance(
        "0x9EA36458e452698F040F893F485De81187e84Dae"
      );
      SetRaisedAmount(parseInt(balance));
    };
    web3.contract && checkBalance();
  }, [web3.contract, refresh]);
  //Checking Contract Balance End

  //Total amount need and deadline time start
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeadlines((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const setDeadlineTime = async (e) => {
    e.preventDefault();
    try {
      const { totalFundNeed, deadlineTime } = deadlines;
      const contractInstance = web3.contract.connect(web3.signer);
      await contractInstance.setFundTime(totalFundNeed, deadlineTime);
      setTimeout(() => {
        setDeadlines({totalFundNeed:"",deadlineTime:""})
      }, 15000);
    } catch (error) {
      setShow1(!show1);
      console.log(error);
    }
  };
  //Total amount need and deadline time end

  //Post the Petition start
  const handlePetition = (event) => {
    const { name, value } = event.target;
    setPetitions((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const petitionPost = async (event) => {
    event.preventDefault();
    try {
      const { petitionName, amountNeed, recipientAddress } = petitions;
      const contractInstance = await web3.contract.connect(web3.signer);
      await contractInstance.setPetition(
        petitionName,
        amountNeed,
        recipientAddress
      );

      setTimeout(() => {
        setPetitions({petitionName:"", amountNeed:"", recipientAddress:""})
        setRefresh(!refresh);
      }, 20000);
    } catch (error) {
      setShow2(!show2);
      console.log(error);
    }
  };
  //Post the Petition end

  //Vote For Favour start
  const voteFavour = async (index) => {
    try {
      const contractInstance = await web3.contract.connect(web3.signer);
      const add = await web3.signer.getAddress();
      await contractInstance.votePetition(index, {
        from: add,
      });
      setTimeout(() => {
        setRefresh(!refresh);
      }, 15000);
    } catch (error) {
      setShow3(!show3);
      console.log(error);
    }
  };

  //Vote For Favour end

  //Paid Recipient
  const paid = async (index) => {
    try {
      const contractInstance = await web3.contract.connect(web3.signer);
      const success = await contractInstance.payRecipient(index);
      console.log(success);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 15000);
    } catch (error) {
      setShow3(!show3);
      console.log(error);
    }
  };

  //useffectforaccount start

  useEffect(() => {
    window.ethereum.on("accountsChanged", async (acc) => {
      if (acc.length === 0) console.log("please connect to accounts");
      else if (acc[0] !== account) setAccount(acc[0]);
    });
  }, [account]);

  //useeffect for account End

  //Crowd Funding start
  const crowdFund = async () => {
    const contractInstance = web3.contract.connect(web3.signer);
    await contractInstance.fundPetitions({
      value: ethers.utils.parseEther("0.01"),
    });
    setTimeout(() => {
      setRefresh(!refresh);
    }, 15000);
  };
  //Crowd Funding end

  //Refund Start
  const crowdRefund = async () => {
    try {
      const contractInstance = await web3.contract.connect(web3.signer);
      await contractInstance.refund();
    } catch (error) {
      setShow4(!show4);
      console.log(error);
    }
  };
  //Refund Ends

  //refreshing Petition List start
  useEffect(() => {
    const retrivePetition = async () => {
      const totalPetition = await web3.contract.totalPetitions();
      for (let i = 0; i < parseInt(totalPetition); i++) {
        const dataPetition = await web3.contract.petition(i);
        if (dataPetition.name !== "undefined") {
          const success = listPetition.find(
            (data) => data.PetitionName === dataPetition.name
          );
          if (!success && !dataPetition.isFullfilled) {
            setListPetition((prevState) => [
              ...prevState,
              {
                PetitionName: dataPetition.name,
                AmountNeed: parseInt(dataPetition.amountNeeded),
                RecipientAddress: dataPetition.recipient,
                IsFullfilled: dataPetition.isFullfilled,
              },
            ]);
          }
        }
      }
    };
    web3.contract && retrivePetition();
  }, [web3.contract, refresh]);
  //refreshing Petition List end
  return (
    <main className="App">
      {!page && (
        <Metamask walletPage={walletPage} walletConnect={walletConnect} />
      )}
      {page && (
        <Tabs
          defaultActiveKey="first"
          transition={true}
          id="noanim-tab-example"
          className="mb-2 tabs"
        >
          <Tab eventKey="first" title="Set Deadlines" className="tabtitle">
            <SetDeadline
              handleChange={handleChange}
              totalFundNeed={deadlines.totalFundNeed}
              deadlineTime={deadlines.deadlineTime}
              setDeadlineTime={setDeadlineTime}
              show={show1}
              setShow={setShow1}
              
            />
          </Tab>
          <Tab eventKey="Second" title="Post Peitions" className="tabtitle">
            <Postpetiiton
              petitionPost={petitionPost}
              handlePetition={handlePetition}
              petitionName={petitions.petitionName}
              amountNeed={petitions.amountNeed}
              recipientAddress={petitions.recipientAddress}
              show={show2}
              setShow={setShow2}

            />
          </Tab>
          <Tab eventKey="third" title="Peitions" className="tabtitle">
            {listPetition.length > 0 ? (
              <Petitionslist
                listPetition={listPetition}
                Paid={paid}
                voteFavour={voteFavour}
                show={show3}
                setShow={setShow3}
              />
            ) : (
              <Button className="finalbutton">NO PETITION</Button>
            )}
          </Tab>
          <Tab eventKey="fourth" title="Funders Section" className="tabtitle">
            {listPetition.length > 0 ? (
              <div className="container3">
                <img src={logo} alt="logo" />
                <p className="add">Current User: {account}</p>

                <h3 className="amount">Raised Amount : {raiedAmount} Wei</h3>
                <Button
                  className="container3button"
                  onClick={() => crowdFund()}
                >
                  Fund
                </Button>
                <p className="error">
                  Funders Can Take Out Money Only When Deadline Pass
                </p>
                <Button
                  variant="danger"
                  className="container3button"
                  onClick={() => crowdRefund()}
                >
                  Refund
                </Button>
                {show4 && (
                  <Alert
                    className="alert1"
                    variant="danger"
                    onClose={() => setShow4(false)}
                    dismissible
                  >
                    <Alert.Heading className="alertheading1">
                      Deadline Not Has Been Passed
                    </Alert.Heading>
                  </Alert>
                )}
              </div>
            ) : (
              <Button className="finalbutton">NOTHING HERE</Button>
            )}
          </Tab>
        </Tabs>
      )}
    </main>
  );
};

export default App;
