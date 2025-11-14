import React, { useState, useEffect } from 'react';
import { Download, FileText, Star } from 'lucide-react';

const Resume: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [highlightsVisible, setHighlightsVisible] = useState<number[]>([]);

  const handleDownload = () => {
    // In a real implementation, this would trigger the actual resume download
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1jI-VqRln8txBXKW6MCUYyCIifmjCteIG/view?usp=sharing'; // This would be the actual resume file
    link.download = 'Yash_Goyal_Resume.pdf';
    link.click();
  };

  const highlights = [
    'B.Tech in Computer Engineering + MBA in Business Intelligence',
    'Expertise in Python, SQL, Power BI, and Excel',
    'Microsoft Future Ready Talent Certified',
    'Banking Industry Experience (Bank of Baroda)',
    'Multiple Analytics Dashboard Projects',
    'Strong Business Intelligence Background'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Animate highlights one by one
            highlights.forEach((_, index) => {
              setTimeout(() => {
                setHighlightsVisible(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector('#resume');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="resume" className="section-animate py-20 bg-slate-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-down' : 'opacity-0'
          }`}>
            <span className="gradient-text-animated">
              My Resume
            </span>
          </h2>
          <p className={`text-xl text-slate-300 max-w-3xl mx-auto transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'
          }`}>
            Download my complete resume to learn more about my experience and qualifications
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Resume Preview */}
            <div className={`relative transition-all duration-1000 ${
              isVisible ? 'animate-fade-in-left animate-delay-500' : 'opacity-0'
            }`}>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 card-hover gpu-accelerated hover-glow">
                <div className="flex items-center space-x-4 mb-6 animate-slide-blur">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white animate-fade-in-right">Yash Goyal</h3>
                    <p className="text-cyan-400 animate-fade-in-right animate-delay-200">Data/Business Analyst</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className={`text-lg font-semibold text-white flex items-center space-x-2 transition-all duration-1000 ${
                    isVisible ? 'animate-bounce-in animate-delay-700' : 'opacity-0'
                  }`}>
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>Key Highlights</span>
                  </h4>
                  <ul className="space-y-3">
                    {highlights.map((highlight, index) => (
                      <li 
                        key={index} 
                        className={`flex items-start space-x-3 text-slate-300 transition-all duration-500 ${
                          highlightsVisible.includes(index) ? 'animate-fade-in-left' : 'opacity-0'
                        }`}
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm hover:text-white transition-colors duration-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700/30 transition-all duration-1000 ${
                  isVisible ? 'animate-scale-in animate-delay-1000' : 'opacity-0'
                }`}>
                  <p className="text-sm text-slate-400 text-center animate-fade-in-up">
                    Complete details including projects, certifications, and technical skills
                  </p>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className={`text-center lg:text-left space-y-8 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in-right animate-delay-700' : 'opacity-0'
            }`}>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white animate-fade-in-up">Ready to Download?</h3>
                <p className="text-lg text-slate-300 leading-relaxed animate-fade-in-up animate-delay-200">
                  Get the full details of my professional journey, including detailed project descriptions, 
                  technical competencies, and career achievements in data analytics and business intelligence.
                </p>
              </div>

              <div className="space-y-6">
                <button
                  onClick={handleDownload}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative group w-full lg:w-auto animate-bounce-in animate-delay-1000"
                >
                  <div className={`
                    btn-3d flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg
                    bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700
                    transition-all duration-300 hover-lift animate-gradient-shift
                    ${isHovered ? 'animate-pulse-3d' : ''}
                  `}>
                    <Download className="w-6 h-6 transition-transform duration-300" />
                    <span>Download Resume</span>
                  </div>
                </button>

                <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-slate-400 animate-fade-in-up animate-delay-1000">
                  <span className="hover:text-cyan-400 transition-colors duration-300">PDF Format</span>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span className="hover:text-cyan-400 transition-colors duration-300">2 Pages</span>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span className="hover:text-cyan-400 transition-colors duration-300">Updated Dec 2024</span>
                </div>
              </div>

              <div className={`p-6 bg-slate-900/30 backdrop-blur-sm rounded-xl border border-slate-700/30 hover-glow transition-all duration-1000 ${
                isVisible ? 'animate-scale-in animate-delay-1000' : 'opacity-0'
              }`}>
                <p className="text-sm text-slate-400 mb-2">
                  <strong className="text-cyan-400 animate-fade-in-right">What's included:</strong>
                </p>
                <ul className="text-sm text-slate-400 space-y-1">
                  {[
                    'Detailed work experience and internships',
                    'Complete educational background',
                    'Technical skills and certifications',
                    'Project portfolio with descriptions',
                    'Contact information and references'
                  ].map((item, index) => (
                    <li 
                      key={index}
                      className={`hover:text-slate-300 transition-colors duration-300 animate-fade-in-left animate-delay-${(index + 1) * 100}`}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;