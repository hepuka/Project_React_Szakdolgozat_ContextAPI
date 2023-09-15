import React from "react";
import "./Placeorder.scss";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";

const Placeorder = () => {
  const { id } = useParams();
  const [{ user, userName }] = useStateValue();
  return (
    <Layout>
      <div className="placeorder">
        <div className="placeorder__card placeorder__tablenumber">
          <h1>{id}. asztal</h1>
          <h2>{userName}</h2>
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
