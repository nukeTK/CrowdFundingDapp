import React, { useState } from "react";
import { Button ,Badge,Alert} from "react-bootstrap";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import logo from '../images/logo.png'



const Petitionslist = (prop) => {
  const [index, setIndex] = useState(0);
  const { PetitionName, AmountNeed, RecipientAddress } =
    prop.listPetition[index];
  const moveRight = () => {
    if (index < prop.listPetition.length - 1) setIndex(index + 1);
    else setIndex(0);
  };
  const moveLeft = () => {
    if (index === 0) setIndex(prop.listPetition.length - 1);
    else setIndex(index - 1);
  };

  return (
    <main>
      <div className="container2">
      <img src={logo} alt="logo"/>
        <h4><Badge bg="secondary">Petition: {PetitionName}</Badge> </h4>
        <h5><Badge bg="secondary">Amount: {AmountNeed} Wei</Badge></h5>
        <h5><Badge bg="secondary">Address: {RecipientAddress}</Badge></h5>
       
        <Button variant="success" className="container2button" onClick={() => prop.Paid(index)}>
          Pay Recipient
        </Button>
        <Button
          className="container2button"
          onClick={() => prop.voteFavour(index)}
        >
          {" "}
          Vote For Recipient
        </Button>
        {prop.show && (
        <Alert className="alert1" variant="danger" onClose={() => prop.setShow(false)} dismissible>
          <Alert.Heading className="alertheading1">Sorry, Terms Not met</Alert.Heading>
        </Alert>
      )}
        <div className="icons">
          <button onClick={moveLeft}>
            <AiOutlineDoubleLeft />
          </button>
          <button onClick={moveRight}>
            <AiOutlineDoubleRight />
          </button>
        </div>
      </div>
    </main>
  );
};
export default Petitionslist;
