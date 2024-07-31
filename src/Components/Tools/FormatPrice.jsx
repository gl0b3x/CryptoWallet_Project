const FormatPrice = ({ price }) => {
  function formatPrice(price) {
    if (price >= 0.01) {
      return price
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else if (price >= 0.001) {
      return price.toFixed(3);
    } else if (price >= 0.0001) {
      return price.toFixed(4);
    } else if (price >= 0.000001) {
      return price.toFixed(6);
    } else {
      return price.toFixed(8);
    }
  }

  return <>{formatPrice(price)}</>;
};

export default FormatPrice;
