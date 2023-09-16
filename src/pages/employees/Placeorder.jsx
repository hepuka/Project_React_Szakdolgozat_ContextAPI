import React, { useEffect, useState } from "react";
import "./Placeorder.scss";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import useFetchCollection from "../../customHooks/useFetchCollection";

const Placeorder = () => {
  const { id } = useParams();
  const [{ userName, tempProducts }, dispatch] = useStateValue();
  const products = useFetchCollection("kunpaosproducts");

  const allCategories = [
    "Összes",
    ...new Set(products.map((item) => item.category)),
  ];

  const filterProducts = (category) => {
    dispatch({
      type: "SET_CATEGORY",
      product: products,
      category: category,
    });
  };

  useEffect(() => {
    filterProducts();
  }, []);

  const selectedProduct = () => {};

  return (
    <Layout>
      <div className="placeorder">
        <div className="placeorder__card placeorder__tablenumber">
          <h1>{id}. asztal</h1>
          <h2>{userName}</h2>
        </div>

        <div className="placeorder__card placeorder__tablebuttons">
          <div className="sidebar__buttons">
            {allCategories.map((item, index) => {
              return (
                <div
                  className="sidebar__button"
                  key={index}
                  onClick={() => filterProducts(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className="placeorder__card placeorder__tableproducts">
          {tempProducts.map((item) => {
            return (
              <div onClick={selectedProduct}>
                <h2>Name: {item.name}</h2>
                <h2>Category: {item.category}</h2>
                <h2>Packaging: {item.packaging}</h2>
                <h2>Price: {item.price}</h2>
              </div>
            );
          })}
        </div>
        <div className="placeorder__card placeorder__tableorders"> </div>
        <div className="placeorder__card placeorder__tablepayment"> </div>
      </div>
    </Layout>
  );
};

export default Placeorder;
