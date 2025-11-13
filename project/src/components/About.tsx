import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, Briefcase, Code, Database, BarChart, Sigma, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const skills = [
    { name: 'Python', level: 90, icon: Code, color: 'from-yellow-400 to-yellow-600' },
    { name: 'SQL', level: 85, icon: Database, color: 'from-blue-400 to-blue-600' },
    { name: 'Power BI', level: 88, icon: BarChart, color: 'from-orange-400 to-orange-600' },
    { name: 'Excel', level: 92, icon: BarChart, color: 'from-green-400 to-green-600' },
    { name: 'Machine Learning', level: 85, icon: BarChart, color: 'from-purple-400 to-purple-600' },
    { name: 'Predictive Analytics', level: 82, icon: BarChart, color: 'from-pink-400 to-pink-600' },
    { name: 'SAS', level: 85, icon: Sigma, color: 'from-slate-400 to-slate-600' },
    { name: 'Spark', level: 80, icon: Sparkles, color: 'from-red-400 to-orange-500' },
  ];

  const education = [
    {
      degree: 'MBA in Business Intelligence & Analytics',
      institution: 'Narsee Monjee Institute of Management Studies, Mumbai',
      year: '2024-2025',
      description: 'Specializing in data-driven business strategy and advanced analytics'
    },
    {
      degree: 'B.Tech in Computer Engineering',
      institution: 'Narsee Monjee Institute of Management Studies, Mumbai',
      year: '2020-2024',
      description: 'Strong foundation in computer science and programming'
    },
    {
      degree: 'Senior Secondary Education',
      institution: 'Siddharth Public School, Deoli',
      year: '78.8%',
      description: 'Focused on science curriculum with emphasis on mathematics and computer studies'
    }
  ];

  const experience = [
    {
      title: 'Analytics & Backend Software Intern',
      company: 'NeuroSync AI',
      type: 'Internship',
      description: 'Contributing to backend development using FastAPI framework by database integration and LangGraph optimization to improve workflow efficiency and system performance.'
    },
    {
      title: 'Microsoft Future Ready Talent',
      company: 'Microsoft',
      type: 'Certification Program',
      description: 'Advanced training in cloud technologies and data analytics'
    },
    {
      title: 'Data Analytics Intern',
      company: 'Bank of Baroda',
      type: 'Internship',
      description: 'Developed financial dashboards and performed risk analysis'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills-section')) {
              setSkillsAnimated(true);
            }
            
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-animate py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll" data-index="0">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000 ${
            visibleItems.includes(0) ? 'animate-fade-in-down' : 'opacity-0'
          }`}>
            <span className="gradient-text-animated">
              About Me
            </span>
          </h2>
          <p className={`text-xl text-slate-300 max-w-3xl mx-auto transition-all duration-1000 ${
            visibleItems.includes(0) ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'
          }`}>
            Passionate about turning complex data into actionable insights that drive business growth
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Education */}
          <div className="space-y-8 animate-on-scroll" data-index="1">
            <div className={`flex items-center space-x-3 mb-6 transition-all duration-1000 ${
              visibleItems.includes(1) ? 'animate-slide-blur' : 'opacity-0'
            }`}>
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg animate-rotate-in animate-delay-200">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            {education.map((edu, index) => (
              <div 
                key={index}
                className={`bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 card-hover gpu-accelerated ${
                  visibleItems.includes(1) ? `animate-fade-in-left animate-delay-${(index + 1) * 200}` : 'opacity-0'
                }`}
              >
                <h4 className="text-xl font-semibold text-cyan-400 mb-2">{edu.degree}</h4>
                <p className="text-slate-300 font-medium mb-1">{edu.institution}</p>
                <p className="text-slate-500 text-sm mb-3">{edu.year}</p>
                <p className="text-slate-400">{edu.description}</p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-8 animate-on-scroll" data-index="2">
            <div className={`flex items-center space-x-3 mb-6 transition-all duration-1000 ${
              visibleItems.includes(2) ? 'animate-slide-blur animate-delay-200' : 'opacity-0'
            }`}>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg animate-rotate-in animate-delay-400">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Experience</h3>
            </div>

            {experience.map((exp, index) => (
              <div 
                key={index}
                className={`bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 card-hover gpu-accelerated ${
                  visibleItems.includes(2) ? `animate-fade-in-right animate-delay-${(index + 1) * 200}` : 'opacity-0'
                }`}
              >
                <h4 className="text-xl font-semibold text-orange-400 mb-2">{exp.title}</h4>
                <p className="text-slate-300 font-medium mb-1">{exp.company}</p>
                <p className="text-slate-500 text-sm mb-3">{exp.type}</p>
                <p className="text-slate-400">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-8 skills-section animate-on-scroll" data-index="3">
          <div className={`flex items-center justify-center space-x-3 mb-8 transition-all duration-1000 ${
            visibleItems.includes(3) ? 'animate-bounce-in' : 'opacity-0'
          }`}>
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className={`bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover-lift gpu-accelerated ${
                  skillsAnimated ? `animate-delay-${index * 200}` : 'opacity-0'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} animate-delay-${index * 100}`}>
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-white">{skill.name}</span>
                  </div>
                  <span className="text-slate-400 font-mono">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-2000 ease-out skill-bar ${
                      skillsAnimated ? 'animate-delay-' + (index * 300) : ''
                    }`}
                    style={{ 
                      width: skillsAnimated ? `${skill.level}%` : '0%',
                      '--skill-width': `${skill.level}%`
                    } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;