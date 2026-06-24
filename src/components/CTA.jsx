export default function CTA() {
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
    <>
      {/* PARA PAIS */}
      <section className="section section--navy parents">
        <div className="container parents__inner">
          <div className="parents__icon" aria-hidden="true"><i className="fa-solid fa-shield-halved"></i></div>
          <div className="parents__content">
            <h2>Uma mensagem para pais e responsáveis</h2>
            <p>
              O <strong>Programa Primeiro Emprego Hope</strong> é conduzido por profissionais capacitados.
              Nosso objetivo é preparar jovens de forma ética, segura e responsável. Não há nenhum
              custo — é uma iniciativa 100% social e educacional.
            </p>
            <ul className="parents__list">
              <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i> Ambiente seguro e supervisionado</li>
              <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i> Sem nenhum custo financeiro</li>
              <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i> Conduzido por educadores experientes</li>
              <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i> Certificado reconhecido pelo mercado</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section final-cta">
        <div className="container final-cta__inner">
          <h2>Não deixe para amanhã a oportunidade de hoje.</h2>
          <p>As vagas são limitadas. Garanta agora sua participação no <strong>Programa Primeiro Emprego Hope</strong> — gratuito e pode mudar o rumo da sua carreira.</p>
          <a href="#inscricao" className="btn btn--submit pulse" onClick={scrollTo('#inscricao')}>
            <i className="fa-solid fa-rocket" aria-hidden="true"></i> QUERO PARTICIPAR GRATUITAMENTE
          </a>
          <p className="final-cta__note">
            <i className="fa-solid fa-lock" aria-hidden="true"></i> 100% Gratuito · Sem taxa · Sem compromisso
          </p>
        </div>
      </section>
    </>
  )
}
