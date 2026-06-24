import { useEffect, useRef } from 'react'

export default function Problems() {
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

    sectionRef.current?.querySelectorAll('.prob-card').forEach(el => {
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
    <section className="section problems" ref={sectionRef}>
      <div className="container">
        <p className="section-eyebrow">Você se identifica?</p>
        <h2 className="section-title">Essas situações são mais comuns do que você imagina</h2>

        <div className="problems__grid">
          <div className="prob-card">
            <div className="prob-card__icon"><i className="fa-solid fa-envelope-open-text" aria-hidden="true"></i></div>
            <p>Já entregou currículo em vários lugares e <strong>nunca foi chamado</strong></p>
          </div>
          <div className="prob-card">
            <div className="prob-card__icon"><i className="fa-solid fa-file-circle-question" aria-hidden="true"></i></div>
            <p>Não sabe se o seu currículo está <strong>bom o suficiente</strong></p>
          </div>
          <div className="prob-card">
            <div className="prob-card__icon"><i className="fa-solid fa-map-location-dot" aria-hidden="true"></i></div>
            <p>Não sabe <strong>por onde começar</strong> sua carreira profissional</p>
          </div>
          <div className="prob-card">
            <div className="prob-card__icon"><i className="fa-solid fa-face-grimace" aria-hidden="true"></i></div>
            <p>Tem medo ou insegurança na hora de <strong>uma entrevista</strong></p>
          </div>
          <div className="prob-card">
            <div className="prob-card__icon"><i className="fa-solid fa-briefcase" aria-hidden="true"></i></div>
            <p>Sente que a falta de experiência é <strong>um obstáculo</strong> intransponível</p>
          </div>
          <div className="prob-card">
            <div className="prob-card__icon"><i className="fa-solid fa-piggy-bank" aria-hidden="true"></i></div>
            <p>Quer conquistar <strong>independência financeira</strong> mas não sabe como começar</p>
          </div>
        </div>

        <div className="cta-bridge">
          <p>Se você marcou ao menos <strong>uma dessas situações</strong>, o Programa Primeiro Emprego Hope foi criado para você.</p>
          <a href="#inscricao" className="btn btn--primary" onClick={scrollTo('#inscricao')}>Quero resolver isso agora</a>
        </div>
      </div>
    </section>
  )
}
