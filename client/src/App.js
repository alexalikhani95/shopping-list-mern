import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [itemsList, setItemsList] = useState([]);

  const addProduct = () => {
    // Set the items list to an array with the existing list of items + the new created item
    //This helps display newly added product on page without having to refresh
    Axios.post("http://localhost:5000/addproduct", { name: name, price: price }).then((response) => {
      setItemsList([...itemsList, { _id: response.data._id, name: name, price: price }]);
    });
  };

  const updateProduct = (id) => {
    const newPrice = prompt("Enter new price: ");

    Axios.put("http://localhost:5000/update", { newPrice: newPrice, id: id }).then(() => {
      setItemsList(
        itemsList.map((item) => {
          return item._id === id ? { _id: id, name: item.name, price: newPrice } : item;
        })
      );
    });
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then(
      () => {
        setItemsList(
          itemsList.filter((item) => {
            return item._id !== id;
          })
        );
      }
    );
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
            <div className="productContainer">
              <div key={item.name + 1} className="product">
                <h3>Item name: {item.name}</h3>
                <h3>Price £{item.price}</h3>
              </div>
              <button
                onClick={() => {
                  updateProduct(item._id);
                }}
              >
                Update
              </button>
              <button
                id="removeBtn"
                onClick={() => {
                  deleteProduct(item._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
