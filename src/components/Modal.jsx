import React from "react";
import "./Modal.scss";

const Modals = ({ number, handleClick, setModalInput, setModalIsOpen }) => {
  return (
    <div className="modal">
      <h2>Add meg a személyes PIN kódot!</h2>
      <div>
        <input type="text" onChange={(e) => setModalInput(e.target.value)} />
      </div>
      <div>
        <button id="signin" onClick={() => handleClick(number)}>
          Tovább
        </button>
        <button id="cancel" onClick={() => setModalIsOpen(false)}>
          Mégse
        </button>
      </div>
    </div>
  );
};

export default Modals;
