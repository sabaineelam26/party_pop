import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2,
  MessageSquare, Instagram, Twitter, Facebook, Sparkles, ChevronDown
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const faqs = [
    {
      q: 'How early should I book my party?',
      a: 'We recommend booking at least 7–14 days in advance to ensure your preferred date and package are available. For weekend slots, booking 3+ weeks ahead is ideal.',
    },
    {
      q: 'Can I customise a package?',
      a: 'Absolutely! All our packages can be tailored to your needs. Reach out to us via this form or call us directly and our coordinators will craft a bespoke plan for you.',
    },
    {
      q: 'What is your cancellation policy?',
      a: 'Cancellations made 72 hours or more before the event receive a full refund. Cancellations within 72 hours may be subject to a 25% fee.',
    },
    {
      q: 'Do you offer outdoor celebrations?',
      a: 'Yes! We offer both indoor and outdoor setups. Our team handles all logistics, décor, and vendor coordination regardless of the venue type.',
    },
    {
      q: 'Is catering included in packages?',
      a: 'Catering is included in our Premium and Luxury packages. For the Basic package, catering can be added as an optional add-on during booking.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFAF7] dark:bg-[#110B04] animate-fadeIn">

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-party-purple-700 via-party-pink-600 to-party-purple-800 py-20 px-4 text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-party-gold-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-party-pink-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-party-gold-300 animate-pulse" />
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            We'd Love to Hear<br />
            <span className="text-party-gold-300">From You! 🎉</span>
          </h1>
          <p className="text-white/80 text-base leading-relaxed">
            Have a question, special request, or just want to say hi? Our party coordinators are ready to make your birthday unforgettable.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Phone,
              label: 'Call Us',
              value: '+91 98765 43210',
              sub: 'Mon–Sat, 9am–7pm',
              color: 'from-party-purple-500 to-party-purple-700',
              href: 'tel:+919876543210',
            },
            {
              icon: Mail,
              label: 'Email Us',
              value: 'hello@bdaybuzz.in',
              sub: 'Reply within 2 hours',
              color: 'from-party-pink-500 to-party-pink-700',
              href: 'mailto:hello@bdaybuzz.in',
            },
            {
              icon: MapPin,
              label: 'Visit Us',
              value: 'MG Road, Bangalore',
              sub: 'Karnataka, India 560001',
              color: 'from-party-gold-500 to-party-gold-600',
              href: '#',
            },
            {
              icon: Clock,
              label: 'Working Hours',
              value: '9:00 AM – 7:00 PM',
              sub: 'Monday to Saturday',
              color: 'from-emerald-500 to-emerald-600',
              href: '#',
            },
          ].map(({ icon: Icon, label, value, sub, color, href }) => (
            <a
              key={label}
              href={href}
              className="group glass-card rounded-3xl p-6 flex flex-col items-start gap-4 hover:-translate-y-1 hover:shadow-glow transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-party-purple-600 dark:text-party-purple-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-stone-900 dark:text-white font-bold text-base">{value}</p>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5">{sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form */}
          <div className="lg:col-span-3 glass-card rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">Send Us a Message</h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Fill in the form below and we'll get back to you within 2 hours.</p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black text-stone-900 dark:text-white">Message Sent! 🎉</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm max-w-xs">
                  Thanks for reaching out, <strong>{form.name}</strong>! Our team will reply to <strong>{form.email}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-party-purple-600 to-party-pink-500 text-white text-sm font-bold hover:scale-105 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">Email Address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">Phone Number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">Subject *</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-3 rounded-xl text-sm"
                    >
                      <option value="">Select a topic</option>
                      <option>General Enquiry</option>
                      <option>Package Customisation</option>
                      <option>Booking Support</option>
                      <option>Cancellation / Refund</option>
                      <option>Feedback</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-party-purple-600 via-party-pink-500 to-party-purple-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-party-purple-500/30 hover:shadow-glow hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map + Social */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Map */}
            <div className="glass-card rounded-3xl overflow-hidden flex-1 min-h-[260px]">
              <iframe
                title="BdayBuzz Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9925952499604!2d77.6063!3d12.9758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167f2b6b5db3%3A0xb7a2e7c3e1c9a4a1!2sMG+Road%2C+Bengaluru%2C+Karnataka!5e0!3m2!1sen!2sin!4v1693000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '260px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-party-purple-500" />
                <h3 className="font-black text-stone-900 dark:text-white text-base">Follow Us</h3>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Instagram, label: '@bdaybuzz', sub: 'Instagram', color: 'from-pink-500 to-orange-400', href: '#' },
                  { icon: Facebook, label: 'BdayBuzz Official', sub: 'Facebook', color: 'from-blue-600 to-blue-700', href: '#' },
                  { icon: Twitter, label: '@bdaybuzz', sub: 'Twitter / X', color: 'from-sky-400 to-sky-600', href: '#' },
                ].map(({ icon: Icon, label, sub, color, href }) => (
                  <a
                    key={sub}
                    href={href}
                    className="flex items-center gap-3 group hover:bg-stone-50 dark:hover:bg-stone-800/60 p-2 rounded-xl transition-all"
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-stone-900 dark:text-white text-sm font-bold">{label}</p>
                      <p className="text-stone-400 text-xs">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold text-party-purple-600 dark:text-party-purple-400 uppercase tracking-wider bg-party-purple-100 dark:bg-party-purple-950/60 px-4 py-1.5 rounded-full border border-party-purple-200 dark:border-party-purple-800">
              FAQ
            </span>
            <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm">Quick answers to the questions we hear most often.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden border border-stone-200/60 dark:border-white/10"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <span className="font-bold text-stone-900 dark:text-white text-sm">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-party-purple-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-6 pb-4 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
