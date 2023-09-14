import React, { useState } from "react";
import "./AddProducts.scss";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../firebase/config";
import Notiflix from "notiflix";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Layout from "../../components/Layout";

const categories = [
  { id: 1, name: "Kávé" },
  { id: 2, name: "Italok" },
  { id: 3, name: "Sütemények" },
];

const initialSate = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  packaging: "",
  desc: "",
};

const AddProducts = () => {
  const { id } = useParams();
  const [{ products }] = useStateValue();
  const productEdit = products.find((item) => item.id === id);
  console.log(products);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const detectForm = (id, f1, f2) => {
    if (id === "ADD") {
      return f1;
    } else {
      return f2;
    }
  };

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialSate }, productEdit);
    return newState;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `kunpaosCoffee/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        Notiflix.Notify.failure(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          Notiflix.Notify.success("Sikeres képfeltöltés!");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();

    try {
      addDoc(collection(db, "kunpaosproducts"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        packaging: product.packaging,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });

      setUploadProgress(0);
      setProduct({ ...initialSate });
      Notiflix.Notify.success("Sikeres termék feltöltés!");
      navigate("/products");
    } catch (error) {
      Notiflix.Notify.failure(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "kunpaosproducts", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        packaging: product.packaging,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });

      Notiflix.Notify.success("Termék adatai módosítva!");
      navigate("/products");
    } catch (error) {
      Notiflix.Notify.failure(error.message);
    }
  };

  return (
    <Layout>
      <div className="addProduct">
        <h1>
          {detectForm(
            id,
            "Új termék hozzáadása",
            "Termék adatainak módosítása"
          )}
        </h1>
        <form onSubmit={detectForm(id, addProduct, editProduct)}>
          <div className="addProduct__row">
            <div className="addProduct__box ">
              <label>Termék neve</label>
              <input
                type="text"
                required
                name="name"
                value={product.name}
                onChange={(e) => handleInputChange(e)}
              />

              <label>Kép hozzáadása</label>
              {uploadProgress === 0 ? null : (
                <div className="addProduct__progress">
                  <div
                    className="addProduct__progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Feltöltés folyamatban! ${uploadProgress}`
                      : `Sikeres képfeltöltés! ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  name="imageURL"
                  value={product.imageURL}
                  required
                  disabled
                />
              )}
            </div>
            <div className="addProduct__box ">
              <label>Egységár (Ft)</label>
              <input
                type="text"
                required
                name="price"
                value={product.price}
                onChange={(e) => handleInputChange(e)}
              />
              <label>Kategória</label>
              <select
                required
                name="category"
                value={product.category}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  -- Válassz kategóriát --
                </option>
                {categories.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="addProduct__box">
              {" "}
              <label>Mennyiség</label>
              <input
                type="text"
                required
                name="packaging"
                value={product.packaging}
                onChange={(e) => handleInputChange(e)}
              />
              <label>Termék leírása</label>
              <textarea
                name="desc"
                value={product.desc}
                required
                onChange={(e) => handleInputChange(e)}
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>

          <button type="submit" className="login__signInButton">
            {detectForm(id, "Hozzáad", "Módosít")}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProducts;
