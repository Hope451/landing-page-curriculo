import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import Problems from '../components/Problems.jsx'
import Benefits from '../components/Benefits.jsx'
import Journey from '../components/Journey.jsx'
import About from '../components/About.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'

export default function Landing() {
  return (
    <>
      {/* BARRA DE URGÊNCIA */}
      <div className="urgency-bar" role="alert">
        <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
        Vagas limitadas — Inscrições podem ser encerradas a qualquer momento!
      </div>

      <Header />
      <Hero />
      <Problems />
      <Benefits />
      <Journey />
      <About />
      <CTA />
      <Footer />
    </>
  )
}
