import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Product from "./Components/Product";
import Receipt from "./Components/Receipt";
function App() {
  const totalMoney = 12000;
  const [products, Setproducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const total = basket
    .reduce(
      (acc, item) =>
        acc + products.find((a) => a.id === item.id).price * item.count,
      0
    )
    .toFixed(2);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=2")
      .then((a) => a.json())
      .then((a) => {
        Setproducts([...a]);
        setLoading(false);
      });
  }, []);

  const buyItem = (id) => {
    let check = basket.find((a) => a.id === id);
    if (check) {
      check.count++;
      setBasket([...basket]);

      return;
    }
    let temp = [...basket, { id: id, count: 1 }];
    setBasket(temp);
  };
  const sellItem = (id) => {
    let check = basket.find((a) => a.id === id);
    if (check === 0) {
      return;
    }
    if (check) {
      check.count--;
      setBasket([...basket]);
      return;
    }
    let temp = [...basket, { id: id, count: 1 }];
    setBasket(temp);
  };

  return (
    <>
      <Header totalMoney={totalMoney} totalSpend={total} />
      <section className="productContainer">
        {loading ? (
          <h1>Yuklenir</h1>
        ) : (
          products.map((a) => (
            <Product
              basket={basket}
              key={a.id}
              className="product"
              data={a}
              buyFunction={buyItem}
              sellFunction={sellItem}
            />
          ))
        )}
      </section>
      <Receipt data={products} basket={basket} money={totalMoney - total} />
    </>
  );
}

export default App;
