import { Link } from 'react-router-dom'
import MovingBackground from '../components/MovingBackground'
import { useInView } from '../hooks/useInView'
import './HomePage.css'

export default function HomePage() {
  const { ref: approachRef, inView: approachInView } = useInView()
  const { ref: valuesRef, inView: valuesInView } = useInView()

  return (
    <div className="home-page">
      <section className="hero hero--moving">
        <MovingBackground videoSrc="/assets/hero-bg.mp4">
          <div className="hero-content">
            <h1 className="hero-title hero-title--stagger">
              <em>Digital</em> solutions for people and their businesses
            </h1>
            <p className="hero-subtitle hero-subtitle--stagger">
              We transform companies digitally. From websites and apps to automation,
              maintenance, QA, and load testing. We deliver end-to-end software solutions.
            </p>
            <div className="hero-cta hero-cta--stagger">
              <Link to="/services" className="btn btn-primary">
                Our Services
              </Link>
              <Link to="/contact" className="btn btn-outline btn--light">
                Get in touch
              </Link>
            </div>
          </div>
        </MovingBackground>
      </section>

      <section className="approach-section" ref={approachRef as React.RefObject<HTMLElement>}>
        <div className={`approach-inner ${approachInView ? 'approach-inner--visible' : ''}`}>
          <p className="approach-lead">
            We don't just deliver projects, we <em>own outcomes</em>.
          </p>
          <div className="approach-pillars">
            <Link to="/services" className="approach-pillar">
              <h3 className="approach-pillar__title">Build</h3>
              <p className="approach-pillar__text">
                We create websites and apps that grow with you. Easy to use for your customers and reliable behind the scenes, so you can focus on your business instead of technical headaches.
              </p>
            </Link>
            <Link to="/services" className="approach-pillar">
              <h3 className="approach-pillar__title">Automate</h3>
              <p className="approach-pillar__text">
                Repetitive tasks eat time and cause errors. We set up smart systems that do the boring work for you, so your team can spend energy on what really matters.
              </p>
            </Link>
            <Link to="/services" className="approach-pillar">
              <h3 className="approach-pillar__title">Support</h3>
              <p className="approach-pillar__text">
                After we build something, we don't disappear. We keep it secure, up to date, and running smoothly so you're never left wondering if something might break.
              </p>
            </Link>
          </div>
          <div className="approach-cta">
            <Link to="/services" className="approach-link">Explore our services </Link>
          </div>
        </div>
      </section>

      <section className="values-section" ref={valuesRef as React.RefObject<HTMLElement>}>
        <div className={`values-inner ${valuesInView ? 'values-inner--visible' : ''}`}>
          <h2 className="values-title">Why clients choose us</h2>
          <p className="values-subtitle">
            We combine efficiency, accuracy, and genuine understanding to deliver solutions that streamline operations, boost productivity, and drive real growth.
          </p>
          <div className="values-list">
            <article className="values-item">
              <h3 className="values-item__title">Efficient & focused</h3>
              <p className="values-item__text">
                We work smart and move fast. No endless meetings or scope creep. We stay on track, communicate clearly, and deliver on time. Your time and budget matter to us.
              </p>
            </article>
            <article className="values-item">
              <h3 className="values-item__title">Accurate & detail-oriented</h3>
              <p className="values-item__text">
                We pay close attention to detail and get things right the first time. Clean code, thorough testing, and rigorous QA mean your product works reliably. No surprises.
              </p>
            </article>
            <article className="values-item">
              <h3 className="values-item__title">Understanding first</h3>
              <p className="values-item__text">
                We take time to understand your business, your goals, and your constraints before we build anything. We're not just executing specs. We're solving your actual problems.
              </p>
            </article>
            <article className="values-item">
              <h3 className="values-item__title">Outcomes that matter</h3>
              <p className="values-item__text">
                We streamline operations, improve productivity, and help drive revenue. Whether it's automation, better tools, or a smarter workflow, we focus on results that move the needle for your business.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <h2><em>Ready</em> to transform digitally?</h2>
          <p>Let's build something great together.</p>
          <Link to="/contact" className="btn btn-primary">
            Start a conversation with us
          </Link>
        </div>
      </section>
    </div>
  )
}
