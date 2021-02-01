import numeral from "numeral";

const formatNumber = (data) =>
  data ? `+ ${numeral(data).format("0.0a")}` : "+ 0";

export default formatNumber;


