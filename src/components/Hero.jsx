import { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { uploadCurriculo } from '../lib/storage.js'

function maskPhone(value) {
  let v = value.replace(/\D/g, '')
  if (v.length > 11) v = v.slice(0, 11)
  if (v.length <= 10) {
    v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  } else {
    v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }
  return v.replace(/-$/, '')
}

export default function Hero() {
  const [fields, setFields] = useState({ nome: '', whatsapp: '', email: '', idade: '', cidade: '' })
  const [curriculo, setCurriculo] = useState(null)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [btnLabel, setBtnLabel] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'whatsapp') {
      setFields(f => ({ ...f, whatsapp: maskPhone(value) }))
    } else {
      setFields(f => ({ ...f, [name]: value }))
    }
    setErrors(err => ({ ...err, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!fields.nome || fields.nome.trim().length < 3) errs.nome = 'Por favor, informe seu nome completo.'
    const phone = fields.whatsapp.replace(/\D/g, '')
    if (!phone || phone.length < 10) errs.whatsapp = 'Informe um número de WhatsApp válido.'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!fields.email || !emailRegex.test(fields.email.trim())) errs.email = 'Informe um e-mail válido.'
    const age = parseInt(fields.idade, 10)
    if (!fields.idade || isNaN(age) || age < 1) errs.idade = 'Informe uma idade válida.'
    if (!fields.cidade || fields.cidade.trim().length < 2) errs.cidade = 'Por favor, informe sua cidade.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setBtnLabel('Enviando...')

    try {
      let curriculo_url = null
      if (curriculo) {
        setBtnLabel('Enviando currículo...')
        curriculo_url = await uploadCurriculo(curriculo, fields.nome)
        setBtnLabel('Salvando inscrição...')
      }

      const { error } = await supabase.from('inscricoes').insert({
        nome:          fields.nome.trim(),
        whatsapp:      fields.whatsapp.trim(),
        email:         fields.email.trim(),
        idade:         Number(fields.idade),
        cidade:        fields.cidade.trim(),
        curriculo_url: curriculo_url,
      })

      if (error) throw new Error(error.message)

      setSuccess(true)
      document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth', block: 'center' })

      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Programa Primeiro Emprego Hope',
          content_category: 'Cadastro',
        });
        console.log('✅ Evento Lead enviado para o Meta Pixel');
      } else {
        console.warn('⚠️ Meta Pixel não encontrado no momento do envio');
      }


    } catch (err) {
      console.error('Erro no envio:', err.message)
      alert('Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.')
    } finally {
      setLoading(false)
      setBtnLabel(null)
    }
  }

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
    <section className="hero">
      <div className="container hero__grid">

        <div className="hero__content">
          <h1 className="hero__title">
            Transforme seu currículo e conquiste seu <span className="text-teal">primeiro emprego</span>
          </h1>
          <p className="hero__sub">
            O <strong>Programa Primeiro Emprego Hope</strong> oferece avaliação profissional do currículo,
            workshop presencial e certificado — tudo de graça.
          </p>

          <ul className="check-list">
            <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i> Avaliação individual do currículo</li>
            <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i> Diagnóstico profissional personalizado</li>
            <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i> Modelo de currículo profissional</li>
            <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i> Workshop presencial sobre mercado de trabalho</li>
            <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i> Certificado de participação</li>
          </ul>

          <div className="hero__stats">
            <div className="stat">
              <strong>+500</strong>
              <span>jovens atendidos</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <strong>100%</strong>
              <span>gratuito</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <strong>5</strong>
              <span>benefícios incluídos</span>
            </div>
          </div>
        </div>

        {/* FORMULÁRIO NO HERO */}
        <div className="hero__form-card" id="inscricao">
          <div className="form-card__top">
            <i className="fa-solid fa-rocket" aria-hidden="true"></i>
            <div>
              <strong>Inscrição Gratuita</strong>
              <span>Programa Primeiro Emprego Hope</span>
            </div>
          </div>

          {!success ? (
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form__group">
                <label htmlFor="nome">Nome completo <span className="req" aria-label="obrigatório">*</span></label>
                <input
                  type="text" id="nome" name="nome"
                  placeholder="Digite seu nome completo"
                  required autoComplete="name"
                  value={fields.nome} onChange={handleChange}
                  className={errors.nome ? 'error' : fields.nome ? 'success' : ''}
                />
                <span className="form__error" role="alert">{errors.nome}</span>
              </div>
              <div className="form__group">
                <label htmlFor="whatsapp">WhatsApp <span className="req" aria-label="obrigatório">*</span></label>
                <input
                  type="tel" id="whatsapp" name="whatsapp"
                  placeholder="(00) 00000-0000"
                  required autoComplete="tel" maxLength={15}
                  value={fields.whatsapp} onChange={handleChange}
                  className={errors.whatsapp ? 'error' : fields.whatsapp ? 'success' : ''}
                />
                <span className="form__error" role="alert">{errors.whatsapp}</span>
              </div>
              <div className="form__group">
                <label htmlFor="email">E-mail <span className="req" aria-label="obrigatório">*</span></label>
                <input
                  type="email" id="email" name="email"
                  placeholder="seu@email.com"
                  required autoComplete="email"
                  value={fields.email} onChange={handleChange}
                  className={errors.email ? 'error' : fields.email ? 'success' : ''}
                />
                <span className="form__error" role="alert">{errors.email}</span>
              </div>
              <div className="form__group">
                <label htmlFor="idade">Idade <span className="req" aria-label="obrigatório">*</span></label>
                <input
                  type="number" id="idade" name="idade"
                  placeholder="Sua idade" min="1" required
                  value={fields.idade} onChange={handleChange}
                  className={errors.idade ? 'error' : fields.idade ? 'success' : ''}
                />
                <span className="form__error" role="alert">{errors.idade}</span>
              </div>
              <div className="form__group">
                <label htmlFor="cidade">Cidade <span className="req" aria-label="obrigatório">*</span></label>
                <input
                  type="text" id="cidade" name="cidade"
                  placeholder="Sua cidade"
                  value={fields.cidade} onChange={handleChange} required
                  className={errors.cidade ? 'error' : fields.cidade ? 'success' : ''}
                />
                <span className="form__error" role="alert">{errors.cidade}</span>
              </div>
              <div className="form__group">
                <label htmlFor="curriculo">Currículo <span className="field-optional">(opcional)</span></label>
                <input
                  type="file" id="curriculo" name="curriculo"
                  accept=".pdf,.doc,.docx"
                  onChange={e => setCurriculo(e.target.files[0] || null)}
                />
                <span className="form__hint">PDF, DOC ou DOCX — se ainda não tiver, não tem problema!</span>
              </div>
              <button type="submit" className="btn btn--submit pulse" disabled={loading}>
                <i className={loading ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-rocket'} aria-hidden="true"></i>
                {btnLabel || 'QUERO PARTICIPAR GRATUITAMENTE'}
              </button>
              <p className="form__privacy">
                <i className="fa-solid fa-lock" aria-hidden="true"></i>
                Seus dados estão seguros. Não enviamos spam.
              </p>
            </form>
          ) : (
            <div className="form-success" role="status">
              <div className="form-success__icon"><i className="fa-solid fa-circle-check" aria-hidden="true"></i></div>
              <h3>Inscrição realizada!</h3>
              <p>Em breve nossa equipe entrará em contato pelo WhatsApp para confirmar sua participação.</p>
              <p className="form-success__tip">
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                Fique de olho no seu WhatsApp!
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
