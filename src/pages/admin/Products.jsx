import React, { useState } from "react";
import "./Products.scss";
import Layout from "../../components/Layout";
import useFetchCollection from "../../customHooks/useFetchCollection";
import Search from "../../components/Search";

const Products = () => {
  const { data } = useFetchCollection("kunpaosproducts");
  const [search, setSearch] = useState("");

  const filteredProducts = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  console.log(filteredProducts);

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
            <p>No product found.</p>
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
