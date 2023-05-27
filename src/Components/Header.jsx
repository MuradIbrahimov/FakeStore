import AnimatedNumber from "animated-number-react";
function Header({ totalMoney, totalSpend }) {
  let formatValue = (a) => a.toFixed(2);
  return (
    <header>
      $
      {
        <AnimatedNumber
          value={totalMoney - totalSpend}
          formatValue={formatValue}
          duration={250}
        />
      }
    </header>
  );
}

export default Header;
