import React, { useState } from "react";
import "./Tables.scss";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import Modals from "../../components/Modal";

const Tables = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [modalInput, setModalInput] = useState(0);
  const [{ userPin }, dispatch] = useStateValue();
  const [tablenumber, setTableNumber] = useState(0);

  const handleClick = (id) => {
    if (modalInput === userPin) {
      navigate(`/placeorder/${id}`);
      setModalIsOpen(false);
    }
  };

  return (
    <Layout>
      <div className="tables">
        <div className="tables__cardList">
          {Array(15)
            .fill()
            .map((_, i) => (
              <>
                <div
                  key={i}
                  className="tables__card"
                  onClick={() => {
                    setModalIsOpen(true);
                    setTableNumber(i + 1);
                  }}
                >
                  {i + 1}. asztal
                  <p>Szabad</p>
                </div>
              </>
            ))}
          <Modals
            number={tablenumber}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            handleClick={handleClick}
            setModalInput={setModalInput}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Tables;
