export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <img src="/images/logo-hope.png" alt="Instituto Hope" className="footer__logo" />
            <p className="footer__tagline">Transformando sonhos em realidade.</p>
          </div>
          <div className="footer__info">
            <p><i className="fa-solid fa-map-pin" aria-hidden="true"></i> <a href="https://maps.app.goo.gl/Sb8LcMz8AycAtiup6" target="_blank" rel="noopener noreferrer">Rua Cristóvão Santos, Centro, Mãe do Rio, Pará</a></p>
            <p><i className="fa-brands fa-whatsapp" aria-hidden="true"></i> <a href="https://wa.me/5591986353844" target="_blank" rel="noopener noreferrer">(91) 98635-3844</a></p>
            <p><i className="fa-solid fa-envelope" aria-hidden="true"></i> institutohopemdr@gmail.com</p>
          </div>
          <div className="footer__social">
            <a href="https://www.instagram.com/institutohopemdr" target="_blank" rel="noopener noreferrer" aria-label="Instagram do Instituto Hope"><i className="fa-brands fa-instagram" aria-hidden="true"></i></a>
            <a href="https://www.facebook.com/people/Instituto-Hope-Educa%C3%A7%C3%A3o-Profissional/61556236223307/" target="_blank" rel="noopener noreferrer" aria-label="Facebook do Instituto Hope"><i className="fa-brands fa-facebook" aria-hidden="true"></i></a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2025 Instituto Hope. Todos os direitos reservados. | Programa social e educacional gratuito.</p>
        </div>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <a
        href="https://wa.me/5591986353844?text=Ol%C3%A1!%20Quero%20me%20inscrever%20no%20Primeiro%20Emprego%20Hope."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
        <span>Fale conosco</span>
      </a>
    </>
  )
}
