import React, { useEffect, useState } from "react";
import "./Products.scss";
import Layout from "../../components/Layout";
import useFetchCollection from "../../customHooks/useFetchCollection";
import Search from "../../components/Search";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { OnlyAdmin } from "../../ContextAPI/OnlyAdmin";

const Products = () => {
  const [{ products }, dispatch] = useStateValue();
  const data = useFetchCollection("kunpaosproducts");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch({
      type: "STORE_PRODUCTS",
      products: data,
    });
  }, [data]);

  const filteredProducts = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Termék törlése!",
      "Valóban törölni akarja a terméket?",
      "Törlés",
      "Mégse",

      function okCb() {
        deleteProduct(id, imageURL);
      },

      function cancelCb() {
        console.log("Törlés elutasítva!");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "kunpaosproducts", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);

      Notiflix.Notify.success("Sikeres termék törlés!");
    } catch (error) {
      Notiflix.Notify.failure(error.message);
    }
  };

  return (
    <Layout>
      <div className="products">
        <h1>Termékek</h1>
        <div className="products__search">
          <h2>
            <span>{data.length}</span> darab termék a listában
          </h2>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="products__cardlist">
          {filteredProducts.length === 0 ? (
            <h2>Nem található termék.</h2>
          ) : (
            filteredProducts.map((item) => {
              return (
                <div key={item.id} className="products__card">
                  <div className="products__image">
                    <img src={item.imageURL} alt={"primage"} />
                  </div>

                  <div>
                    <div className="products__rows">
                      <p>Név:</p> <span>{item.name}</span>
                    </div>
                    <div className="products__rows">
                      <p>Kategória:</p> <span>{item.category}</span>
                    </div>
                    <div className="products__rows">
                      <p>Egységár:</p> <span>{item.price} Ft</span>
                    </div>
                    <div className="products__rows">
                      <p>Kiszerelés:</p> <span>{item.packaging}</span>
                    </div>
                    <div className="products__rows">
                      <p className="descinfo">Leírás: {item.desc}</p>
                    </div>
                  </div>
                  <OnlyAdmin>
                    <div className="products__buttons">
                      <Link to={`/add-product/${item.id}`}>
                        <button id="update">Módosít</button>
                      </Link>
                      <button
                        id="delete"
                        onClick={() => confirmDelete(item.id, item.imageURL)}
                      >
                        Töröl
                      </button>
                    </div>
                  </OnlyAdmin>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
