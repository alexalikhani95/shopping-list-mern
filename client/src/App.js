import "./App.css";
import { useState } from "react";

const App = () => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);

  const addProduct = () => {
    alert(product + " " + price)
  }

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Product"
          onChange={(event) => {
            setProduct(event.target.value);
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
