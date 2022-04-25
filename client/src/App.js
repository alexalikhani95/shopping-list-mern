import "./App.css";
import { useState } from "react";
import Axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const addProduct = () => {
    Axios.post("http://localhost:5000/addproduct", { name: name, price: price })
      .then(() => {
        alert("Product added!");
      })
      .catch(() => {
        alert("Product not added");
      });
  };

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Product name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="price"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />

        <button onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default App;
