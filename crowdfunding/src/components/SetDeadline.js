import React from "react";
import { Button, Form, Alert } from "react-bootstrap";
import manager from "../images/manager.png";

export const SetDeadline = (props) => {
  return (
    <div className="container1">
      <div className="manager">
        <img src={manager} alt="manager" />
      </div>
      <h3>Manager</h3>
      <p>0x5b9dC6b27F0AC5A3C69CA386CA0B7ABae662474a</p>
      <form onSubmit={props.setDeadlineTime}>
        <Form.Floating className="mb-3 form1">
          <Form.Control
            id="floatingInputCustom"
            name="totalFundNeed"
            type="number"
            placeholder="number"
            value={props.totalFundNeed}
            onChange={props.handleChange}
            required
          />

          <label htmlFor="floatingInputCustom">Total Fund Need(Wei)</label>
        </Form.Floating>

        <Form.Floating className="mb-3 form1">
          <Form.Control
            id="floatingInputCustom"
            name="deadlineTime"
            type="number"
            placeholder="number"
            value={props.deadlineTime}
            onChange={props.handleChange}
            required
          />
          <label htmlFor="floatingInputCustom">
            Deadline Time(UnixTimeStamp)
          </label>
        </Form.Floating>
        <Button className="container1button" type="submit">
          Submit
        </Button>
      </form>
      {props.show && (
        <Alert
          className="alert1"
          variant="danger"
          onClose={() => props.setShow(false)}
          dismissible
        >
          <Alert.Heading className="alertheading1">Manager Privilege Required</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};
