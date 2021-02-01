import './Box.css';

function Box({ title, cases, total}) {
  return (
    <div className="box">
        <p> {title} </p>
        <h3>{total} Total</h3>
        <p className="case">{cases}</p>
    </div>
  );
}

export default Box;