import React from "react";
import "./Tables.scss";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Tables = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/placeorder/${id}`);
  };

  return (
    <Layout>
      <div className="tables">
        <div className="tables__cardList">
          {Array(15)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="tables__card"
                onClick={() => handleClick(i + 1)}
              >
                {i + 1}. asztal
                <p>Szabad</p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tables;
