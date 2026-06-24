export default function Journey() {
  function scrollTo(id) {
    return (e) => {
      e.preventDefault()
      const target = document.querySelector(id)
      if (!target) return
      const offset = document.querySelector('.header')?.offsetHeight || 64
      window.scrollTo({ top: target.offsetTop - offset - 16, behavior: 'smooth' })
    }
  }

  return (
    <section className="section journey">
      <div className="container">
        <p className="section-eyebrow">Como funciona</p>
        <h2 className="section-title">Veja como funciona o programa em <span className="text-teal">4 passos</span></h2>

        <div className="steps">
          <div className="step">
            <div className="step__num">1</div>
            <div className="step__icon"><i className="fa-solid fa-clipboard-list" aria-hidden="true"></i></div>
            <h3>Inscrição</h3>
            <p>Preencha o formulário. É rápido, gratuito e sem burocracia.</p>
          </div>
          <div className="step__arrow" aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="step">
            <div className="step__num">2</div>
            <div className="step__icon"><i className="fa-solid fa-magnifying-glass-chart" aria-hidden="true"></i></div>
            <h3>Avaliação</h3>
            <p>Nossa equipe faz um diagnóstico profissional personalizado para você.</p>
          </div>
          <div className="step__arrow" aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="step">
            <div className="step__num">3</div>
            <div className="step__icon"><i className="fa-solid fa-people-group" aria-hidden="true"></i></div>
            <h3>Workshop</h3>
            <p>Participe do treinamento presencial com orientações reais do mercado.</p>
          </div>
          <div className="step__arrow" aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="step">
            <div className="step__num">4</div>
            <div className="step__icon"><i className="fa-solid fa-medal" aria-hidden="true"></i></div>
            <h3>Certificação</h3>
            <p>Receba seu certificado e saia pronto para o mercado de trabalho.</p>
          </div>
        </div>

        <div className="section__cta">
          <a href="#inscricao" className="btn btn--primary" onClick={scrollTo('#inscricao')}>Quero começar agora</a>
        </div>
      </div>
    </section>
  )
}
