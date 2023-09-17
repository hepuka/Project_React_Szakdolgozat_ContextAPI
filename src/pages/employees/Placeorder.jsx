import "./Placeorder.scss";
import Layout from "../../components/Layout";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useState } from "react";
import {
  addDoc,
  collection,
  Timestamp,
  deleteDoc,
  doc,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import Notiflix from "notiflix";

const Placeorder = () => {
  const { id } = useParams();
  const [{ user, userName, tempProducts, selectedproduct }, dispatch] =
    useStateValue();
  const products = useFetchCollection("kunpaosproducts");
  const [count, setCount] = useState(1);
  let tableOrders = useFetchCollection(`tableorders_${id}`);
  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();

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

      setCount(1);

      Notiflix.Notify.success("Rendelés hozzáadva!");
    } catch (error) {
      Notiflix.Notify.failure(error.message);
    }
  };

  const orderConfig = {
    user: user.email,
    username: userName,
    orderDate: date,
    orderTime: time,
    orderAmount: summ * 1.05,
    orderStatus: "Fizetve",
    tablenumber: id,
    cartItems: tableOrders,
    createdAt: Timestamp.now().toDate(),
  };

  const saveOrder = async () => {
    try {
      addDoc(collection(db, "kunpaosorders"), orderConfig);

      const docRef = query(collection(db, `tableorders_${id}`));
      const toDelete = await getDocs(docRef);

      toDelete.forEach((item) => {
        const ID = item.id;
        deleteDoc(doc(db, `tableorders_${id}`, ID));
      });

      Notiflix.Notify.success("Megrendelés leadva");
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
                  <h2>Egységár: {selectedproduct.price} Ft</h2>
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
          <div className="placeorder__tableordersdetails">
            <div className="placeorder__tableordersdetailsimg">
              <img
                src="https://freesvg.org/img/1667812423coffee-shop-logo-concept.png"
                alt="coffe_logo"
              />
            </div>
            <div className="placeorder__tableordersdetailstitle">
              <h2>KunPao's Coffee Management</h2>
            </div>
            <div className="placeorder__tableordersdetailstable">
              <table>
                <thead>
                  <tr>
                    <th>Megnevezés</th>
                    <th>Egységár (Ft)</th>
                    <th>Menny. (db)</th>
                    <th>Összeg (Ft)</th>
                  </tr>
                </thead>
                <tbody>
                  {tableOrders.map((item) => {
                    return (
                      <tr key={item.createdAt}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.amount}</td>
                        <td>{item.sum}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="placeorder__card placeorder__tablepayment">
          <div className="placeorder__tablepaymentdetails">
            <h2>
              Összeg: <span>{summ} Ft</span>
            </h2>
            <h2>
              Adó: <span>5%</span>
            </h2>
            <h2>
              Végösszeg: <span>{summ * 1.05} Ft</span>
            </h2>
          </div>
          <div className="placeorder__tablepayment__button" onClick={saveOrder}>
            <Link to="/main">
              <button>Fizetés</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Placeorder;
