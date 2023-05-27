function Receipt({ data, basket, money }) {
  let check = basket.find((a) => a.id === data.id);

  return (
    <>
      <div className="receipt">
        <h1>Receipt</h1>
        {check ? data.map((a) => <p>{a.title}</p>) : null}
      </div>
    </>
  );
}

export default Receipt;
