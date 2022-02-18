import React from "react";
import ReactDOM from "react-dom";
import Form  from "../vote/Form";
import Login  from "../Login";
import FocusTrap from "focus-trap-react";


export const Modal = ({
  onClickOutside,
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal,
  name,
  id,
}) => {
  

  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
  const lastItem = getLastItem(`${window.location.href}`);

  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className="modal-cover"
        onClick={onClickOutside}
        onKeyDown={onKeyDown}
      >
        <div className="modal-area" ref={modalRef}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          
          { (lastItem && lastItem ==="vote") && (
          <div className="modal-body">
            <Form driver_name={name} id={id} closeModal={closeModal} />
          </div>
          )}

          { (lastItem && lastItem ==="login") && (
          <div className="modal-body">
            <Login closeModal={closeModal} />
          </div>
          )}

        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};
export default Modal;
