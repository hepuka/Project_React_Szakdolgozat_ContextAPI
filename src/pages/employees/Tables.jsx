import React from "react";
import "./Tables.scss";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

const Tables = () => {
  return (
    <Layout>
      <div className="tables">
        <div className="tables__cardList">
          {Array(10)
            .fill()
            .map((_, i) => (
              <Link to={`/placeorder/${i + 1}`}>
                <div className="tables__card">
                  {i + 1}. asztal
                  <p>Szabad</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tables;
