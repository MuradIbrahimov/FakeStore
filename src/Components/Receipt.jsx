function Receipt({ data, basket, money }) {
  return (
    <>
      <div className="receipt">
        <h1>Receipt</h1>
        {basket.map((a) => {
          let product = data.find((b) => b.id === a.id);
          return (
            <p title={product?.title}>{`${product?.title.slice(
              0,
              25
            )}... || * ${a.count} -------- ${product?.price * a.count}`}</p>
          );
        })}
        <h2>{`Total : ${money}`}</h2>
      </div>
    </>
  );
}

export default Receipt;
