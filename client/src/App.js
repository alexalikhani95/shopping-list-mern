import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [itemsList, setItemsList] = useState([]);

  const addProduct = () => {
    Axios.post("http://localhost:5000/addproduct", { name: name, price: price });
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/read")
      .then((response) => {
        setItemsList(response.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

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
      {itemsList.map((item) => {
        return (
          <div key={item.name + 1}>
            {item.name} {item.price}
          </div>
        );
      })}
    </div>
  );
};

export default App;
