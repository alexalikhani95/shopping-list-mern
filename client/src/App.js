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
          placeholder="Item name"
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

      <div className="listOfProducts">
        {itemsList.map((item) => {
          return (
            <div key={item.name + 1} className="product">
              <h3>Item name: {item.name}</h3><h3>Price £{item.price}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
