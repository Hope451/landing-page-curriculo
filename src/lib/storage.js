import { supabase } from './supabase.js'

export async function uploadCurriculo(arquivo, nomeAluno) {
  const ext    = arquivo.name.split('.').pop()
  const nomeSeguro = nomeAluno.trim().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9_]/g, '_')
  const path   = `${Date.now()}_${nomeSeguro}.${ext}`

  const { error } = await supabase.storage
    .from('curriculos')
    .upload(path, arquivo, { upsert: false })

  if (error) throw new Error(`Storage: ${error.message}`)

  const { data } = supabase.storage.from('curriculos').getPublicUrl(path)
  return data.publicUrl
}
