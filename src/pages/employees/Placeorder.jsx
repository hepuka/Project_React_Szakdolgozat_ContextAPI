import React from "react";
import "./Placeorder.scss";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";

const Placeorder = () => {
  const { id } = useParams();
  return (
    <Layout>
      <div className="placeorder">
        <div className="placeorder__card placeorder__tablenumber">
          <h1>{id}. asztal</h1>
        </div>
        <div className="placeorder__card placeorder__tablebuttons"> </div>
        <div className="placeorder__card placeorder__tableproducts"> </div>
        <div className="placeorder__card placeorder__tableorders"> </div>
        <div className="placeorder__card placeorder__tablepayment"> </div>
      </div>
    </Layout>
  );
};

export default Placeorder;
