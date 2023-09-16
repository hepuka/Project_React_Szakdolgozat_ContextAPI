import "./Placeorder.scss";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useEffect, useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import Notiflix from "notiflix";

const Placeorder = () => {
  const { id } = useParams();
  const [{ userName, tempProducts, selectedproduct }, dispatch] =
    useStateValue();
  const products = useFetchCollection("kunpaosproducts");
  const [count, setCount] = useState(1);
  const tableOrders = useFetchCollection(`tableorders_${id}`);

  let summ = 0;
  tableOrders.map((item) => {
    summ += item.sum;
  });

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

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increase = () => {
    setCount(count + 1);
  };

  const addToOrder = () => {
    try {
      addDoc(collection(db, `tableorders_${id}`), {
        name: selectedproduct.name,
        price: selectedproduct.price,
        category: selectedproduct.category,
        packaging: selectedproduct.packaging,
        amount: count,
        sum: count * selectedproduct.price,
        tableNumber: Number(id),
        createdAt: Timestamp.now().toDate(),
      });

      Notiflix.Notify.success("Rendelés hozzáadva!");
    } catch (error) {
      Notiflix.Notify.failure(error.message);
    }
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
          <div className="placeorder__tableproductsCardList">
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
        </div>
        <div className="placeorder__card placeorder__tableproductdetailsContainer">
          <div className="placeorder__tableproductdetails">
            {selectedproduct && (
              <>
                <div className="placeorder__tableproductdetailsdata">
                  <h2>Név: {selectedproduct.name}</h2>
                  <h2>Kategória: {selectedproduct.category}</h2>
                  <h2>Kiszerelés: {selectedproduct.packaging}</h2>
                  <h2>Egységár: {selectedproduct.price}</h2>
                </div>
                <div className="placeorder__tableproductdetailssettings">
                  <div className="placeorder__amountsettings">
                    <div className="placeorder__set" onClick={decrease}>
                      -
                    </div>
                    <div>{count}</div>
                    <div className="placeorder__set" onClick={increase}>
                      +
                    </div>
                  </div>
                  <div>
                    <button
                      className="placeorder__setbutton"
                      onClick={() => addToOrder()}
                    >
                      Hozzáad
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="placeorder__card placeorder__tableorders">
          {tableOrders.map((item) => {
            return (
              <>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.category}</p>
                <p>{item.packaging}</p>
                <p>{item.amount}</p>
                <p>{item.sum}</p>
              </>
            );
          })}
        </div>
        <div className="placeorder__card placeorder__tablepayment">
          Végösszeg: {summ}
        </div>
      </div>
    </Layout>
  );
};

export default Placeorder;
