import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState<number[]>([]);

  const projects = [
    {
      id: 1,
      title: 'Sales Analytics Dashboard',
      description: 'Interactive Excel dashboard analyzing sales performance across multiple stores with KPI tracking',
      techStack: ['Excel', 'Pivot Table', 'Power Query'],
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      features: ['Real-time KPI monitoring', 'Regional performance analysis', 'Sales forecasting', 'Interactive filters']
    },
    {
      id: 2,
      title: 'HR Analytics Dashboard',
      description: 'Interactive Power BI dashboard analyzing attrition reasons across multiple departments with KPI tracking.',
      techStack: ['Power BI', 'DAX', 'Power Query'],
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: PieChart,
      color: 'from-purple-500 to-pink-500',
      features: ['K-means clustering', 'Customer lifetime value', 'Behavioral analysis', 'Automated reporting']
    },
    {
      id: 3,
      title: 'Loan Prediction',
      description: 'Loan amount prediction using linear regression and Excel',
      techStack: ['Excel', 'VBA', 'SQL', 'Power Query'],
      image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      features: ['Risk scoring models', 'Stress testing', 'Regulatory compliance', 'Automated alerts']
    },
    {
      id: 4,
      title: 'Heart Disease Prediction',
      description: 'Heart disease Predictive analytics using Machine Learning algorithms like Logistic Regression, KNN, Random Forest and Python',
      techStack: ['Python', 'Machine Learning', 'Scikit-Learn', 'Pandas', 'Seaborn', 'Matplotlib'],
      image: 'https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Activity,
      color: 'from-orange-500 to-red-500',
      features: ['Multi-channel attribution', 'ROI optimization', 'A/B testing analysis', 'Customer journey mapping']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            const index = parseInt(entry.target.getAttribute('data-project-index') || '0');
            if (!isNaN(index)) {
              setTimeout(() => {
                setProjectsVisible(prev => [...prev, index]);
              }, index * 200);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.project-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleProjectClick = (index: number) => {
    setActiveProject(index);
  };

  return (
    <section id="projects" className="section-animate py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-down' : 'opacity-0'
          }`}>
            <span className="gradient-text-animated">
              Featured Projects
            </span>
          </h2>
          <p className={`text-xl text-slate-300 max-w-3xl mx-auto transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'
          }`}>
            Explore my analytics dashboard projects that showcase data storytelling and business intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Project Cards */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                data-project-index={index}
                onClick={() => handleProjectClick(index)}
                className={`project-animate p-6 rounded-2xl border transition-all duration-500 cursor-pointer card-hover gpu-accelerated ${
                  activeProject === index
                    ? 'bg-slate-800/80 border-cyan-500/50 shadow-lg shadow-cyan-500/10 animate-glow-pulse'
                    : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600/50'
                } ${
                  projectsVisible.includes(index) ? 'animate-fade-in-left' : 'opacity-0'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color} animate-delay-${index * 200}`}>
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded-full border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover-bounce ${
                            projectsVisible.includes(index) ? `animate-scale-in animate-delay-${(techIndex + 1) * 100}` : ''
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Project Preview */}
          <div className={`sticky top-24 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-right animate-delay-500' : 'opacity-0'
          }`}>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover-lift gpu-accelerated">
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={projects[activeProject].image}
                  alt={projects[activeProject].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in-up">
                  {projects[activeProject].title}
                </h3>

                <div className="space-y-4 mb-6">
                  <h4 className="text-lg font-semibold text-cyan-400 animate-fade-in-left">Key Features</h4>
                  <ul className="space-y-2">
                    {projects[activeProject].features.map((feature, index) => (
                      <li 
                        key={index} 
                        className={`flex items-center space-x-2 text-slate-300 animate-fade-in-right animate-delay-${index * 100}`}
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button className="btn-3d flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all duration-300 hover-lift">
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </button>
                  <button className="btn-3d flex items-center space-x-2 px-4 py-2 border border-slate-600 hover:border-cyan-400 rounded-lg transition-all duration-300 hover-lift hover:text-cyan-400 hover-glow">
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;