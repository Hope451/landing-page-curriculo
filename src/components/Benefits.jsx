import { useEffect, useRef } from 'react'

export default function Benefits() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    sectionRef.current?.querySelectorAll('.benefit-item').forEach(el => {
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

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
    <section className="section section--alt benefits" id="beneficios" ref={sectionRef}>
      <div className="container">
        <p className="section-eyebrow">O que você vai receber</p>
        <h2 className="section-title">Tudo isso, <span className="text-teal">100% gratuito</span></h2>
        <p className="section-sub">Sem taxa de inscrição, sem mensalidade, sem custo oculto algum.</p>

        <div className="benefits__list">
          <div className="benefit-item">
            <div className="benefit-item__icon"><i className="fa-solid fa-user-tie" aria-hidden="true"></i></div>
            <div className="benefit-item__text">
              <h3>Avaliação Profissional Individual</h3>
              <p>Um especialista analisa seu perfil de forma personalizada e aponta pontos fortes e oportunidades de melhoria.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon"><i className="fa-solid fa-file-pen" aria-hidden="true"></i></div>
            <div className="benefit-item__text">
              <h3>Análise Completa do Currículo</h3>
              <p>Seu currículo será avaliado pelos mesmos critérios que os recrutadores usam no dia a dia.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon"><i className="fa-solid fa-file-circle-check" aria-hidden="true"></i></div>
            <div className="benefit-item__text">
              <h3>Modelo de Currículo Profissional</h3>
              <p>Você recebe um modelo atualizado e pronto para usar, feito para jovens em busca do primeiro emprego.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon"><i className="fa-solid fa-chalkboard-user" aria-hidden="true"></i></div>
            <div className="benefit-item__text">
              <h3>Workshop Presencial</h3>
              <p>Treinamento prático sobre mercado de trabalho, postura profissional e como se destacar em entrevistas.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-item__icon"><i className="fa-solid fa-award" aria-hidden="true"></i></div>
            <div className="benefit-item__text">
              <h3>Certificado de Participação</h3>
              <p>Ao concluir, você recebe um certificado do Instituto Hope para valorizar ainda mais o seu currículo.</p>
            </div>
          </div>
        </div>

        <div className="section__cta">
          <a href="#inscricao" className="btn btn--primary" onClick={scrollTo('#inscricao')}>Quero me inscrever gratuitamente</a>
        </div>
      </div>
    </section>
  )
}
