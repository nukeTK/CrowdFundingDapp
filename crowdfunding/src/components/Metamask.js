import React from "react";
import { Button, Alert } from "react-bootstrap";
const Metamask = (prop) => {
  return (
    <div className="cont">
      <h2>CrowdFunding</h2>
      <h3 className="line">A Little Kindness Is What Everyone Needs</h3>
      <p>Connect yourself to the Decentralized Web</p>
      <Button className="metamask" onClick={prop.walletConnect}>
        Connect Your Wallet
      </Button>
      {prop.walletPage && (
        <div className="alertlink">
          Install Metamask 
          <Alert.Link className="link" href="https://metamask.io/download/">
            {" "}
            here
          </Alert.Link>
        </div>
      )}
    </div>
  );
};

export default Metamask;