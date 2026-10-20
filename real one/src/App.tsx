import { useState, type FormEvent } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Instagram, Menu, X } from 'lucide-react'
import './App.css'

const plans = [
  { name: 'STARTER', price: '₹1,500', cadence: 'one-time', intro: 'A strong, well-organised starting point.', features: ['Full profile audit report', 'Profile cleanup and setup', 'Services and description written', 'Photo guidance', 'Review QR code and reply templates'] },
  { name: 'GROWTH', price: '₹3,000', cadence: 'per month', intro: 'Consistent activity, with a little more care.', popular: true, features: ['Everything in Starter', '4 posts or offers per month', 'Review replies handled for you', 'Questions and answers setup', 'Monthly report'] },
  { name: 'PREMIUM', price: '₹5,000', cadence: 'per month', intro: 'Ongoing support for a growing local presence.', features: ['Everything in Growth', '8 posts per month', 'Monthly competitor check', 'Second branch support', 'Monthly 20-minute review call'] },
]
const seoWork = ['Profile audit and setup', 'Categories, services & descriptions', 'Accurate business information', 'Photo guidance', 'Review QR codes & reply templates', 'Google Business Profile posts & offers', 'Competitor checks', 'Monthly reports']
const links = [{ href: '#home', label: 'Home' }, { href: '#services', label: 'Services' }, { href: '#about', label: 'About' }, { href: '#contact', label: 'Contact' }]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (formState === 'sending') return
    const form = event.currentTarget
    const data = new FormData(form)
    setFormState('sending')
    setFormMessage('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), business: data.get('business'), service: data.get('service'), message: data.get('message'), website: data.get('website') }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'We could not send your message. Please try again.')
      setFormState('sent')
      setFormMessage('Thanks for reaching out. Your message has been delivered — we’ll be in touch soon.')
      form.reset()
    } catch (error) {
      setFormState('error')
      setFormMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again or contact us directly.')
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Hamit Agencies home"><span className="mark">H<span>.</span></span><span className="wordmark-copy">HAMIT<br />AGENCIES</span></a>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {links.map(link => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Start a conversation <ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> INDEPENDENT DIGITAL AGENCY · INDIA</p>
            <h1>Your business<br />deserves to<br /><em>be found.</em></h1>
            <p className="hero-summary">HAMIT AGENCIES helps businesses improve their online presence through local SEO and professional websites.</p>
            <div className="hero-actions"><a className="button button-dark" href="#services">Explore our services <ArrowDownRight size={17} /></a><a className="text-link" href="#contact">Let’s talk <ArrowRight size={16} /></a></div>
            <div className="hero-note"><span className="note-line" /> Thoughtful digital work for real businesses.</div>
          </div>
          <div className="hero-art" aria-label="Illustration of a local business appearing in a map search" role="img">
            <div className="art-topline"><span>LOCAL, MADE VISIBLE</span><span>01 — 03</span></div>
            <div className="map-grid"><div className="map-road road-a" /><div className="map-road road-b" /><div className="map-road road-c" /><div className="map-park"><span>NEIGHBOURHOOD<br />PARK</span></div><span className="map-label label-a">MARKET ST.</span><span className="map-label label-b">OLD TOWN</span><div className="map-pin"><span>h</span><i /></div><div className="map-result"><div className="result-thumb">H<span>.</span></div><div><strong>Your business</strong><span>Nearby · Open today</span></div><span className="result-stars">★★★★★</span></div><div className="map-orbit orbit-one" /><div className="map-orbit orbit-two" /></div>
            <div className="art-bottomline"><span>BE PRESENT WHERE IT MATTERS</span><span>HA / 2026</span></div>
          </div>
          <a className="scroll-cue" href="#services" aria-label="Scroll to services"><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></a>
        </section>

        <section className="intro-strip" aria-label="Our approach"><span>01 / WHAT WE DO</span><p>Good work starts with being easy to find — and even easier to trust.</p><span className="strip-index">01—02</span></section>

        <section className="section services-section" id="services">
          <div className="section-heading"><div><p className="eyebrow">OUR SERVICES <span>— 01 / 02</span></p><h2>Small details.<br /><em>Stronger presence.</em></h2></div><p className="section-intro">The essentials to help your business show up clearly, online and around the neighbourhood.</p></div>
          <article className="service-block seo-block">
            <div className="service-heading"><div className="service-number">01</div><div><p className="service-kicker">BE FOUND LOCALLY</p><h3>Local SEO</h3><p>Make it easier for nearby customers to find the right information about your business.</p></div><a className="round-link" href="#seo-plans" aria-label="Explore local SEO plans"><ArrowDownRight /></a></div>
            <div className="seo-detail-grid"><div className="seo-copy"><h4>A more useful<br />Google presence.</h4><p>We help you build and maintain a complete, thoughtful Google Business Profile — from the first audit to regular updates. No shortcuts or ranking promises. Just careful work that makes your online presence more accurate and useful.</p><a className="download-link" href="/local-seo-brochure.pdf" target="_blank" rel="noreferrer">View brochure <ArrowUpRight size={15} /></a></div><div className="seo-checklist"><h4>What we can help with</h4><ul>{seoWork.map(item => <li key={item}><Check size={15} /><span>{item}</span></li>)}</ul></div></div>
            <div className="pricing-head" id="seo-plans"><div><p className="service-kicker">STRAIGHTFORWARD, TRANSPARENT PRICING</p><h4>Choose your starting point.</h4></div><a className="download-link" href="/local-seo-brochure.pdf" download>Download PDF <ArrowDownRight size={15} /></a></div>
            <div className="pricing-grid">{plans.map(plan => <article className={`price-card ${plan.popular ? 'popular' : ''}`} key={plan.name}>{plan.popular && <div className="popular-tag">MOST POPULAR</div>}<div className="plan-name">{plan.name}</div><p className="plan-intro">{plan.intro}</p><div className="price">{plan.price}<span> / {plan.cadence}</span></div><div className="plan-rule" /><ul>{plan.features.map(feature => <li key={feature}><Check size={14} /><span>{feature}</span></li>)}</ul><a className={plan.popular ? 'button button-dark plan-cta' : 'plan-link'} href="#contact">Ask about {plan.name.toLowerCase()} <ArrowRight size={15} /></a></article>)}</div>
            <div className="trust-note"><span className="trust-symbol">✳</span><p><strong>Clear work. Honest expectations.</strong> Local search takes time and depends on many factors. We focus on accurate information, consistent upkeep, and clear reporting — never guaranteed rankings or made-up results.</p></div>
            <div className="pdf-preview"><div className="preview-copy"><span className="service-kicker">THE DETAILS, ON PAPER</span><h4>Our local SEO brochure.</h4><p>A quick, printable overview of our services and plans.</p><a className="download-link" href="/local-seo-brochure.pdf" target="_blank" rel="noreferrer">Open brochure <ArrowUpRight size={15} /></a></div><div className="pdf-frame"><iframe src="/local-seo-brochure.pdf#toolbar=0&view=FitH" title="HAMIT AGENCIES local SEO brochure PDF" loading="lazy" /></div></div>
          </article>
          <article className="service-block web-block"><div className="service-heading"><div className="service-number">02</div><div><p className="service-kicker">BUILT AROUND YOU</p><h3>Website design</h3><p>Your own website.<br /><em>Built for your business.</em></p></div><a className="round-link" href="#contact" aria-label="Get a website quote"><ArrowUpRight /></a></div><div className="web-detail"><p>We create professional, responsive websites that present your business, showcase your services, and help customers get in touch. No off-the-shelf feel — just a clear, considered home for your business online.</p><ul className="web-features"><li>Custom design</li><li>Mobile responsive</li><li>Service pages</li><li>Contact forms</li><li>Basic on-page SEO</li></ul><a className="button button-dark" href="#contact">Get a website quote <ArrowRight size={16} /></a></div></article>
        </section>

        <section className="about-section" id="about"><div className="section about-layout"><div className="about-side"><p className="eyebrow">A LITTLE ABOUT US <span>— 02</span></p><div className="founder-monogram" aria-hidden="true"><span>H</span><i>×</i><span>M</span><small>HAMIT<br />AGENCIES</small></div></div><div className="about-content"><h2>Young founders.<br /><em>Big ambitions.<br />Real work.</em></h2><div className="about-copy"><p>HAMIT AGENCIES was built on a simple idea: businesses deserve a better online presence, and getting started should not have to be complicated.</p><p>Founded by Harshit Yadav and Mitraysh Parmar, HAMIT AGENCIES is our first entrepreneurial venture. We are building the agency with curiosity, hard work, a forward-thinking mindset, and a focus on creating useful digital solutions for real businesses.</p><p>Our goal is to make the digital side of business simpler, stronger, and more accessible. We intend to earn trust through honest communication, consistent effort, and the quality of our work.</p></div><div className="founder-cards"><div className="founder-card"><span>CO-FOUNDER</span><h4>Harshit Yadav</h4><p>HAMIT AGENCIES co-founder</p></div><div className="founder-card"><span>CO-FOUNDER</span><h4>Mitraysh Parmar</h4><p>HAMIT AGENCIES co-founder</p></div></div></div></div></section>

        <section className="contact-section" id="contact"><div className="section contact-layout"><div className="contact-copy"><p className="eyebrow">HAVE SOMETHING IN MIND? <span>— GET IN TOUCH</span></p><h2>Let’s make your<br /><em>next step</em> a good one.</h2><p>Tell us a little about your business and what you need. We’ll take it from there.</p><div className="contact-direct"><a href="tel:+916399135592">+91 63991 35592 <ArrowUpRight size={15} /></a><a href="mailto:hamitagencies@gmail.com">hamitagencies@gmail.com <ArrowUpRight size={15} /></a><a href="https://wa.me/91916399135592" target="_blank" rel="noreferrer">Message us on WhatsApp <ArrowUpRight size={15} /></a></div><a className="social-link" href="https://www.instagram.com/hamitagencies/" target="_blank" rel="noreferrer"><Instagram size={16} /> Follow along on Instagram <ArrowUpRight size={14} /></a></div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row"><label>Your name<input name="name" type="text" autoComplete="name" required minLength={2} maxLength={80} placeholder="Name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label></div>
              <div className="form-row"><label>Business name <span className="optional">(optional)</span><input name="business" type="text" autoComplete="organization" maxLength={100} placeholder="Your business" /></label><label>I'm interested in<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Local SEO</option><option>Website design</option><option>Both</option><option>Something else</option></select></label></div>
              <label>How can we help?<textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="A little about what you're looking for…" /></label>
              <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <div className="form-submit"><button className="button button-dark" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending…' : 'Send your message'} <ArrowRight size={16} /></button><span>We’ll only use your details to reply.</span></div>
              {formMessage && <p className={`form-feedback ${formState}`} role="status" aria-live="polite">{formMessage}{formState === 'error' && <> <a href="mailto:hamitagencies@gmail.com">Email us directly.</a></>}</p>}
            </form>
          </div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a className="wordmark footer-wordmark" href="#home"><span className="mark">H<span>.</span></span><span className="wordmark-copy">HAMIT<br />AGENCIES</span></a><p>Good work. Thoughtfully made.<br />For the next generation of local business.</p><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} HAMIT AGENCIES</span><nav aria-label="Footer navigation">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav><a href="https://www.instagram.com/hamitagencies/" target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={12} /></a></div></footer>
    </>
  )
}

export default App
