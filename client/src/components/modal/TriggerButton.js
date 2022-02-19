import React from "react";
import { Nav} from "react-bootstrap";
const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <Nav.Link ref={buttonRef} onClick={showModal}>
      {triggerText}
    </Nav.Link>
  );
};
export default Trigger;
