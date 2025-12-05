import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');

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
          response = `Command not found: ${cmd}. Type \"help\" for list.`;
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

export default InteractiveTerminal;
