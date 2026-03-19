import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import MovingBackground from '../components/MovingBackground'
import { useInView } from '../hooks/useInView'
import { ServiceIcon, type ServiceIconName } from '../components/ServiceIcons'
import './ServicesPage.css'

const services: {
  title: string
  description: string
  icon: ServiceIconName
}[] = [
  {
    title: 'Web Development',
    description: 'Crafting responsive, high-performance websites tailored to your brand. We focus on SEO-friendly architecture and seamless user experiences across all devices.',
    icon: 'monitor',
  },
  {
    title: 'App Development',
    description: 'Building intuitive iOS and Android applications. From concept to deployment, we deliver robust mobile solutions that engage users and drive growth.',
    icon: 'phone',
  },
  {
    title: 'Automation',
    description: 'Streamlining your workflows with intelligent automation tools. Reduce manual effort and minimize errors by automating repetitive business processes.',
    icon: 'lightning',
  },
  {
    title: 'Site Maintenance',
    description: 'Keeping your platform secure, updated, and bug-free. We provide continuous support and updates to ensure your digital presence never skips a beat.',
    icon: 'gear',
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous testing to ensure your software is flawless. Our QA experts identify potential issues before they reach your users, ensuring reliability.',
    icon: 'check',
  },
  {
    title: 'Load Testing',
    description: 'Preparing your infrastructure for peak traffic. We simulate high-load scenarios to verify system stability and prevent crashes during critical times.',
    icon: 'lightning',
  },
]

const CAROUSEL_SPEED = 0.0012

export default function ServicesPage() {
  const { ref: listRef, inView: listInView } = useInView()
  const [selected, setSelected] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const directionRef = useRef<number>(0)
  const rafRef = useRef<number>(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const mid = rect.width / 2
    directionRef.current = x < mid ? 1 : -1
  }

  const handleMouseLeave = () => {
    directionRef.current = 0
  }

  useEffect(() => {
    if (!listInView) return

    const tick = () => {
      setProgress((p) => {
        const d = directionRef.current
        if (d === 0) return p
        let next = p + d * CAROUSEL_SPEED
        if (next >= 1) next = 0
        if (next < 0) next = 1
        return next
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [listInView])

  return (
    <div className="services-page">
      <section className="services-hero services-hero--moving">
        <MovingBackground overlayOpacity={0.4} videoSrc="/assets/hero-bg.mp4">
          <div className="services-hero-content">
            <span className="services-label services-label--stagger">What we offer</span>
            <h1 className="services-title services-title--stagger"><em>Our</em> Services</h1>
            <p className="services-intro services-intro--stagger">
              We offer end-to-end digital solutions to transform your business.
              From initial strategy to ongoing maintenance, we're with you every step.
            </p>
          </div>
        </MovingBackground>
      </section>

      <section className="services-carousel-section" ref={listRef as React.RefObject<HTMLElement>}>
        <div
          ref={wrapRef}
          className="services-carousel-wrap"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`services-carousel-track ${listInView ? 'services-carousel-track--visible' : ''}`}>
            <div
              className="services-carousel"
              style={{ '--progress': progress } as React.CSSProperties}
            >
            {[...services, ...services].map((service, index) => (
              <article
                key={index}
                className={`service-card ${selected === index % services.length ? 'service-card--selected' : ''}`}
                onClick={() => setSelected(selected === index % services.length ? null : index % services.length)}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(selected === index % services.length ? null : index % services.length)}
                tabIndex={0}
                role="button"
              >
                <span className="service-card__number" aria-hidden>
                  {String((index % services.length) + 1).padStart(2, '0')}
                </span>
                <div className="service-card__icon-wrap">
                  <ServiceIcon name={service.icon} />
                </div>
                <h2 className="service-card__title">{service.title}</h2>
                <p className="service-card__description">{service.description}</p>
                <Link to="/contact" className="service-card__cta" onClick={(e) => e.stopPropagation()}>Discuss this service →</Link>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="services-cta">
        <h2 className="services-cta__title">Ready to start your project?</h2>
        <p className="services-cta__text">Let's discuss how our technology solutions can take your business to the next level.</p>
        <div className="services-cta__buttons">
          <Link to="/contact" className="btn btn-primary">Book a consultation</Link>
          <Link to="/contact" className="btn btn-outline btn-cta-outline">Get in touch</Link>
        </div>
      </section>
    </div>
  )
}
