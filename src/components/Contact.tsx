import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [contactInfoVisible, setContactInfoVisible] = useState<number[]>([]);
  const [socialLinksVisible, setSocialLinksVisible] = useState<number[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'yash.goyal2025@gmail.com',
      href: 'mailto:yash.goyal2025@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 6376843277',
      href: 'tel:+916376843277',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/yashgoyal',
      color: 'hover:text-blue-400'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/yashgoyal',
      color: 'hover:text-slate-300'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:yash.goyal2025@gmail.com',
      color: 'hover:text-red-400'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Animate contact info
            contactInfo.forEach((_, index) => {
              setTimeout(() => {
                setContactInfoVisible(prev => [...prev, index]);
              }, index * 200);
            });

            // Animate social links
            socialLinks.forEach((_, index) => {
              setTimeout(() => {
                setSocialLinksVisible(prev => [...prev, index]);
              }, (index + 3) * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.querySelector('#contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section-animate py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-down' : 'opacity-0'
          }`}>
            <span className="gradient-text-animated">
              Get In Touch
            </span>
          </h2>
          <p className={`text-xl text-slate-300 max-w-3xl mx-auto transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'
          }`}>
            Ready to collaborate on your next data analytics project? Let's discuss how I can help transform your data into insights.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-left animate-delay-500' : 'opacity-0'
          }`}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 animate-slide-blur">Let's Connect</h3>
              <p className="text-slate-300 mb-8 leading-relaxed animate-fade-in-up animate-delay-200">
                I'm always interested in discussing new opportunities in data analytics, 
                business intelligence, and dashboard development. Whether you have a project 
                in mind or just want to connect, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className={`flex items-center space-x-4 p-4 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 card-hover group gpu-accelerated ${
                    contactInfoVisible.includes(index) ? 'animate-fade-in-right' : 'opacity-0'
                  }`}
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${info.color} animate-delay-${index * 200}`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{info.label}</p>
                    <p className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-slate-700/50">
              <h4 className={`text-lg font-semibold text-white mb-4 transition-all duration-1000 ${
                isVisible ? 'animate-fade-in-left animate-delay-1000' : 'opacity-0'
              }`}>Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover-lift ${social.color} gpu-accelerated ${
                      socialLinksVisible.includes(index) ? 'animate-bounce-in' : 'opacity-0'
                    }`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 hover-glow gpu-accelerated transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-right animate-delay-700' : 'opacity-0'
          }`}>
            <h3 className="text-2xl font-bold text-white mb-6 animate-slide-blur">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="animate-fade-in-up animate-delay-200">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 text-white placeholder-slate-400 hover-glow"
                    placeholder="Your name"
                  />
                </div>
                <div className="animate-fade-in-up animate-delay-300">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 text-white placeholder-slate-400 hover-glow"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="animate-fade-in-up animate-delay-400">
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 text-white placeholder-slate-400 hover-glow"
                  placeholder="What's this about?"
                />
              </div>

              <div className="animate-fade-in-up animate-delay-500">
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 text-white placeholder-slate-400 resize-vertical hover-glow"
                  placeholder="Tell me about your project or question..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-3d w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-lift animate-fade-in-up animate-delay-700 ${
                  isSubmitting
                    ? 'bg-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/25 animate-gradient-shift'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="loading-dots">Sending</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;