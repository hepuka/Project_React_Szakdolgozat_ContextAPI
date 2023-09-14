import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import "./OrderDetails.scss";

const OrderDetails = () => {
  const { id } = useParams();
  const [{ orders }] = useStateValue();
  const order = orders.find((item) => item.id === id);

  console.log(orders);
  console.log(order);

  return (
    <Layout>
      <div className="orderDetails">
        <h1>Megrendelés részletei</h1>

        <div className="orderDetails__card">
          <div className="orderDetails__rows">
            <p>Megrendelés azonosító:</p> <span>{order.id}</span>
          </div>
          <div className="orderDetails__rows">
            <p>Rendelés összege:</p> <span>{order.orderAmount} Ft</span>
          </div>
          <div className="orderDetails__rows">
            <p>Rendelés állapota:</p> <span>{order.orderStatus}</span>
          </div>

          <div className="orderDetails__details">
            <table>
              <thead>
                <tr>
                  <th>Sorszám</th>
                  <th>Termék neve</th>
                  <th>Egységár (Ft)</th>
                  <th>Mennyiség</th>
                  <th>Végösszeg</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="orderDetails__buttons">
            <Link to="/orders">
              <button id="update">Vissza</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
