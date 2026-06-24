import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import AdminLogin from '../components/AdminLogin.jsx'
import AdminTable from '../components/AdminTable.jsx'

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [todasInscricoes, setTodasInscricoes] = useState([])
  const [inscricoesFiltradas, setInscricoesFiltradas] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filterCurr, setFilterCurr] = useState('todos')

  useEffect(() => {
    if (loggedIn) carregarInscricoes()
  }, [loggedIn])

  useEffect(() => {
    filtrar(search, filterCurr)
  }, [search, filterCurr, todasInscricoes])

  async function carregarInscricoes() {
    setLoading(true)
    const { data, error } = await supabase
      .from('inscricoes')
      .select('*')
      .order('criado_em', { ascending: false })

    if (error) {
      console.error(error.message)
      setLoading(false)
      return
    }

    setTodasInscricoes(data)
    setLoading(false)
  }

  function filtrar(termo, curr) {
    const t = termo.toLowerCase().trim()
    const resultado = todasInscricoes.filter(ins => {
      const matchTexto = !t
        || (ins.nome     ?? '').toLowerCase().includes(t)
        || (ins.email    ?? '').toLowerCase().includes(t)
        || (ins.whatsapp ?? '').replace(/\D/g, '').includes(t.replace(/\D/g, ''))

      const matchCurr = curr === 'todos'
        || (curr === 'com' && ins.curriculo_url)
        || (curr === 'sem' && !ins.curriculo_url)

      return matchTexto && matchCurr
    })
    setInscricoesFiltradas(resultado)
  }

  function handleLogout() {
    setLoggedIn(false)
    setTodasInscricoes([])
    setInscricoesFiltradas([])
    setSearch('')
    setFilterCurr('todos')
  }

  function exportCSV() {
    const rows = [['Nome', 'WhatsApp', 'Email', 'Idade', 'Currículo URL', 'Data']]
    todasInscricoes.forEach(ins => {
      const data = ins.criado_em ? new Date(ins.criado_em).toLocaleString('pt-BR') : ''
      rows.push([ins.nome, ins.whatsapp, ins.email, ins.idade, ins.curriculo_url ?? '', data])
    })
    const csv  = rows.map(r => r.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `inscricoes_hope_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />
  }

  const total = todasInscricoes.length

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="admin-header__brand">
          <i className="fa-solid fa-rocket"></i>
          <span>Programa Primeiro Emprego Hope</span>
        </div>
        <div className="admin-header__actions">
          <span className="badge">{total} {total === 1 ? 'inscrição' : 'inscrições'}</span>
          <button className="btn-logout" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Sair
          </button>
        </div>
      </header>

      <main className="admin-main">
        <div className="toolbar">
          <div className="toolbar__search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Buscar por nome, e-mail ou WhatsApp…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="toolbar__filters">
            <select value={filterCurr} onChange={e => setFilterCurr(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="com">Com currículo</option>
              <option value="sem">Sem currículo</option>
            </select>
            <button className="btn-export" onClick={exportCSV}>
              <i className="fa-solid fa-file-csv"></i> Exportar CSV
            </button>
          </div>
        </div>

        <AdminTable
          inscricoes={inscricoesFiltradas}
          loading={loading}
          empty={!loading && inscricoesFiltradas.length === 0}
        />
      </main>
    </div>
  )
}
