import './Header.css';

function Header() {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return (
    <h1>
      COVID-19 Real Time {year}.{month}.{date}
    </h1>
  );
}

export default Header;