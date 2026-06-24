export default function About() {
  return (
    <section className="section section--alt about">
      <div className="container about__grid">
        <div className="about__content">
          <p className="section-eyebrow">Quem somos</p>
          <h2 className="section-title section-title--left">
            O Instituto Hope: <span className="text-teal">preparando jovens</span> para o futuro
          </h2>
          <p className="about__text">
            O Instituto Hope é uma instituição de educação profissional comprometida com o
            desenvolvimento de jovens e a transformação de comunidades. Com estrutura completa,
            metodologia atualizada e professores experientes, formamos profissionais prontos
            para o mercado — e o programa Primeiro Emprego é nossa forma de abrir essas portas
            para quem está dando os primeiros passos.
          </p>
          <div className="about__features">
            <div className="about__feat">
              <i className="fa-solid fa-building-columns" aria-hidden="true"></i>
              <div>
                <strong>Estrutura Completa</strong>
                <span>Salas equipadas e ambientes modernos</span>
              </div>
            </div>
            <div className="about__feat">
              <i className="fa-solid fa-flask" aria-hidden="true"></i>
              <div>
                <strong>Laboratórios Práticos</strong>
                <span>Aprenda fazendo, do jeito certo</span>
              </div>
            </div>
            <div className="about__feat">
              <i className="fa-solid fa-book-open-reader" aria-hidden="true"></i>
              <div>
                <strong>Cursos Profissionalizantes</strong>
                <span>Formação reconhecida pelo mercado</span>
              </div>
            </div>
            <div className="about__feat">
              <i className="fa-solid fa-handshake-angle" aria-hidden="true"></i>
              <div>
                <strong>Suporte ao Aluno</strong>
                <span>Acompanhamento do início ao fim</span>
              </div>
            </div>
          </div>
        </div>
        <div className="about__visual">
          <div className="about__img-block">
            <i className="fa-solid fa-image" aria-hidden="true"></i>
            <p>Foto do Instituto Hope</p>
          </div>
        </div>
      </div>
    </section>
  )
}
