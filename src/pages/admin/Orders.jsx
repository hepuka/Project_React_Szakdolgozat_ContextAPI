import React, { useEffect } from "react";
import "./Orders.scss";
import Layout from "../../components/Layout";
import { useStateValue } from "../../ContextAPI/StateProvider";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [{ orders }, dispatch] = useStateValue();
  const data = useFetchCollection("kunpaosorders");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "STORE_ORDERS",
      orders: data,
    });
  }, [data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <Layout>
      <div className="orders">
        <h1>Összes megrendelés</h1>
        <h2>Válassz egy rendelést a részletek megtekintésére</h2>
        <div className="orders__cardlist">
          {data.length === 0 ? (
            <p>Nincs regisztrált megrendelés</p>
          ) : (
            data.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="orders__card"
                  onClick={() => handleClick(item.id)}
                >
                  <div className="orders__rows">
                    <p>Sorszám: </p> <span>{index + 1}</span>
                  </div>
                  <div className="orders__rows">
                    <p>Megrendelés: </p>
                    <span>
                      {item.orderDate}, {item.orderTime}
                    </span>
                  </div>
                  <div className="orders__rows">
                    <p>Rendelés végösszege: </p>
                    <span>{item.orderAmount} Ft</span>
                  </div>
                  <div className="orders__rows">
                    <p>Felszolgáló neve: </p>
                    <span>{item.userEmail}</span>
                  </div>
                  <div className="orders__rows">
                    <p>Rendelés állapota: </p>
                    <span
                      className={item.orderStatus === "Fizetve" ? "done" : ""}
                    >
                      {item.orderStatus}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
