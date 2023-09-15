import React from "react";
import "./Placeorder.scss";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";

const Placeorder = () => {
  const { id } = useParams();
  return (
    <Layout>
      <h1>PLACE ORDER</h1>
      <h1>{id}</h1>
    </Layout>
  );
};

export default Placeorder;
