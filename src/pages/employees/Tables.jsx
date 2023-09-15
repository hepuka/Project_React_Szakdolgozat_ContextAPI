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
          {Array(10)
            .fill()
            .map((_, i) => (
              <div className="tables__card" onClick={() => handleClick(i + 1)}>
                {i + 1}. asztal
                <p>Szabad</p>
              </div>
            ))}
        </div>
        <div className="tables__companyDetails">
          <div className="tables__companylogo">
            <img
              src="https://freesvg.org/img/1667812423coffee-shop-logo-concept.png"
              alt="coffe_logo"
            />
          </div>
          <div className="tables__companydetails">
            <h1>KunPao's Coffee Management</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tables;
