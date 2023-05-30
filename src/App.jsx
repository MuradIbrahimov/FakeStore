import { useState, useEffect, useRef } from "react";
import Header from "./Components/Header";
import Product from "./Components/Product";
import Receipt from "./Components/Receipt";
function App() {
  const totalMoney = 12000;
  const [products, Setproducts] = useState([]);
  let temp = localStorage.getItem("basket");
  const [basket, setBasket] = useState(temp ? JSON.parse(temp) : []);
  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState(true);
  const total = basket
    .reduce(
      (acc, item) =>
        acc + products.find((a) => a.id === item.id)?.price * item.count,
      0
    )
    .toFixed(2);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((a) => a.json())
      .then((a) => {
        Setproducts([...a]);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

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
    console.log(check);
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

  // const [searchValue, setSearchValue] = useState("");
  // console.log(searchValue);

  // let [filteredProducts, setFilteredProducts] = products.filter((a) =>
  //   a.title.includes(search.current?.value)
  // );
  return (
    <>
      <Header totalMoney={totalMoney} totalSpend={total} />
      <div className="stylingBtn">
        <input
          onClick={(e) => setSearchValue(e.target.value)}
          type="text"
          className="search"
          placeholder="Search..."
        />
        <button onClick={() => setGrid(!grid)} className="gridButton">
          {grid ? "List" : "Grid"}
        </button>
      </div>
      <section className={`productContainer ${grid ? "grid" : "list"}`}>
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
              total={totalMoney - total}
            />
          ))
        )}
      </section>
      <Receipt data={products} basket={basket} money={total} />
    </>
  );
}

export default App;
