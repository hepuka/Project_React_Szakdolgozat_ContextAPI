import React from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "transparent",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "50%",
    transform: "translate(-50%, -50%)",
    height: "200px",
    width: "400px",
    textAlign: "center",
    borderRadius: "20px",
  },
};

const Modals = ({
  number,
  setModalIsOpen,
  modalIsOpen,
  handleClick,
  setModalInput,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles}
    >
      <div className="tables__modalContent">
        <h2>Add meg a személyes PIN kódot!</h2>
        <div>
          <input type="text" onChange={(e) => setModalInput(e.target.value)} />
        </div>
        <div>
          <button onClick={() => handleClick(number)}>Tovább</button>
        </div>
      </div>
    </Modal>
  );
};

export default Modals;
