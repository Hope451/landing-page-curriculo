import { useState } from 'react'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

export default function AdminLogin({ onLogin }) {
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (senha === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError('Senha incorreta.')
      setSenha('')
    }
  }

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-logo">
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        <h1>Painel Administrativo</h1>
        <p>Programa Primeiro Emprego Hope</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="senha">Senha</label>
            <input
              type="password" id="senha"
              placeholder="Digite a senha"
              autoComplete="current-password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
            <span className="field__error">{error}</span>
          </div>
          <button type="submit" className="btn-login">
            <i className="fa-solid fa-right-to-bracket"></i> Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
