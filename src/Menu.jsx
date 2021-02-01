import "./Menu.css";

function Menu({ countries, onClick }) {
  return (
    <div>
      <h4>Scroll & Click</h4>
      <ol className="menu" onClick={onClick}>
      { countries.map( country => 
      <li className="choice"
      data-name={country.name}>{country.name}</li>) }
      </ol>    
    </div>
  );
}

export default Menu;