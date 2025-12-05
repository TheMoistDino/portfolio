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
  Maximize2,
  FolderOpen,
  CheckCircle,
  ArrowRight,
  Copy,
  Check,
  ArrowUp,
  Smile
} from 'lucide-react';

// --- COMPONENTS ---

// 1. Particle Background Component (Canvas)
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // guard for SSR or unexpected null ref
    const ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return;
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
        // start at index+1 to avoid self-connection and duplicate lines
        for (let j = index + 1; j < particles.length; j++) {
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

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10 opacity-50 print:hidden" />;
};

// 2. Interactive Terminal Component (Updated with Donkey Racers)
const InteractiveTerminal = () => {
  const [input, setInput] = useState('');

  // Define the Status Log content as a reusable variable
  const statusLogContent = (
    <div className="my-2 p-3 bg-slate-900/50 rounded border border-slate-800 border-l-2 border-l-yellow-500">
       <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Status Log</div>
       <div className="text-slate-300">
         <span className="text-purple-400">➜</span> <span className="font-bold text-slate-200">Current Focus:</span> Computer Vision & Machine Learning
       </div>
       <div className="text-slate-300 mt-1">
         <span className="text-purple-400">➜</span> <span className="font-bold text-slate-200">Active Project:</span> <a href="https://github.com/libozaza/donkeyracers" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">IEEE Donkey Racers</a>
         <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">Early Stages</span>
       </div>
    </div>
  );

  // Initialize history with the Active Project info so it's visible immediately
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to DarrenOS v1.0.0' },
    { type: 'output', text: 'Loading current profile configuration...' },
    { type: 'output', content: statusLogContent },
    { type: 'output', text: 'Type "help" for available commands.' }
  ]);
  const scrollRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      // ignore empty submissions
      if (!cmd) {
        setInput('');
        return;
      }
      const newHistory = [...history, { type: 'input', text: input }];

      let response = '';
      let content = null;

      switch (cmd) {
        case 'help':
          response = 'Available commands: about, skills, contact, projects, current_project, clear';
          break;
        case 'about':
          response = 'I am a Computer Engineering student at UCLA focused on Robotics and Quantum Computing.';
          break;
        case 'skills':
          response = 'Core: Java, Python, C++, Onshape, Qiskit.';
          break;
        case 'contact':
          response = 'Email: darrenluu2025@gmail.com | LinkedIn: /in/dwluu';
          break;
        case 'projects':
           response = 'Check out the Projects section below! Key projects: Quantum Casino, FTC Robotics, MESA Wind Car.';
           break;
        case 'current_project':
           content = statusLogContent; // Re-display the status log
           break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          response = `Command not found: ${cmd}. Type "help" for list.`;
      }
      
      newHistory.push({ type: 'output', text: response, content: content });
      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-700 shadow-xl overflow-hidden font-mono mb-6 flex flex-col h-72">
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700 shrink-0">
        <Terminal size={14} className="text-green-400" />
        <span className="text-xs text-slate-400">interactive_terminal</span>
        <div className="flex gap-1.5 ml-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="p-4 text-xs md:text-sm space-y-2 overflow-y-auto flex-grow custom-scrollbar"
      >
        {history.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'text-blue-400' : 'text-slate-300'}`}>
            {line.type === 'input' ? '> ' : ''}
            {line.content ? line.content : line.text}
          </div>
        ))}
        <div className="flex items-center gap-2 text-purple-400">
          <span>➜</span>
          <span className="text-blue-400">~</span>
          <input 
            type="text" 
            aria-label="Terminal input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none text-slate-200 flex-grow"
            placeholder="Type command..."
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

// 3. Scroll Animation Component
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

// 4. Scroll Progress Bar
const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      // guard against division by zero on very short pages
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollWidth(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] print:hidden">
      <div 
        className="h-full bg-blue-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollWidth * 100}%` }}
      />
    </div>
  );
};

// 5. Typewriter Effect
const Typewriter = ({ text, speed = 50, className }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText(''); 
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className={className}>{displayText}</span>;
};

// 6. Project Modal
const ProjectModal = ({ project, onClose }) => {
  const [lightboxMedia, setLightboxMedia] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxMedia) setLightboxMedia(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, lightboxMedia]);

  if (!project) return null;

  return (
    <>
      {/* Lightbox */}
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
              <video src={lightboxMedia.src} controls autoPlay className="max-w-[90vw] max-h-[80vh] rounded-lg border border-slate-700 shadow-2xl" />
            ) : (
              <img src={lightboxMedia.src} alt={lightboxMedia.label} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg border border-slate-700 shadow-2xl" />
            )}
            <div className="mt-4 px-4 py-2 bg-slate-900/80 rounded-full text-slate-200 text-sm border border-slate-700 backdrop-blur-sm">
              {lightboxMedia.label}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 shrink-0">
            <div>
              <h3 className="text-2xl font-bold text-slate-100">{project.title}</h3>
              <span className="text-blue-400 font-mono text-sm">{project.date}</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white">
              <XCircle size={24} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">{project.fullDescription}</p>
            <div className="mb-8">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-blue-300 rounded-full text-sm border border-slate-700">{tag}</span>
                ))}
              </div>
            </div>
            {(project.youtubeId || project.video) && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  {project.youtubeId ? <Youtube size={20} className="text-red-500" /> : <Video size={20} className="text-blue-400" />}
                  <span className="font-semibold text-slate-200">Project Footage</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-black w-full aspect-video">
                  {project.youtubeId ? (
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${project.youtubeId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  ) : (
                    <video controls className="w-full h-full" src={project.video}>Your browser does not support the video tag.</video>
                  )}
                </div>
              </div>
            )}
            {(project.hasReport || (project.galleryImages && project.galleryImages.length > 0) || (project.codeLinks && project.codeLinks.length > 0)) && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Project Documentation</h4>
                <div className="grid gap-3">
                  {project.codeLinks && project.codeLinks.map((link, idx) => (
                    <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group">
                      <div className="p-2 bg-blue-900/30 text-blue-400 rounded-lg group-hover:text-white transition-colors"><Github size={20} /></div>
                      <div><div className="font-semibold text-slate-200">{link.label}</div><div className="text-xs text-slate-500">Source Code</div></div>
                      <ExternalLink size={16} className="ml-auto text-slate-500 group-hover:text-blue-400" />
                    </a>
                  ))}
                  {project.hasReport && (
                    <a href={project.reportLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group">
                      <div className="p-2 bg-blue-900/30 text-blue-400 rounded-lg group-hover:text-white transition-colors"><FileText size={20} /></div>
                      <div><div className="font-semibold text-slate-200">Technical Design Report</div><div className="text-xs text-slate-500">PDF Documentation</div></div>
                      <ExternalLink size={16} className="ml-auto text-slate-500 group-hover:text-blue-400" />
                    </a>
                  )}
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
                              tabIndex={0}
                              role="button"
                              aria-label={`Open ${media.label} in lightbox`}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setLightboxMedia(media); e.preventDefault(); } }}
                              className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-slate-600 border border-slate-800 overflow-hidden relative group cursor-zoom-in hover:border-blue-500/50 transition-all"
                            >
                              {media.type === 'video' ? (
                                <div className="relative w-full h-full">
                                  <video src={media.src} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" muted />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                    <div className="p-2 bg-black/50 rounded-full text-white"><Video size={24} /></div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <img src={media.src} alt={media.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
                                  <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"><Maximize2 size={14} /></div>
                                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-xs text-center text-white">{media.label}</div>
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
          <div className="p-4 border-t border-slate-700 bg-slate-950/50 flex justify-end shrink-0">
            <button onClick={onClose} className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors">Close</button>
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
  const [activeCategory, setActiveCategory] = useState('All');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // PROJECT DATA 
  const projects = [
    {
      id: 1,
      title: "Quantum Casino",
      category: "Software",
      date: "Oct 2025",
      shortDesc: "A Qiskit Fall Fest Hackathon project utilizing quantum randomness.",
      fullDescription: "Co-developed a 'Quantum Casino' application that leverages true quantum randomness rather than pseudo-random number generators. We implemented quantum circuits in Qiskit, applying Hadamard gates to qubits to create superposition, then measuring the collapse to determine game outcomes. The project was executed on IBM Quantum hardware (IBM_torino) and validated using the Qiskit Aer Simulator.",
      tags: ["Python", "Qiskit", "Quantum Computing", "Hackathon", "IBM Quantum"],
      icon: Cpu,
      hasReport: false, 
      galleryImages: [], 
      video: null, 
      youtubeId: null, 
      reportLink: "#"
    },
    {
      id: 2,
      title: "FIRST Tech Challenge (FTC)",
      category: "Robotics",
      date: "Aug 2022 - May 2025",
      shortDesc: "Lead Programmer & Club President. Engineered autonomous robot control systems.",
      fullDescription: "As Club President and Lead Programmer for Teams 6373 & 6374, I engineered 100% of the robot's codebase in Java using Android Studio. I utilized complex autonomous algorithms using computer vision and PID control loops to ensure precise movement. Additionally, I directed the complete robot build cycle, from CAD modeling in Onshape to 3D printing custom components and soldering electronics. My leadership resulted in 400% club growth and recognition as a Finalist Alliance (2023).",
      tags: ["Java", "Android Studio", "Onshape CAD", "PID Control", "Robotics"],
      icon: Bot, 
      hasReport: false,
      codeLinks: [
        { label: "2025 Robot Code (ILT)", url: "https://github.com/TheMoistDino/FtcRobotController/tree/ILT" },
        { label: "2025 Off-Season Code", url: "https://github.com/TheMoistDino/high-stakes" }
      ],
      galleryImages: [
        { type: 'image', src: "robot2025.png", label: "2025 Robot CAD Model" },
        { type: 'image', src: "robot2024.jpg", label: "2024 Competition Robot" },
        { type: 'image', src: "robot2023.jpg", label: "2023 Early Competition Robot" },
        // Example of how to add a small video to the gallery:
        { type: 'video', src: "ftc-short-clip.mp4", label: "2024 Autonomous Test" }
      ],
      video: null,
      youtubeId: null, 
      reportLink: "#"
    },
    {
      id: 3,
      title: "Seaperch: Underwater ROV",
      category: "Robotics",
      date: "Mar 2025",
      shortDesc: "Co-authored a comprehensive Technical Design Report for an underwater robot.",
      fullDescription: "Co-authored and edited a comprehensive Technical Design Report for the Seaperch Underwater ROV competition. This involved translating the team's entire engineering design process into professional documentation, creating data visualizations in Google Sheets to justify design choices, and ensuring technical accuracy. Resulted in a 5th place finish in the Technical Design category.",
      tags: ["Technical Writing", "Data Visualization", "Robotics", "Google Sheets"],
      icon: FileText,
      hasReport: true, 
      galleryImages: [
        { type: 'image', src: "seaperch.jpg", label: "Submerged ROV" }
      ],
      video: null,
      youtubeId: null, 
      reportLink: "technical_design_report.pdf" 
    },
    {
      id: 4,
      title: "MESA Machine: Wind-Powered Car",
      category: "Engineering",
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
    },
    {
      id: 5,
      title: "IEEE Donkey Racers",
      category: "Robotics",
      date: "Ongoing",
      shortDesc: "Building an autonomous driving car using Python & Git. (Early Stages)",
      fullDescription: "Currently collaborating in a team for the IEEE Donkey Racers project at UCLA. We are building an autonomous RC car using computer vision and machine learning. The project focuses on utilizing Python for the software stack and Git for version control. We are in the early stages of development, working on assembling the hardware and setting up the initial software environment for autonomous lane following.",
      tags: ["Python", "Git", "Computer Vision", "Machine Learning", "Autonomous Driving"],
      icon: Bot,
      hasReport: false,
      codeLinks: [
        { label: "Project Repository", url: "https://github.com/libozaza/donkeyracers" }
      ],
      galleryImages: [], 
      video: null,
      youtubeId: null,
      reportLink: "#"
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const categories = ['All', 'Software', 'Robotics', 'Engineering'];

  const openProject = (id) => {
    const project = projects.find(p => p.id === id);
    if (project) setSelectedProject(project);
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("darrenluu2025@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'education', 'skills', 'awards'];
      const scrollPosition = window.scrollY + 100;
      
      // Dynamic Title
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
          current = section.charAt(0).toUpperCase() + section.slice(1);
        }
      }
      
      if (current) {
        document.title = `Darren Luu | ${current}`;
      }

      // Back to top logic
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
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
    <div className="bg-slate-950 min-h-screen text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200 relative print:bg-white print:text-black">
      
      {/* 1. Scroll Progress Bar */}
      <ScrollProgress />

      {/* 2. Interactive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none print:hidden">
        <ParticleBackground />
      </div>

      {/* Accessibility Skip Link */}
      <a href="#home" className="fixed top-4 left-4 z-[100] -translate-y-20 focus:translate-y-0 bg-blue-600 text-white px-4 py-2 rounded shadow-lg transition-transform">
        Skip to Content
      </a>

      {/* Back To Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-all duration-300 z-40 print:hidden ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={20} />
      </button>

      {/* Modal Overlay */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-950/70 backdrop-blur-lg border-b border-slate-800 z-50 h-16 transition-all print:hidden">
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
              <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight min-h-[1.2em]">
                <Typewriter text="Building the Future with Code & Hardware" speed={70} />
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                UCLA Computer Engineering Undergraduate. Valedictorian. <br className="hidden md:block"/>
                Passionate about robotics, quantum computing, and software engineering.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 print:hidden">
                <a href="mailto:darrenluu2025@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-900/20">
                  <Mail size={18} /> Contact Me
                </a>
                
                <a href="resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-lg font-medium hover:bg-slate-700 border border-slate-700 transition-all hover:-translate-y-0.5">
                  <Download size={18} /> Resume
                </a>

                <a href="https://github.com/TheMoistDino" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-lg font-medium hover:bg-slate-700 border border-slate-700 transition-all hover:-translate-y-0.5">
                  <Github size={18} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/dwluu/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-lg font-medium hover:bg-slate-700 border border-slate-700 transition-all hover:-translate-y-0.5">
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* --- STATS BAR --- */}
        <section className="py-10 border-y border-slate-800 bg-slate-900/30 print:hidden">
          <FadeInSection>
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
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
                    I am currently a first-year <strong>Computer Engineering</strong> student at <strong>UCLA</strong> with a strong foundation in both software and hardware principles. My academic journey began at Paloma Valley High School where I graduated as Valedictorian.
                  </p>
                  <p>
                    My passion lies at the intersection of innovation and engineering. My technical journey has evolved from mechanical fabrication (<button onClick={() => openProject(4)} className="text-blue-400 hover:underline font-semibold print:text-black print:no-underline">Wind-Powered Car</button>) to complex electro-mechanical systems (<button onClick={() => openProject(2)} className="text-blue-400 hover:underline font-semibold print:text-black print:no-underline">FTC Robotics</button>), and now into the realms of quantum computing and machine learning.
                  </p>
                  <p>
                    Whether I'm <button onClick={() => openProject(2)} className="text-blue-400 hover:underline font-semibold print:text-black print:no-underline">programming autonomous path following</button>, <button onClick={() => openProject(1)} className="text-blue-400 hover:underline font-semibold print:text-black print:no-underline">analyzing quantum states</button>, or <button onClick={() => scrollToElement('hs-tutor')} className="text-blue-400 hover:underline font-semibold print:text-black print:no-underline">mentoring the next generation of engineers</button>, I am driven by a curiosity to understand how things work and the technical skills to build them better.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Quick Info Card */}
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl print:border-gray-300 print:bg-white print:text-black">
                    <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2 print:text-black print:border-gray-300">Quick Info</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <MapPin size={16} className="text-blue-400 mt-1 print:text-black" />
                        <span>Los Angeles, CA 90024</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Mail size={16} className="text-blue-400 mt-1 print:text-black" />
                        <span className="break-all">darrenluu2025@gmail.com</span>
                      </li>
                    </ul>
                  </div>

                  {/* INTERACTIVE TERMINAL */}
                  <div className="print:hidden">
                     <InteractiveTerminal />
                  </div>

                  {/* PERSONAL INTERESTS CARD */}
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl print:hidden">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                      <Smile className="text-yellow-400" size={20} />
                      <h3 className="text-white font-semibold">Personal Interests</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>Solving Rubik's Cubes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span>Reading Manga & Watching Anime</span>
                      </li>
                    </ul>
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
                   {/* Visual Timeline Line */}
                  <div className="hidden md:block absolute left-[147px] top-0 bottom-0 w-px bg-slate-800 print:hidden"></div>
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-[142px] top-2 w-3 h-3 rounded-full bg-blue-500 border-4 border-slate-950 print:hidden"></div>
                  
                  <div className="md:flex gap-12 group">
                    <div className="md:w-32 md:text-right pt-1 shrink-0">
                      <span className="text-sm font-bold text-blue-400 block">Aug 2022 - May 2025</span>
                      <span className="text-xs text-slate-500">Menifee, CA</span>
                    </div>
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
                        onClick={() => openProject(2)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors border border-blue-900/50 bg-blue-900/20 px-4 py-2 rounded-lg print:hidden"
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
                  <div className="hidden md:block absolute left-[147px] top-0 bottom-0 w-px bg-slate-800 print:hidden"></div>
                   <div className="hidden md:block absolute left-[142px] top-2 w-3 h-3 rounded-full bg-slate-700 border-4 border-slate-950 print:hidden"></div>

                  <div className="md:flex gap-12 group">
                    <div className="md:w-32 md:text-right pt-1 shrink-0">
                      <span className="text-sm font-bold text-blue-400 block">Feb 2024 - Mar 2024</span>
                      <span className="text-xs text-slate-500">Remote</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">Online Peer Tutor</h3>
                      <h4 className="text-lg text-slate-400 mb-4">Schoolhouse.world (SAT Math)</h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-400 marker:text-slate-600 mb-4">
                        <li>Led a 4-week SAT Math Bootcamp for a diverse cohort of 9 students from 4 countries.</li>
                        <li>Designed personalized curricula based on weekly practice quiz data analysis.</li>
                        <li>Fostered a collaborative global learning environment via Zoom.</li>
                      </ul>
                      <a 
                        href="https://schoolhouse.world/transcript/ec12e088-925f-4e9e-b32c-639d7e56bf8e" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors border border-blue-900/50 bg-blue-900/20 px-4 py-2 rounded-lg print:hidden"
                      >
                        <ExternalLink size={16} />
                        View Tutor Transcript
                      </a>
                    </div>
                  </div>
                </div>

                {/* Job 3 - High School Peer Tutor */}
                <div id="hs-tutor" className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-[147px] top-0 bottom-0 w-px bg-slate-800 print:hidden"></div>
                  <div className="hidden md:block absolute left-[142px] top-2 w-3 h-3 rounded-full bg-slate-700 border-4 border-slate-950 print:hidden"></div>

                  <div className="md:flex gap-12 group">
                    <div className="md:w-32 md:text-right pt-1 shrink-0">
                      <span className="text-sm font-bold text-blue-400 block">Aug 2023 - Jun 2024</span>
                      <span className="text-xs text-slate-500">Menifee, CA</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">High School Peer Tutor</h3>
                      <h4 className="text-lg text-slate-400 mb-4">AP Calculus AB</h4>
                      <ul className="space-y-2 list-disc list-inside text-slate-400 marker:text-slate-600 mb-4">
                        <li>Mentored 50+ juniors and seniors in complex topics (derivatives, integrals, limits).</li>
                        <li>Analyzed 500+ student quizzes to identify misconceptions and tailor instructional material.</li>
                        <li>Produced comprehensive review videos and worksheets for AP exam preparation.</li>
                      </ul>
                      <a 
                        href="https://drive.google.com/drive/folders/0B7CWGSWLUvy0fjZBZjJyNVF3dFY0VWwtdlY0SjM5cndNb0ZZZWVNcDNHZXZRLXZ0WnZQVTg?resourcekey=0-wBGDOgGJ-6i-eh3ph-Pqjw&usp=drive_link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors border border-blue-900/50 bg-blue-900/20 px-4 py-2 rounded-lg print:hidden"
                      >
                        <FolderOpen size={16} />
                        View Tutoring Resources
                      </a>
                    </div>
                  </div>
                </div>

                {/* Job 4 - MESA Machine */}
                <div className="relative pl-8 md:pl-0">
                  <div className="hidden md:block absolute left-[147px] top-0 bottom-0 w-px bg-slate-800 print:hidden"></div>
                  <div className="hidden md:block absolute left-[142px] top-2 w-3 h-3 rounded-full bg-purple-500 border-4 border-slate-950 print:hidden"></div>

                  <div className="md:flex gap-12 group">
                    <div className="md:w-32 md:text-right pt-1 shrink-0">
                      <span className="text-sm font-bold text-blue-400 block">Sep 2023 - Apr 2024</span>
                      <span className="text-xs text-slate-500">Menifee, CA</span>
                    </div>
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
                        onClick={() => openProject(4)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors border border-blue-900/50 bg-blue-900/20 px-4 py-2 rounded-lg print:hidden"
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
          <FadeInSection>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400"><Code size={24} /></div>
                  <h2 className="text-3xl font-bold text-slate-100">Projects</h2>
                </div>
                {/* Category Filter */}
                <div className="flex gap-2 p-1 bg-slate-900/50 rounded-lg border border-slate-800 print:hidden">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        activeCategory === cat 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px bg-slate-700 w-full mb-8 opacity-50"></div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open project ${project.title} details`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedProject(project); e.preventDefault(); } }}
                    className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all group hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 flex flex-col cursor-pointer print:break-inside-avoid"
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
                    <p className="text-slate-400 text-sm mb-4">GPA: 4.5 | Valedictorian</p>
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
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Learned from: UCLA, COM SCI 31"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> C++</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: FTC Robotics"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Java</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: Quantum Casino, Donkey Racers"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Python</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: Quantum Casino"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Qiskit</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Software</h3>
                  <ul className="space-y-2">
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: FTC Robotics"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Onshape (CAD)</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: Seaperch ROV"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Google Workspace</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: Seaperch ROV"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Microsoft Office</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: FTC Robotics"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Android Studio</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Learned from: UCLA, COM SCI 31"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Visual Studio</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Fabrication</h3>
                  <ul className="space-y-2">
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: FTC Robotics, MESA"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> 3D Printing</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: FTC Robotics"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Soldering</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors cursor-help" title="Used in: MESA Wind Car"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> Prototyping</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Languages</h3>
                  <ul className="space-y-2">
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div> English (Native)</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors"><div className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:scale-150 transition-transform"></div> Spanish</li>
                    <li className="text-slate-400 flex items-center gap-2 group hover:text-blue-300 transition-colors"><div className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:scale-150 transition-transform"></div> Cantonese</li>
                  </ul>
                </div>

              </div>

              {/* --- CERTIFICATIONS SECTION --- */}
              <div className="mt-12 pt-8 border-t border-slate-800">
                <h3 className="text-lg font-semibold text-slate-200 mb-6">Certifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex items-start gap-3 hover:border-green-500/50 transition-colors group hover:shadow-lg hover:shadow-green-500/10">
                    <CheckCircle className="text-green-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                    <div>
                      <div className="font-semibold text-slate-200">Onshape Parametric Design</div>
                      <div className="text-xs text-slate-500">CAD Certification</div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex items-start gap-3 hover:border-green-500/50 transition-colors group hover:shadow-lg hover:shadow-green-500/10">
                    <CheckCircle className="text-green-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                    <div>
                      <div className="font-semibold text-slate-200">Schoolhouse.world Certification</div>
                      <div className="text-xs text-slate-500">SAT Math & English, AP Calculus, Physics</div>
                    </div>
                  </div>
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
                
                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors group hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10">
                  <Award className="text-yellow-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                  <div>
                    <h3 className="text-slate-200 font-bold">Valedictorian</h3>
                    <p className="text-sm text-slate-500">Paloma Valley High School</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors group hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
                  <Award className="text-blue-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                  <div>
                    <h3 className="text-slate-200 font-bold">AP Scholar with Distinction</h3>
                    <p className="text-sm text-slate-500">Academic Excellence</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors group hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
                  <Award className="text-blue-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                  <div>
                    <h3 className="text-slate-200 font-bold">California State Seal of Biliteracy (Spanish)</h3>
                    <p className="text-sm text-slate-500">Language Proficiency</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors group hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
                  <Award className="text-purple-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                  <div>
                    <h3 className="text-slate-200 font-bold">Riverside Cty Exceptional Graduate</h3>
                    <p className="text-sm text-slate-500">Honoree 2025</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3 hover:bg-slate-800 transition-colors md:col-span-2 group hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
                  <Award className="text-green-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
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

        {/* --- FINAL CTA SECTION --- */}
        <section className="py-20 bg-slate-900 border-t border-slate-800 text-center px-6">
          <FadeInSection>
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Ready to Collaborate?</h2>
              <p className="text-slate-400 text-lg">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your team.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:darrenluu2025@gmail.com" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:-translate-y-1 shadow-lg shadow-blue-900/20"
                >
                  <Mail size={20} />
                  Get In Touch
                  <ArrowRight size={20} />
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-full transition-all border border-slate-700 group"
                >
                  {emailCopied ? <Check size={20} className="text-green-400" /> : <Copy size={20} className="text-slate-400 group-hover:text-white" />}
                  {emailCopied ? "Email Copied!" : "Copy Email"}
                </button>
              </div>
            </div>
          </FadeInSection>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800 text-center text-slate-500 text-sm relative z-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <p>© {new Date().getFullYear()} Darren Luu. All rights reserved.</p>
            <p className="text-xs text-slate-600 mt-1">Built with React & Tailwind CSS</p>
          </div>
          <div className="flex gap-6">
            <a href="mailto:darrenluu2025@gmail.com" className="hover:text-blue-400 transition-colors">Email</a>
            <a href="https://github.com/TheMoistDino" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/dwluu/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;