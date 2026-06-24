import { supabase } from '../lib/supabase.js'

async function baixarCurriculo(curriculo_url, nome) {
  try {
    // Extrai o path do arquivo dentro do bucket a partir da URL pública
    const path = curriculo_url.split('/object/public/curriculos/')[1]

    const { data, error } = await supabase.storage
      .from('curriculos')
      .download(path)

    if (error) throw error

    const a    = document.createElement('a')
    a.href     = URL.createObjectURL(data)
    a.download = nome
    a.click()
    URL.revokeObjectURL(a.href)
  } catch {
    window.open(curriculo_url, '_blank')
  }
}

export default function AdminTable({ inscricoes, loading, empty }) {
  if (loading) {
    return (
      <div className="loading">
        <i className="fa-solid fa-spinner fa-spin"></i> Carregando inscrições…
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>WhatsApp</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th>Currículo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {inscricoes.map((ins, idx) => {
            const dataStr = ins.criado_em
              ? new Date(ins.criado_em).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
              : '—'

            return (
              <tr key={ins.id ?? idx}>
                <td className="num">{idx + 1}</td>
                <td className="nome-cell">{ins.nome ?? '—'}</td>
                <td>
                  <a
                    className="wpp-link"
                    href={`https://wa.me/55${(ins.whatsapp ?? '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp"></i> {ins.whatsapp ?? '—'}
                  </a>
                </td>
                <td>{ins.email ?? '—'}</td>
                <td>{ins.idade ?? '—'}</td>
                <td>
                  {ins.curriculo_url
                    ? (
                      <button
                        className="btn-download"
                        onClick={() => baixarCurriculo(ins.curriculo_url, `curriculo_${(ins.nome ?? '').replace(/\s+/g, '_')}`)}
                      >
                        <i className="fa-solid fa-download"></i> Baixar
                      </button>
                    )
                    : <span className="tag-sem">Não enviado</span>
                  }
                </td>
                <td className="data-cell">{dataStr}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {empty && <p className="empty-msg">Nenhuma inscrição encontrada.</p>}
    </div>
  )
}
