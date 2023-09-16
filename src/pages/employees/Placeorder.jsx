import React, { useEffect, useState } from "react";
import "./Placeorder.scss";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import useFetchCollection from "../../customHooks/useFetchCollection";

const Placeorder = () => {
  const { id } = useParams();
  const [{ userName, tempProducts, selectedproduct }, dispatch] =
    useStateValue();
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

  const selectedProduct = (item) => {
    dispatch({
      type: "SET_SELECTEDPRODUCT",
      selectedproduct: item,
    });
  };

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
              <div
                className="placeorder__tableproductsCard"
                key={item.id}
                onClick={() => selectedProduct(item)}
              >
                <h2>{item.name}</h2>
              </div>
            );
          })}
        </div>
        <div className="placeorder__card placeorder__tableproductdetails">
          {selectedproduct && (
            <div>
              <h2>Name: {selectedproduct.name}</h2>
              <h2>Category: {selectedproduct.category}</h2>
              <h2>Packaging: {selectedproduct.packaging}</h2>
              <h2>Price: {selectedproduct.price}</h2>
            </div>
          )}
        </div>
        <div className="placeorder__card placeorder__tableorders"> </div>
        <div className="placeorder__card placeorder__tablepayment"> </div>
      </div>
    </Layout>
  );
};

export default Placeorder;
