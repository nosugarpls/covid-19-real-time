import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <p className="foot">Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
