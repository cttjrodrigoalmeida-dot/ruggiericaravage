import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  HeartHandshake,
  Menu,
  MessageCircle,
  Scale,
  ShieldCheck,
  Stethoscope,
  X,
} from 'lucide-react'
const commitments = [
  {
    icon: Stethoscope,
    title: 'Saúde',
    text: 'Mais acesso à informação, avaliação e acompanhamento.',
    tone: 'cyan',
  },
  {
    icon: BookOpen,
    title: 'Educação',
    text: 'Professores preparados e escolas mais acolhedoras.',
    tone: 'yellow',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Trabalho',
    text: 'Mais qualificação, oportunidades e autonomia.',
    tone: 'coral',
  },
  {
    icon: Scale,
    title: 'Direitos',
    text: 'Informação, proteção e garantia do que já está previsto em lei.',
    tone: 'green',
  },
  {
    icon: HeartHandshake,
    title: 'Quem cuida',
    text: 'Mais apoio para famílias, professores e profissionais.',
    tone: 'blue',
  },
]

const proposals = [
  'Capacitação de professores e equipes escolares.',
  'Melhor diálogo entre escola e família.',
  'Mais atenção à neurodivergência na vida adulta.',
  'Qualificação e oportunidades de trabalho.',
  'Apoio e orientação para quem cuida.',
  'Integração entre saúde, educação e assistência.',
]

const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
  'Olá! Quero conhecer melhor o projeto de Ruggieri Caravage.',
)}`

function App() {
  const root = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 620px)').matches
    let cancelled = false
    let lenis
    let rafId
    let context

    const initializeMotion = async () => {
      if (prefersReducedMotion) return

      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ])

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
          duration: 1.1,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.2,
        })

        lenis.on('scroll', ScrollTrigger.update)
        const raf = (time) => {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

      context = gsap.context(() => {
        gsap.from('.hero__frame', {
          scale: 1.04,
          opacity: 0,
          duration: 1.4,
          ease: 'power3.out',
        })

        gsap.from('.hero__nav > *', {
          y: -24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          delay: 0.35,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        })

        gsap.from('.mobile-mark', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          delay: 0.6,
          ease: 'power3.out',
        })

        gsap.utils.toArray('.reveal').forEach((element) => {
          gsap.from(element, {
            y: 56,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          })
        })

        gsap.from('.commitment-card', {
          y: isMobile ? 0 : 64,
          opacity: 0,
          rotateX: isMobile ? 0 : 8,
          duration: 0.8,
          stagger: isMobile ? 0.06 : 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: '.commitments__grid', start: 'top 78%', once: true },
        })

        gsap.from('.proposal-item', {
          x: -48,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.proposals__list', start: 'top 80%', once: true },
        })

        gsap.to('.about__mockup img', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about__mockup',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })

        gsap.to('.hero__frame', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
      }, root)
    }

    initializeMotion()

    return () => {
      cancelled = true
      context?.revert()
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div ref={root} className="site-shell">
      <header className="hero" id="inicio">
        <div className="hero__frame" aria-hidden="true" />
        <nav className="hero__nav container" aria-label="Navegação principal">
          <a className="nav__brand" href="#inicio" aria-label="Ruggieri Caravage - início">
            <img src="/assets/logo-principal.webp" alt="Ruggieri Caravage" width="2937" height="906" decoding="async" />
          </a>

          <div className={`nav__links ${menuOpen ? 'is-open' : ''}`}>
            <button className="nav__close" onClick={closeMenu} aria-label="Fechar menu">
              <X size={24} />
            </button>
            <a href="#ruggieri" onClick={closeMenu}>Quem é</a>
            <a href="#compromissos" onClick={closeMenu}>Compromissos</a>
            <a href="#propostas" onClick={closeMenu}>Propostas</a>
            <a className="nav__cta" href="#contato" onClick={closeMenu}>
              Fale com a equipe <ArrowUpRight size={16} />
            </a>
          </div>

          <button
            className="nav__menu"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Abrir menu"
          >
            <Menu size={25} />
          </button>
        </nav>

        <img className="mobile-mark" src="/assets/logo-mobile-no-number.webp" alt="Ruggieri Caravage" width="1785" height="560" decoding="async" />

        <a className="hero__scroll" href="#ruggieri" aria-label="Conheça o projeto de Ruggieri Caravage">
          <span>Conheça o projeto</span>
          <ArrowDown size={17} />
        </a>
      </header>

      <main>
        <section className="about section" id="ruggieri">
          <div className="about__glow" aria-hidden="true" />
          <div className="container about__grid">
            <div className="about__copy">
              <div className="section-kicker reveal"><span>01</span> Quem é Ruggieri</div>
              <h1 className="section-title reveal">
                Uma trajetória de <em>cuidado</em>, serviço e compromisso.
              </h1>
              <div className="about__text reveal">
                <p>
                  Ruggieri construiu sua história próximo das pessoas, com atuação voltada ao cuidado,
                  à escuta e à comunidade.
                </p>
                <p>
                  Sua trajetória no escotismo fortaleceu valores como responsabilidade, trabalho em
                  equipe e disposição para ajudar.
                </p>
                <p>
                  Hoje, coloca essa experiência à disposição do Paraná, com atenção especial às
                  famílias, aos profissionais e às pessoas neurodivergentes.
                </p>
              </div>
              <div className="about__signature reveal">
                <ShieldCheck size={24} />
                <span>Presença, escuta e ação.</span>
              </div>
            </div>

            <div className="about__visual reveal">
              <div className="about__mockup">
                <img
                  src="/assets/mockup-no-number.webp"
                  alt="Aplicações da identidade visual de Ruggieri"
                  width="1600"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="about__badge">
                <span>PARANÁ</span>
                <strong>PRESENTE</strong>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            <div className="ticker__group">
              <span>CUIDADO</span><i>•</i><span>SERVIÇO</span><i>•</i><span>COMPROMISSO</span><i>•</i>
              <span>CUIDADO</span><i>•</i><span>SERVIÇO</span><i>•</i><span>COMPROMISSO</span><i>•</i>
              <span>CUIDADO</span><i>•</i><span>SERVIÇO</span><i>•</i><span>COMPROMISSO</span><i>•</i>
            </div>
            <div className="ticker__group">
              <span>CUIDADO</span><i>•</i><span>SERVIÇO</span><i>•</i><span>COMPROMISSO</span><i>•</i>
              <span>CUIDADO</span><i>•</i><span>SERVIÇO</span><i>•</i><span>COMPROMISSO</span><i>•</i>
              <span>CUIDADO</span><i>•</i><span>SERVIÇO</span><i>•</i><span>COMPROMISSO</span><i>•</i>
            </div>
          </div>
        </div>

        <section className="commitments section" id="compromissos">
          <div className="container">
            <div className="commitments__head">
              <div>
                <div className="section-kicker section-kicker--light reveal"><span>02</span> Principais compromissos</div>
                <h2 className="section-title section-title--light reveal">
                  Uma atuação que acompanha as pessoas em <em>todas as fases</em> da vida.
                </h2>
              </div>
              <p className="commitments__intro reveal">
                Política pública de verdade começa pela escuta e chega onde as pessoas mais precisam.
              </p>
            </div>

            <div className="commitments__grid">
              {commitments.map(({ icon: Icon, title, text, tone }, index) => (
                <article className={`commitment-card commitment-card--${tone}`} key={title}>
                  <div className="commitment-card__top">
                    <span className="commitment-card__number">0{index + 1}</span>
                    <div className="commitment-card__icon"><Icon size={26} /></div>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="proposals section" id="propostas">
          <div className="proposals__pattern" aria-hidden="true" />
          <div className="container proposals__grid">
            <div className="proposals__sticky">
              <div className="section-kicker reveal"><span>03</span> Propostas</div>
              <h2 className="section-title reveal">
                Transformar <em>cuidado</em> em ação.
              </h2>
              <p className="reveal">
                Compromissos objetivos para aproximar saúde, educação, assistência e oportunidades.
              </p>
              <img
                className="proposals__logo reveal"
                src="/assets/logo-section-no-number.webp"
                alt="Ruggieri Caravage"
                width="2937"
                height="906"
                loading="lazy"
                decoding="async"
              />
            </div>

            <ol className="proposals__list">
              {proposals.map((proposal, index) => (
                <li className="proposal-item" key={proposal}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{proposal}</p>
                  <ArrowUpRight size={24} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="contact section" id="contato">
          <div className="contact__orb contact__orb--one" aria-hidden="true" />
          <div className="contact__orb contact__orb--two" aria-hidden="true" />
          <div className="container contact__inner">
            <div className="section-kicker section-kicker--light reveal"><span>04</span> Fale com a equipe</div>
            <h2 className="contact__title reveal">
              Sua voz também faz parte <span>desse projeto.</span>
            </h2>
            <p className="contact__copy reveal">
              Tem alguma sugestão, dúvida ou quer conhecer melhor o projeto? Entre em contato com a
              equipe de Ruggieri.
            </p>
            <a className="contact__button reveal" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={23} />
              WhatsApp da assessoria
              <ArrowUpRight size={20} />
            </a>
            <div className="contact__party reveal">Progressistas <span>•</span> PP</div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <img
            src="/assets/logo-principal.webp"
            alt="Ruggieri Caravage"
            width="2937"
            height="906"
            loading="lazy"
            decoding="async"
          />
          <p>Suporte e adequação para o mundo neurodivergente.</p>
          <a href="#inicio" aria-label="Voltar ao topo"><ArrowDown size={20} /></a>
        </div>
      </footer>
    </div>
  )
}

export default App
