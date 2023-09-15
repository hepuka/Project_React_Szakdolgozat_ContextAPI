import React, { useState } from "react";
import "./Placeorder.scss";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { NavLink } from "react-router-dom";
import useFetchCollection from "../../customHooks/useFetchCollection";

const Placeorder = () => {
  const { id } = useParams();
  const [{ user, userName }] = useStateValue();
  const products = useFetchCollection("kunpaosproducts");
  const [category, setCategory] = useState("Összes");

  const allCategories = [
    "Összes",
    ...new Set(products.map((item) => item.category)),
  ];
  const filterProducts = (category) => {
    setCategory(category);

    // dispatch(FILTER_BY_CATEGORY({ products, category: category }));
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
                  type="button"
                  onClick={() => filterProducts(item)}
                >
                  {item}
                </div>
              );
            })}
            {/* <NavLink to="/" className={activeLink}>
              Összes
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Ital
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Gyümölcslevek
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Kávé
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Tea
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Sütemények
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Péksütemények
            </NavLink> */}
          </div>
        </div>
        <div className="placeorder__card placeorder__tableproducts"> </div>
        <div className="placeorder__card placeorder__tableorders"> </div>
        <div className="placeorder__card placeorder__tablepayment"> </div>
      </div>
    </Layout>
  );
};

export default Placeorder;
