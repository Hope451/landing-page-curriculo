import { useEffect } from 'react'

export default function Header() {
  useEffect(() => {
    const header = document.querySelector('.header')
    const onScroll = () => {
      if (window.scrollY > 40) {
        header?.classList.add('header--scrolled')
      } else {
        header?.classList.remove('header--scrolled')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleAnchorClick(e) {
    e.preventDefault()
    const target = document.querySelector('#inscricao')
    if (!target) return
    const offset = document.querySelector('.header')?.offsetHeight || 64
    window.scrollTo({ top: target.offsetTop - offset - 16, behavior: 'smooth' })
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo">
          <img src="/images/logo-hope.png" alt="Instituto Hope — Educação Profissional" className="logo-img" />
        </a>
        <a href="#inscricao" className="btn btn--nav" onClick={handleAnchorClick}>
          <i className="fa-solid fa-rocket" aria-hidden="true"></i> Quero me inscrever
        </a>
      </div>
    </header>
  )
}
