import React from "react";
import { Form, Button,Alert} from "react-bootstrap";
import manager from "../images/manager.png";
const Postpetiiton = (prop) => {
  return (
    <div className="container1">
      <div className="manager">
        <img src={manager} alt="manager"/>
      </div>
      <h3>Manager</h3>
      <p>0x5b9dC6b27F0AC5A3C69CA386CA0B7ABae662474a</p>
    <Form  onSubmit={prop.petitionPost}>
    <Form.Floating className="mb-3 form1" >
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="text"
          name="petitionName"
          value={prop.petitionName}
          onChange={prop.handlePetition}
          required
        />
        <label htmlFor="floatingInputCustom">Petition Name</label>
        </Form.Floating>
        <Form.Floating className="mb-3 form1" >
        <Form.Control
          id="floatingInputCustom"
          type="number"
          placeholder="Number"
          name="amountNeed"
          value={prop.amountNeed}
          onChange={prop.handlePetition}
          required
        />
        <label htmlFor="floatingInputCustom">Amount Need</label>
        </Form.Floating>
        <Form.Floating className="mb-3 form1" >
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="text"
          name="recipientAddress"
          value={prop.recipientAddress}
          onChange={prop.handlePetition}
          required
        />
        <label htmlFor="floatingInputCustom">Recipient Address</label>
        </Form.Floating>
      <Button  className="container1button" type="submit">Submit</Button>
    </Form>
    {prop.show && (
        <Alert
          className="alert1"
          variant="danger"
          onClose={() => prop.setShow(false)}
          dismissible
        >
          <Alert.Heading className="alertheading1">Manager Privilege Required</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default Postpetiiton;
