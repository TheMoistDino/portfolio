import React, { useEffect, useRef, useState } from 'react';
import { X, XCircle, Github, FileText, Image as ImageIcon, Video, Youtube, Maximize2, ExternalLink } from 'lucide-react';

const focusableSelector = 'a[href], area[href], input:not([disabled]), button:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ProjectModal = ({ project, onClose }) => {
  const [lightboxMedia, setLightboxMedia] = useState(null);
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    // focus the modal container
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelector(focusableSelector);
        if (focusable) focusable.focus();
        else modalRef.current.focus();
      }
    }, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxMedia) setLightboxMedia(null);
        else onClose();
      }

      if (e.key === 'Tab' && modalRef.current) {
        // trap focus
        const focusable = Array.from(modalRef.current.querySelectorAll(focusableSelector)).filter(el => el.offsetParent !== null);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const currentIndex = focusable.indexOf(document.activeElement);
        if (e.shiftKey && currentIndex === 0) {
          focusable[focusable.length - 1].focus();
          e.preventDefault();
        } else if (!e.shiftKey && currentIndex === focusable.length - 1) {
          focusable[0].focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      // restore focus
      if (previouslyFocused.current && previouslyFocused.current.focus) previouslyFocused.current.focus();
    };
  }, [lightboxMedia, onClose]);

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
              <img src={lightboxMedia.src} alt={lightboxMedia.label} loading="lazy" className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg border border-slate-700 shadow-2xl" />
            )}
            <div className="mt-4 px-4 py-2 bg-slate-900/80 rounded-full text-slate-200 text-sm border border-slate-700 backdrop-blur-sm">
              {lightboxMedia.label}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
        <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="project-title" tabIndex={-1} className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 shrink-0">
            <div>
              <h3 id="project-title" className="text-2xl font-bold text-slate-100">{project.title}</h3>
              <span className="text-blue-400 font-mono text-sm">{project.date}</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                              className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-slate-600 border border-slate-800 overflow-hidden relative group cursor-zoom-in hover:border-blue-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                                  <img src={media.src} alt={media.label} loading="lazy" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
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
            <button onClick={onClose} className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
