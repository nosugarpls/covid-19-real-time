import './Card.css';
import Box from "./Box";
import formatNumber from "./util";
import numeral from "numeral";

function Card({countryInfo}) {
  return (
  <div className="container">
      <Box title="Coronavirus Cases" 
           cases={formatNumber(countryInfo.todayCases)}
           total={numeral(countryInfo.cases).format("0.0a")}
      />
      <Box title="Recovered Cases"
           cases={formatNumber(countryInfo.todayRecovered)}
           total={numeral(countryInfo.recovered).format("0.0a")}
      />
      <Box title="Death Cases"
           cases={formatNumber(countryInfo.todayDeaths)}
           total={numeral(countryInfo.deaths).format("0.0a")}
      />
    </div>
  );
}

export default Card;