import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  FileText, 
  Code, 
  Cpu, 
  Wrench, 
  Award, 
  BookOpen, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  MapPin,
  Download,
  Terminal,
  XCircle,
  Image as ImageIcon,
  Video,
  Youtube,
  Bot,
  Users,
  TrendingUp,
  Zap,
  Maximize2
} from 'lucide-react';

// --- COMPONENTS ---

// 1. Particle Background Component (Canvas)
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(96, 165, 250, 0.2)'; // Blue-400 with low opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 10, 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Connect particles
        for (let j = index; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 - distance / 1500})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10 opacity-50" />;
};

// 2. Scroll Animation Component
const FadeInSection = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    });
    
    const { current } = domRef;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

// 3. Project Modal Component with Lightbox
const ProjectModal = ({ project, onClose }) => {
  const [lightboxMedia, setLightboxMedia] = useState(null);

  if (!project) return null;

  return (
    <>
      {/* --- LIGHTBOX OVERLAY --- */}
      {lightboxMedia && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 transition-all animate-in fade-in duration-200" onClick={() => setLightboxMedia(null)}>
          <button 
            onClick={() => setLightboxMedia(null)}
            className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700 hover:text-blue-400 transition-colors border border-slate-700 z-50"
          >
            <X size={28} />
          </button>
          
          <div className="relative max-w-full max-h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {lightboxMedia.type === 'video' ? (
              <video 
                src={lightboxMedia.src} 
                controls 
                autoPlay 
                className="max-w-[90vw] max-h-[80vh] rounded-lg border border-slate-700 shadow-2xl" 
              />
            ) : (
              <img 
                src={lightboxMedia.src} 
                alt={lightboxMedia.label} 
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg border border-slate-700 shadow-2xl" 
              />
            )}
            <div className="mt-4 px-4 py-2 bg-slate-900/80 rounded-full text-slate-200 text-sm border border-slate-700 backdrop-blur-sm">
              {lightboxMedia.label}
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN MODAL --- */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
          
          {/* Header */}
          <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 shrink-0">
            <div>
              <h3 className="text-2xl font-bold text-slate-100">{project.title}</h3>
              <span className="text-blue-400 font-mono text-sm">{project.date}</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white">
              <XCircle size={24} />
            </button>
          </div>

          {/* Body (Scrollable) */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">{project.fullDescription}</p>
            
            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-blue-300 rounded-full text-sm border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* --- VIDEO SECTION (YouTube or Local) --- */}
            {(project.youtubeId || project.video) && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  {project.youtubeId ? <Youtube size={20} className="text-red-500" /> : <Video size={20} className="text-blue-400" />}
                  <span className="font-semibold text-slate-200">Project Footage</span>
                </div>
                
                <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-black w-full aspect-video">
                  {project.youtubeId ? (
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${project.youtubeId}`} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video controls className="w-full h-full" src={project.video}>
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
            )}

            {/* Resources / Assets Area - Only show if items exist */}
            {(project.hasReport || (project.galleryImages && project.galleryImages.length > 0)) && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Project Documentation</h4>
                
                <div className="grid gap-3">
                  {project.hasReport && (
                    <a href={project.reportLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group">
                      <div className="p-2 bg-blue-900/30 text-blue-400 rounded-lg group-hover:text-white transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">Technical Design Report</div>
                        <div className="text-xs text-slate-500">PDF Documentation</div>
                      </div>
                      <ExternalLink size={16} className="ml-auto text-slate-500 group-hover:text-blue-400" />
                    </a>
                  )}

                  {/* Gallery Images/Videos (Dynamic) */}
                  {project.galleryImages && project.galleryImages.length > 0 && (
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-3 mb-3">
                        <ImageIcon size={20} className="text-blue-400" />
                        <span className="font-semibold text-slate-200">Gallery <span className="text-slate-500 font-normal text-sm ml-2">(Tap to enlarge)</span></span>
                      </div>
                      <div className={`grid gap-3 ${project.galleryImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                          {project.galleryImages.map((media, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => setLightboxMedia(media)}
                              className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-slate-600 border border-slate-800 overflow-hidden relative group cursor-zoom-in hover:border-blue-500/50 transition-all"
                            >
                              {media.type === 'video' ? (
                                <div className="relative w-full h-full">
                                  <video 
                                    src={media.src} 
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                                    muted
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                    <div className="p-2 bg-black/50 rounded-full text-white">
                                      <Video size={24} />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <img 
                                    src={media.src} 
                                    alt={media.label} 
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" 
                                  />
                                  <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                    <Maximize2 size={14} />
                                  </div>
                                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-xs text-center text-white">
                                    {media.label}
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700 bg-slate-950/50 flex justify-end shrink-0">
            <button onClick={onClose} className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  // PROJECT DATA 
  const projects = [
    {
      id: 1,
      title: "Quantum Casino",
      date: "Oct 2025",
      shortDesc: "A Qiskit Fall Fest Hackathon project utilizing quantum randomness.",
      fullDescription: "Co-developed a 'Quantum Casino' application that leverages true quantum randomness rather than pseudo-random number generators. We implemented quantum circuits in Qiskit, applying Hadamard gates to qubits to create superposition, then measuring the collapse to determine game outcomes. This project demonstrates the practical application of quantum principles in software.",
      tags: ["Python", "Qiskit", "Quantum Computing", "Hackathon"],
      icon: Cpu,
      hasReport: false, 
      galleryImages: [], // No images for this project
      video: null, 
      youtubeId: null, 
      reportLink: "#"
    },
    {
      id: 2,
      title: "FIRST Tech Challenge (FTC)",
      date: "Aug 2022 - May 2025",
      shortDesc: "Lead Programmer & Club President. Engineered autonomous robot control systems.",
      fullDescription: "As Club President and Lead Programmer for Teams 6373 & 6374, I engineered 100% of the robot's codebase in Java using Android Studio. I developed complex autonomous algorithms using computer vision and PID control loops to ensure precise movement. Additionally, I directed the complete robot build cycle, from CAD modeling in Onshape to 3D printing custom components and soldering electronics. My leadership resulted in 400% club growth and recognition as a Finalist Alliance (2023).",
      tags: ["Java", "Android Studio", "Onshape CAD", "PID Control", "Robotics"],
      icon: Bot, 
      hasReport: false, 
      galleryImages: [
        { type: 'image', src: "robot2025.png", label: "2025 Robot CAD Model" },
        { type: 'image', src: "robot2024.jpg", label: "2024 Competition Robot" },
        { type: 'image', src: "robot2023.jpg", label: "2023 Early Competition Robot" },
        // Example of how to add a small video to the gallery:
        { type: 'video', src: "ftc-short-clip.mp4", label: "Autonomous Test" }
      ],
      video: null,
      youtubeId: null, 
      reportLink: "#"
    },
    {
      id: 3,
      title: "Seaperch: Underwater ROV",
      date: "Mar 2025",
      shortDesc: "Authored a comprehensive Technical Design Report for an underwater robot.",
      fullDescription: "Authored and edited a comprehensive Technical Design Report for the Seaperch Underwater ROV competition. This involved translating the team's entire engineering design process into professional documentation, creating data visualizations in Google Sheets to justify design choices, and ensuring technical accuracy. Resulted in a 5th place finish in the Technical Design category.",
      tags: ["Technical Writing", "Data Visualization", "Robotics", "Google Sheets"],
      icon: FileText,
      hasReport: true, 
      galleryImages: [
        { type: 'image', src: "seaperch.jpg", label: "Submerged ROV" }
      ],
      video: null,
      youtubeId: "XRPzDltYngE", 
      reportLink: "technical_design_report.pdf" 
    },
    {
      id: 4,
      title: "MESA Machine: Wind-Powered Car",
      date: "Sep 2023 - Apr 2024",
      shortDesc: "Engineered a Rube-Goldberg-style machine from recyclable materials.",
      fullDescription: "Served as Project Lead for a team engineering a complex Rube-Goldberg machine. The device was constructed exclusively from recyclable materials and featured a wind-powered vehicle mechanism. I managed the design iteration process and served as the lead troubleshooter during high-pressure competition environments, performing real-time repairs to ensure operation.",
      tags: ["Engineering", "Fabrication", "Team Leadership", "Mechanics"],
      icon: Wrench,
      hasReport: false, 
      galleryImages: [
        { type: 'video', src: "mesa_machine.mp4", label: "Testing" }
      ],
      video: null,
      youtubeId: "bjFtC3qG3AQ", 
      reportLink: "#"
    }
  ];

  // Helper functions to open specific projects from Experience section
  const openFTCProject = () => {
    const project = projects.find(p => p.id === 2);
    if (project) setSelectedProject(project);
  };

  const openMESAProject = () => {
    const project = projects.find(p => p.id === 4);
    if (project) setSelectedProject(project);
  };

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'education', 'skills', 'awards'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const NavLink = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
        activeSection === id ? 'text-blue-400' : 'text-slate-400'
      }`}
    >
      {label}
    </button>
  );

  const MobileNavLink = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`block w-full text-left px-4 py-3 text-lg font-medium border-l-4 transition-all duration-300 ${
        activeSection === id ? 'border-blue-500 bg-blue-900/20 text-blue-400' : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200 relative">
      
      {/* 1. Interactive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50 h-16">
        <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="text-xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-slate-800 rounded flex items-center justify-center text-white font-bold">DL</div>
            <span>Darren Luu</span>
          </div>

          <div className="hidden md:flex gap-8">
            <NavLink id="home" label="Home" />
            <NavLink id="about" label="About" />
            <NavLink id="experience" label="Experience" />
            <NavLink id="projects" label="Projects" />
            <NavLink id="education" label="Education" />
            <NavLink id="skills" label="Skills" />
          </div>

          <button 
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`md:hidden fixed top-16 left-0 right-0 bg-slate-900 border-b border-slate-800 shadow-xl transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[80vh]' : 'max-h-0'}`}>
          <div className="py-2">
            <MobileNavLink id="home" label="Home" />
            <MobileNavLink id="about" label="About" />
            <MobileNavLink id="experience" label="Experience" />
            <MobileNavLink id="projects" label="Projects" />
            <MobileNavLink id="education" label="Education" />
            <MobileNavLink id="skills" label="Skills" />
            <MobileNavLink id="awards" label="Awards" />
          </div>
        </div>
      </nav>

      <main className="pt-16 relative z-10">
        
        {/* Hero Section */}
        <section id="home" className="min-h-[90vh] flex items-center justify-center px-6 relative overflow-hidden">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-blue-400 uppercase bg-blue-900/20 rounded-full border border-blue-900/50">
                Computer Engineering Student
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight">
                Building the Future with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">Code & Hardware</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                UCLA Computer Engineering Undergraduate. Valedictorian. <br className="hidden md:block"/>
                Passionate about robotics, quantum computing, and software engineering.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:darrenluu2025@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-900/20">
                  <Mail size={18} /> Contact Me
                </a>
                
                <a href="resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-lg font-medium hover:bg-slate-700 border border-slate-700 transition-all hover:-translate-y-0.5">
                  <Download size={18} /> Resume
                </a>

                <a href="https://github.com/TheMoistDino" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-lg font-medium hover:bg-slate-700 border border-slate-700 transition-all hover:-translate-y-0.5">
                  <Github size={18} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/dwluu/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-lg font-medium hover:bg-slate-700 border border-slate-700 transition-all hover:-translate-y-0.5">
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* --- STATS BAR --- */}
        <section className="py-10 border-y border-slate-800 bg-slate-900/30">
          <FadeInSection>
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                  <Award className="text-yellow-500" size={24} /> 4.0
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wide">UCLA GPA</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                  <TrendingUp className="text-green-400" size={24} /> 400%
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wide">Club Growth</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                  <Users className="text-blue-400" size={24} /> 50+
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wide">Students Mentored</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                  <Zap className="text-purple-400" size={24} /> 100%
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wide">Robot Code Engineered</div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-slate-900/50">
          <FadeInSection>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400"><FileText size={24} /></div>
                <h2 className="text-3xl font-bold text-slate-100">About Me</h2>
                <div className="h-px bg-slate-700 flex-grow ml-4 opacity-50"></div>
              </div>

              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-6 text-lg leading-relaxed text-slate-300">
                  <p>
                    I am currently a first-year <strong>Computer Engineering</strong> student at <strong>UCLA</strong> with a strong foundation in both software and hardware principles. My academic journey began at Paloma Valley High School where I graduated as Valedictorian with a 4.0 GPA.
                  </p>
                  <p>
                    My passion lies at the intersection of innovation and engineering. My technical journey has evolved from mechanical fabrication (Wind-Powered Car) to complex electro-mechanical systems (FTC Robotics), and now into the realms of quantum computing and machine learning.
                  </p>
                  <p>
                    Whether I'm programming autonomous path following, analyzing quantum states, or mentoring the next generation of engineers, I am driven by a curiosity to understand how things work and the technical skills to build them better.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Quick Info Card */}
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                    <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Quick Info</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <MapPin size={16} className="text-blue-400 mt-1" />
                        <span>Los Angeles, CA 90024</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Mail size={16} className="text-blue-400 mt-1" />
                        <span className="break-all">darrenluu2025@gmail.com</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <BookOpen size={16} className="text-blue-400 mt-1" />
                        <span>4.0 GPA @ UCLA</span>
                      </li>
                    </ul>
                  </div>

                  {/* CURRENTLY LEARNING - TERMINAL STYLE */}
                  <div className="bg-slate-950 rounded-xl border border-slate-700 shadow-xl overflow-hidden font-mono">
                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                      <Terminal size={14} className="text-green-400" />
                      <span className="text-xs text-slate-400">status.log</span>
                      <div className="flex gap-1.5 ml-auto">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                      </div>
                    </div>
                    <div className="p-4 text-xs md:text-sm space-y-3">
                      <div>
                        <span className="text-purple-400">➜</span> <span className="text-blue-400">~</span> <span className="text-slate-200">current_focus</span>
                        <div className="text-slate-400 mt-1 pl-4">
                          "Computer Vision & Machine Learning"
                        </div>
                      </div>
                      <div>
                        <span className="text-purple-400">➜</span> <span className="text-blue-400">~</span> <span className="text-slate-200">active_project</span>
                        <div className="text-slate-400 mt-1 pl-4">
                          <span className="text-yellow-300">IEEE Donkey Racers</span> @ UCLA
                        </div>
                        <div className="text-slate-500 mt-1 pl-4 italic">
                          Building an autonomous driving car using Python & Git.
                        </div>
                      </div>
                      <div className="animate-pulse">
                        <span className="text-purple-400">➜</span> <span className="text-slate-200">_</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6">
          <FadeInSection>
            <div className="max-w-4xl mx-auto">
               <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400"><Wrench size={24} /></div>
                <h2 className="text-3xl font-bold text-slate-100">Experience</h2>
                <div className="h-px bg-slate-700 flex-grow ml-4 opacity-50"></div>
              </div>
              
              <div className="space-y-12">
                {/* Job 1 - FTC */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-[147px] top-0 bottom-0 w-px bg-slate-800"></div>
                  <div className="md:flex gap-12 group">
                    <div className="md:w-32 md:text-right pt-1">
                      <span className="text-sm font-bold text-blue-400 block">Aug 2022 - May 2025</span>
                      <span className="text-xs text-slate-500">Menifee, CA</span>
                    </div>
                    <div className="hidden md:block absolute left-[142px] top-2 w-3 h-3 rounded-full bg-blue-500 border-4 border-slate-950"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">Club President & Lead Programmer</h3>
                      <h4 className="text-lg text-slate-400 mb-4">FIRST Tech Challenge (FTC) Robotics</h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-400 marker:text-slate-600 mb-4">
                        <li>Engineered 100% of the team's robot code in <strong>Java</strong> using Android Studio, creating complex algorithms for autonomous and tele-operated periods.</li>
                        <li>Spearheaded 400% club growth (5 to 20 students) and established two competitive teams (6373 & 6374).</li>
                        <li>Directed all phases of robot build cycle: <strong>CAD modeling in Onshape</strong>, 3D printing, and soldering.</li>
                        <li>Led team to Finalist Alliance (2023) and won 3rd Place Think and Innovate Award (2024).</li>
                      </ul>
                      
                      {/* LINK TO FTC PROJECT */}
                      <button 
                        onClick={openFTCProject}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors border border-blue-900/50 bg-blue-900/20 px-4 py-2 rounded-lg"
                      >
                        <Bot size={16} />
                        See the Engineering & Robot Details
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Job 2 - Peer Tutor */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-[147px] top-0 bottom-0 w-px bg-slate-800"></div>
                  <div className="md:flex gap-12 group">
                    <div className="md:w-32 md:text-right pt-1">
                      <span className="text-sm font-bold text-blue-400 block">Feb 2024 - Mar 2024</span>
                      <span className="text-xs text-slate-500">Remote</span>
                    </div>
                    <div className="hidden md:block absolute left-[142px] top-2 w-3 h-3 rounded-full bg-slate-700 border-4 border-slate-950"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">Online Peer Tutor</h3>
                      <h4 className="text-lg text-slate-400 mb-4">Schoolhouse.world (SAT Math)</h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-400 marker:text-slate-600">
                        <li>Led a 4-week SAT Math Bootcamp for a diverse cohort of 9 students from 4 countries.</li>
                        <li>Designed personalized curricula based on weekly practice quiz data analysis.</li>
                        <li>Fostered a collaborative global learning environment via Zoom.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Job 3 - High School Peer Tutor */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-[147px] top-0 bottom-0 w-px bg-slate-800"></div>
                  <div className="md:flex gap-12 group">
                    <div className="md:w-32 md:text-right pt-1">
                      <span className="text-sm font-bold text-blue-400 block">Aug 2023 - Jun 2024</span>
                      <span className="text-xs text-slate-500">Menifee, CA</span>
                    </div>
                    <div className="hidden md:block absolute left-[142px] top-2 w-3 h-3 rounded-full bg-slate-700 border-4 border-slate-950"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">High School Peer Tutor</h3>
                      <h4 className="text-lg text-slate-400 mb-4">AP Calculus AB</h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-400 marker:text-slate-600">
                        <li>Mentored 50+ juniors and seniors in complex topics (derivatives, integrals, limits).</li>
                        <li>Analyzed 500+ student quizzes to identify misconceptions and tailor instructional material.</li>
                        <li>Produced comprehensive review videos and worksheets for AP exam preparation.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Job 4 - MESA Machine */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-[147px] top-0 bottom-0 w-px bg-slate-800"></div>
                  <div className="md:flex gap-12 group">
                    <div className="md:w-32 md:text-right pt-1">
                      <span className="text-sm font-bold text-blue-400 block">Sep 2023 - Apr 2024</span>
                      <span className="text-xs text-slate-500">Menifee, CA</span>
                    </div>
                    <div className="hidden md:block absolute left-[142px] top-2 w-3 h-3 rounded-full bg-purple-500 border-4 border-slate-950"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">Project Lead</h3>
                      <h4 className="text-lg text-slate-400 mb-4">MESA Machine: Wind-Powered Car</h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-400 marker:text-slate-600 mb-4">
                        <li>Engineered a Rube-Goldberg-style machine exclusively from recyclable materials.</li>
                        <li>Served as the lead troubleshooter during competitions, performing real-time repairs to ensure operation.</li>
                        <li>Led team to 1st Place in the Southern California Regional MESA Day for 9th/10th grade (Highest division).</li>
                      </ul>

                      {/* LINK TO MESA PROJECT */}
                      <button 
                        onClick={openMESAProject}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors border border-blue-900/50 bg-blue-900/20 px-4 py-2 rounded-lg"
                      >
                        <Wrench size={16} />
                        See the Engineering Details
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-slate-900/30">
          {/* ... existing code ... */}
          <FadeInSection>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400"><Code size={24} /></div>
                <h2 className="text-3xl font-bold text-slate-100">Projects</h2>
                <div className="h-px bg-slate-700 flex-grow ml-4 opacity-50"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all group hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 flex flex-col cursor-pointer"
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-slate-700 rounded-lg text-blue-400 group-hover:bg-blue-900/30 group-hover:text-blue-300 transition-colors">
                          <project.icon size={24} />
                        </div>
                        <span className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">{project.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                      <p className="text-slate-400 mb-4 text-sm flex-grow">
                        {project.shortDesc}
                      </p>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded">{tag}</span>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-slate-700 flex justify-between items-center text-xs">
                          <span className="text-blue-400 font-medium">
                            {(project.video || project.youtubeId) ? "Click for details & video" : "Click for details"}
                          </span>
                          <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 px-6">
          <FadeInSection>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400"><BookOpen size={24} /></div>
                <h2 className="text-3xl font-bold text-slate-100">Education</h2>
                <div className="h-px bg-slate-700 flex-grow ml-4 opacity-50"></div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start hover:bg-slate-800 transition-colors">
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-slate-100">University of California, Los Angeles (UCLA)</h3>
                      <span className="text-blue-400 font-mono text-sm whitespace-nowrap bg-blue-900/20 px-3 py-1 rounded-full border border-blue-900/50">Exp. Jun 2029</span>
                    </div>
                    <div className="text-lg text-slate-300 mb-2">B.S. in Computer Engineering</div>
                    <div className="text-slate-400 mb-4">GPA: 4.0</div>
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Relevant Coursework</div>
                      <div className="flex flex-wrap gap-2">
                        {['Intro to CS (COM SCI 31)', 'Differential Equations (MATH 33B)'].map((course, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-900 rounded-full text-sm text-slate-300 border border-slate-700">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors">
                    <h3 className="text-lg font-bold text-slate-100 mb-1">Mt. San Jacinto Community College</h3>
                    <p className="text-blue-400 text-sm mb-2">Concurrent Enrollment | Jun 2024 - Jun 2025</p>
                    <p className="text-slate-400 text-sm mb-4">GPA: 4.0</p>
                    <div className="text-xs text-slate-500 space-y-1">
                      <p>• Multivariable Calculus (MATH 213)</p>
                      <p>• Linear Algebra (MATH 218)</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors">
                    <h3 className="text-lg font-bold text-slate-100 mb-1">Paloma Valley High School</h3>
                    <p className="text-blue-400 text-sm mb-2">High School Diploma | Aug 2021 - Jun 2025</p>
                    <p className="text-slate-400 text-sm mb-4">GPA: 4.0 | Valedictorian</p>
                    <div className="text-xs text-slate-500 space-y-1">
                      <p>• AP Physics C: Mechanics (5)</p>
                      <p>• AP Calculus AB & BC (5)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 bg-slate-900/50">
          <FadeInSection>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400"><Cpu size={24} /></div>
                <h2 className="text-3xl font-bold text-slate-100">Technical Skills</h2>
                <div className="h-px bg-slate-700 flex-grow ml-4 opacity-50"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Programming</h3>
                  <ul className="space-y-2">
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Java</li>
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Python</li>
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Qiskit</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Software</h3>
                  <ul className="space-y-2">
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Onshape (CAD)</li>
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Google Workspace</li>
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Microsoft Office</li>
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Android Studio</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Fabrication</h3>
                  <ul className="space-y-2">
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> 3D Printing</li>
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Soldering</li>
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Prototyping</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Languages</h3>
                  <ul className="space-y-2">
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> English (Native)</li>
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div> Spanish</li>
                    <li className="text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div> Cantonese</li>
                  </ul>
                </div>

              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Awards Section */}
        <section id="awards" className="py-24 px-6">
          <FadeInSection>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400"><Award size={24} /></div>
                <h2 className="text-3xl font-bold text-slate-100">Awards & Honors</h2>
                <div className="h-px bg-slate-700 flex-grow ml-4 opacity-50"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                
                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors">
                  <Award className="text-yellow-500 shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-slate-200 font-bold">Valedictorian</h3>
                    <p className="text-sm text-slate-500">Paloma Valley High School</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors">
                  <Award className="text-blue-400 shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-slate-200 font-bold">AP Scholar with Distinction</h3>
                    <p className="text-sm text-slate-500">Academic Excellence</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors">
                  <Award className="text-blue-400 shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-slate-200 font-bold">California State Seal of Biliteracy</h3>
                    <p className="text-sm text-slate-500">Language Proficiency</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors">
                  <Award className="text-purple-400 shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-slate-200 font-bold">Riverside Cty Exceptional Graduate</h3>
                    <p className="text-sm text-slate-500">Honoree 2025</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors md:col-span-2">
                  <Award className="text-green-400 shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-slate-200 font-bold">Robotics & Engineering Awards</h3>
                    <ul className="text-sm text-slate-500 mt-1 grid md:grid-cols-2 gap-x-4">
                      <li>• 1st Place MESA Machine: Wind-Powered Car</li>
                      <li>• 2nd Place Innovate Award 2025 (FTC)</li>
                      <li>• 3rd Place Think and Innovate Award 2024 (FTC)</li>
                      <li>• Finalist Alliance 2023 (FTC)</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </FadeInSection>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800 text-center text-slate-500 text-sm relative z-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Darren Luu. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:darrenluu2025@gmail.com" className="hover:text-blue-400 transition-colors">Email</a>
            <a href="https://github.com/TheMoistDino" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/dwluu/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
