import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import { tasksData } from '../data/tasksData';

// ===== LIGHTWEIGHT SYNTAX HIGHLIGHTER (single-pass tokenizer) =====
const highlight = (code, category) => {
  // Step 1: escape HTML entities
  const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const sp = (color, text) => `<span style="color:${color}">${text}</span>`;
  const escaped = esc(code);

  // ── JavaScript / React ──────────────────────────────────────────────────
  if (category === 'javascript' || category === 'react') {
    const KW = new Set([
      'import','export','default','from','return','const','let','var',
      'function','async','await','if','else','for','while','of','in',
      'new','class','extends','null','undefined','true','false',
      'typeof','this','switch','case','break','continue','try','catch',
      'finally','throw','delete','void','=>',
    ]);
    const HOOKS = new Set([
      'useState','useEffect','useRef','useContext','useCallback',
      'useMemo','useReducer','useLayoutEffect','React','Component',
    ]);
    // Single alternation — each char matched at most once
    return escaped.replace(
      /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+\.?\d*\b)|(&lt;\/?[A-Za-z][A-Za-z0-9.]*\b|\/&gt;|&gt;)|(\b[a-zA-Z_$][\w$]*\b)/g,
      (m, comment, str, num, jsx, word) => {
        if (comment) return sp('#6a9955', m);
        if (str)     return sp('#ce9178', m);
        if (num)     return sp('#b5cea8', m);
        if (jsx)     return sp('#4ec9b0', m);
        if (word) {
          if (KW.has(word))    return sp('#569cd6', m);
          if (HOOKS.has(word)) return sp('#4ec9b0', m);
          // Detect function calls: word immediately followed by '(' in original
          // We check the next char in escaped after this match
        }
        return m;
      }
    );
  }

  // ── HTML ────────────────────────────────────────────────────────────────
  if (category === 'html') {
    return escaped.replace(
      /(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?[a-zA-Z][a-zA-Z0-9-]*)|(\/?\s*&gt;)|([a-zA-Z:_-]+)(?=\s*=\s*")|("[^"]*")/g,
      (m, comment, tag, close, attr, str) => {
        if (comment) return sp('#6a9955', m);
        if (tag)     return sp('#569cd6', m);
        if (close)   return sp('#569cd6', m);
        if (attr)    return sp('#9cdcfe', m);
        if (str)     return sp('#ce9178', m);
        return m;
      }
    );
  }

  // ── CSS ─────────────────────────────────────────────────────────────────
  if (category === 'css') {
    // Process line-by-line to separate selectors from declarations
    return escaped.split('\n').map(line => {
      // Block comments
      if (/^\s*\/\*/.test(line) || /\*\//.test(line))
        return sp('#6a9955', line);

      // Closing brace alone
      if (/^\s*\}\s*$/.test(line))
        return line.replace(/\}/, sp('#ffd700', '}'));

      // Selector line: contains '{' and no ':' before '{'
      const braceIdx = line.indexOf('{');
      if (braceIdx !== -1) {
        const before = line.slice(0, braceIdx);
        const rest   = line.slice(braceIdx);
        if (!before.includes(':')) {
          return sp('#d7ba7d', before) + sp('#ffd700', '{') + rest.slice(1);
        }
      }

      // Declaration line: prop: value;
      return line.replace(
        /^(\s*)([\w-]+)(\s*:\s*)(.*?)(;?\s*)$/,
        (_, indent, prop, colon, val, semi) => {
          // Colorize values: hex colors, numbers with units, quoted strings
          const coloredVal = val.replace(
            /(#[0-9a-fA-F]{3,8})|(\b\d+\.?\d*(?:px|em|rem|%|vh|vw|fr|s|ms|deg|turn)?\b)|("(?:[^"]*)")/g,
            (m, hex, num, str) => {
              if (hex || num) return sp('#b5cea8', m);
              if (str)        return sp('#ce9178', m);
              return m;
            }
          );
          return `${indent}${sp('#9cdcfe', prop)}${colon}${sp('#ce9178', coloredVal)}${semi}`;
        }
      );
    }).join('\n');
  }

  return escaped;
};

const TasksPage = () => {
  const { t, theme } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTask, setActiveTask] = useState(null);
  const [code, setCode] = useState('');
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [runClicked, setRunClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('lumina_completed_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const iframeRef = useRef(null);
  const editorRef = useRef(null);
  const highlightRef = useRef(null);

  // Load task
  const handleSelectTask = (task) => {
    setActiveTask(task);
    setCode(task.initialCode);
    setTestResults([]);
    setRunClicked(false);
    setSuccess(false);
  };

  const handleBackToDashboard = () => {
    setActiveTask(null);
  };

  const handleResetCode = () => {
    if (activeTask) {
      setCode(activeTask.initialCode);
      setTestResults([]);
      setRunClicked(false);
      setSuccess(false);
    }
  };

  // Debounced live preview rendering
  useEffect(() => {
    if (!activeTask || !iframeRef.current) return;

    const timer = setTimeout(() => {
      setRenderTrigger(prev => prev + 1);
    }, 600);

    return () => clearTimeout(timer);
  }, [code, activeTask]);

  // Execute rendering in iframe
  useEffect(() => {
    if (!activeTask || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeBg = theme === 'light' ? '#FFFFFF' : '#0F0F1A';
    const iframeTextColor = theme === 'light' ? '#0F172A' : '#FFFFFF';
    const iframeBorderColor = theme === 'light' ? '#E2E8F0' : '#1e1e3a';
    const iframePreBg = theme === 'light' ? '#F1F5F9' : '#131326';

    if (activeTask.category === 'html' || activeTask.category === 'css') {
      // HTML/CSS renderer
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 12px; font-family: sans-serif; color: ${iframeTextColor}; background: ${iframeBg}; }
          </style>
        </head>
        <body>
          ${code}
        </body>
        </html>
      `);
      doc.close();
    } else if (activeTask.category === 'javascript') {
      // JS renderer with console capture
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 12px; font-family: monospace; color: ${iframeTextColor}; background: ${iframeBg}; word-wrap: break-word; }
            h3 { color: #8b5cf6; margin-top: 0; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase; }
            pre { background: ${iframePreBg}; padding: 10px; border-radius: 6px; border: 1px solid ${iframeBorderColor}; color: #06b6d4; font-size: 12px; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h3>Console Output (JS)</h3>
          <div id="console"></div>
          <script>
            const consoleDiv = document.getElementById('console');
            window.logMessages = [];
            console.log = function(...args) {
              window.logMessages.push(args.join(' '));
              const p = document.createElement('pre');
              p.textContent = args.join(' ');
              consoleDiv.appendChild(p);
            };
            try {
              ${code}
            } catch (err) {
              const p = document.createElement('pre');
              p.style.color = '#ef4444';
              p.textContent = 'Xatolik: ' + err.toString();
              consoleDiv.appendChild(p);
            }
          </script>
        </body>
        </html>
      `);
      doc.close();
    } else if (activeTask.category === 'react') {
      // React & Babel compiler
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            body { margin: 0; padding: 12px; font-family: sans-serif; color: ${iframeTextColor}; background: ${iframeBg}; }
            .box { transition: all 0.3s ease; }
            .user-item { padding: 8px 12px; background: ${iframePreBg}; margin: 4px 0; border-radius: 6px; border: 1px solid ${iframeBorderColor}; color: #a855f7; list-style-type: none; font-weight: bold; }
            ul { padding-left: 0; }
            button { background: #7c3aed; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; transition: background 0.2s; }
            button:hover { background: #6d28d9; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <div id="error-display" style="color: #ef4444; font-family: monospace; font-size: 12px; margin-top: 10px; white-space: pre-wrap;"></div>
          
          <script type="text/javascript">
            window.addEventListener('error', function(e) {
              document.getElementById('error-display').textContent = 'Runtime error: ' + e.message;
            });
          </script>

          <script type="text/babel">
            try {
              document.getElementById('error-display').textContent = '';
              
              ${code}

              let ComponentToRender = null;
              if (typeof Counter !== 'undefined') ComponentToRender = Counter;
              else if (typeof TextPreview !== 'undefined') ComponentToRender = TextPreview;
              else if (typeof ToggleBox !== 'undefined') ComponentToRender = ToggleBox;
              else if (typeof TodoList !== 'undefined') ComponentToRender = TodoList;
              else if (typeof UserList !== 'undefined') ComponentToRender = UserList;
              
              if (!ComponentToRender && typeof exports !== 'undefined' && exports.default) {
                ComponentToRender = exports.default;
              }
              
              if (ComponentToRender) {
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(ComponentToRender));
              } else {
                document.getElementById('error-display').textContent = 'Komponent topilmadi. Iltimos, topshiriq shartida ko\\'rsatilgan nom bilan komponent yarating (masalan: Counter, TextPreview, ToggleBox, TodoList, UserList).';
              }
            } catch (err) {
              document.getElementById('error-display').textContent = 'Babel transpilyatsiya xatosi: ' + err.toString();
            }
          </script>
        </body>
        </html>
      `);
      doc.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderTrigger, activeTask, theme]);

  // Validate Code
  const handleRunValidation = async () => {
    if (!iframeRef.current || !activeTask) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    const win = iframeRef.current.contentWindow;

    const results = [];
    let allPassed = true;

    for (const test of activeTask.tests) {
      try {
        const passed = await test.check(doc, win);
        results.push({ id: test.id, description: test.description, passed });
        if (!passed) allPassed = false;
      } catch (err) {
        results.push({ id: test.id, description: test.description, passed: false, error: err.message });
        allPassed = false;
      }
    }

    setTestResults(results);
    setRunClicked(true);

    if (allPassed) {
      const updated = [...completedTasks];
      if (!updated.includes(activeTask.id)) {
        updated.push(activeTask.id);
        setCompletedTasks(updated);
        localStorage.setItem('lumina_completed_tasks', JSON.stringify(updated));
      }
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  // Synchronize Scroll for Line Numbers AND highlight overlay
  const handleScroll = (e) => {
    const lineNumbers = document.getElementById('line-numbers');
    if (lineNumbers) lineNumbers.scrollTop = e.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  // Override Tab character
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = code.substring(0, start) + "  " + code.substring(end);
      setCode(newValue);

      // Restore cursor position
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Difficulty Badges Colors
  const difficultyColors = {
    Beginner: 'text-green-400 bg-green-400/10 border-green-500/20',
    Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20',
    Junior: 'text-purple-400 bg-purple-400/10 border-purple-500/20'
  };

  // Category Icons & Headers
  const categories = [
    { id: 'all', name: 'Barchasi', icon: '⚡' },
    { id: 'html', name: 'HTML', icon: '🖥️' },
    { id: 'css', name: 'CSS', icon: '🎨' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'react', name: 'React.js', icon: '⚛️' }
  ];

  const filteredTasks = activeCategory === 'all' 
    ? tasksData 
    : tasksData.filter(t => t.category === activeCategory);

  const overallProgress = Math.round((completedTasks.length / tasksData.length) * 100) || 0;

  // Jump to Next Task
  const handleNextTask = () => {
    const currentIndex = tasksData.findIndex(t => t.id === activeTask.id);
    if (currentIndex !== -1 && currentIndex < tasksData.length - 1) {
      handleSelectTask(tasksData[currentIndex + 1]);
    } else {
      setActiveTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      {!activeTask ? (
        // DASHBOARD VIEW
        <div className="max-w-6xl mx-auto fade-up">
          {/* Header */}
          <div className="text-center mb-10 mt-4">
            <span className="text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-600/10 px-3 py-1 rounded-full border border-purple-500/20">
              {t('tasksSubtitle')}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">
              Lumina <span className="text-gradient">Task Arena</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              {t('tasksDesc')}
            </p>
          </div>

          {/* Progress Section */}
          <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex items-center justify-center bg-purple-600/15 border border-purple-500/30 rounded-full">
                <span className="text-white font-extrabold text-lg">{overallProgress}%</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Mening progressim</h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  Jami 20 ta topshiriqdan <b>{completedTasks.length}</b> tasi muvaffaqiyatli yakunlandi.
                </p>
              </div>
            </div>
            {/* Quick Stat indicators */}
            <div className="flex flex-wrap gap-3 sm:gap-4 w-full md:w-auto">
              {['html', 'css', 'javascript', 'react'].map(cat => {
                const totalInCat = tasksData.filter(t => t.category === cat).length;
                const completedInCat = tasksData.filter(t => t.category === cat && completedTasks.includes(t.id)).length;
                return (
                  <div key={cat} className="flex-1 min-w-[90px] bg-[#07070F]/55 border border-[#1E1E3A] px-3 py-2 rounded-xl text-center">
                    <span className="text-xs text-gray-500 uppercase font-semibold">{cat}</span>
                    <div className="text-white font-extrabold mt-0.5">{completedInCat}/{totalInCat}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 bg-[#13132A]/50 p-1.5 rounded-xl border border-[#1E1E3A] max-w-max mx-auto md:mx-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => handleSelectTask(task)}
                  className={`bg-[#13132A] border transition-all duration-300 p-5 rounded-2xl flex items-center justify-between cursor-pointer group hover:scale-[1.01] ${
                    isCompleted 
                      ? 'border-purple-600/30 bg-purple-950/5' 
                      : 'border-[#1E1E3A] hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Category indicator icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#07070F] border border-[#1E1E3A] flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                      {task.category === 'html' && '🖥️'}
                      {task.category === 'css' && '🎨'}
                      {task.category === 'javascript' && '🟨'}
                      {task.category === 'react' && '⚛️'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${difficultyColors[task.difficulty]}`}>
                          {task.difficulty}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-extrabold uppercase bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            ✓ Bajarildi
                          </span>
                        )}
                      </div>
                      <h4 className="text-white font-bold text-base mt-1.5 group-hover:text-purple-400 transition-colors">
                        {task.title}
                      </h4>
                    </div>
                  </div>

                  <button className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isCompleted 
                      ? 'bg-[#0D0D1A] text-purple-400 border border-purple-500/20' 
                      : 'bg-purple-600 text-white hover:bg-purple-500 shadow-md shadow-purple-600/15'
                  }`}>
                    {isCompleted ? 'Qayta urinish' : 'Kodni yozish →'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // INTERACTIVE WORKSPACE VIEW (LEETCODE STYLE)
        <div className="max-w-7xl mx-auto fade-up">
          {/* Header Workspace */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToDashboard}
                className="px-3 py-2 text-xs font-bold text-gray-400 hover:text-white border border-[#1E1E3A] bg-[#13132A] rounded-xl hover:border-purple-500/50 transition-all flex items-center gap-1.5"
              >
                ← Orqaga
              </button>
              <h2 className="text-white font-extrabold text-lg sm:text-xl">
                {activeTask.title}
              </h2>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${difficultyColors[activeTask.difficulty]}`}>
                {activeTask.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                className="px-3.5 py-2 text-xs font-semibold text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 rounded-xl transition-all"
              >
                Kodni tiklash 🔄
              </button>
            </div>
          </div>

          {/* SPLIT SCREEN WORKSPACE LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* LEFT SIDE: Task Description & Requirements */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-base mb-3 border-b border-[#1E1E3A] pb-2 flex items-center gap-2">
                    <span>📝</span> Topshiriq sharti
                  </h3>
                  <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {activeTask.description}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                    <span>🎯</span> Tekshirish mezonlari
                  </h3>
                  <div className="space-y-2.5">
                    {activeTask.tests.map((test) => {
                      const ran = runClicked;
                      const testRes = testResults.find(r => r.id === test.id);
                      const passed = testRes?.passed;

                      return (
                        <div
                          key={test.id}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                            !ran 
                              ? 'bg-[#07070F]/40 border-[#1E1E3A] text-gray-400' 
                              : passed 
                                ? 'bg-green-600/10 border-green-500/20 text-green-400' 
                                : 'bg-red-600/10 border-red-500/20 text-red-400'
                          }`}
                        >
                          <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            !ran 
                              ? 'bg-gray-600 text-white' 
                              : passed 
                                ? 'bg-green-600 text-white' 
                                : 'bg-red-600 text-white'
                          }`}>
                            {!ran ? '•' : passed ? '✓' : '✗'}
                          </span>
                          <span className="flex-1">{test.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status alerts */}
                {runClicked && (
                  <div className="mt-5">
                    {success ? (
                      <div className="bg-green-600/10 border border-green-500/25 p-4 rounded-xl text-center">
                        <span className="text-2xl">🏆</span>
                        <h4 className="text-green-400 font-extrabold text-sm mt-1">Barcha testlardan o'tdingiz!</h4>
                        <p className="text-gray-400 text-xs mt-1">Ushbu topshiriq muvaffaqiyatli yakunlandi.</p>
                        <button
                          onClick={handleNextTask}
                          className="mt-3 px-4 py-2 bg-green-500 text-white text-xs font-bold rounded-lg transition-all"
                        >
                          Keyingi topshiriq ➔
                        </button>
                      </div>
                    ) : (
                      <div className="bg-red-600/10 border border-red-500/25 p-4 rounded-xl text-center">
                        <span className="text-2xl">💪</span>
                        <h4 className="text-red-400 font-extrabold text-sm mt-1">Ba'zi testlarda xatolik mavjud</h4>
                        <p className="text-gray-400 text-xs mt-1">Kodingizni qaytadan tekshirib ko'ring.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Big Validate Button */}
                <button
                  onClick={handleRunValidation}
                  className="mt-6 w-full py-3.5 bg-purple-600 text-white font-extrabold rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-purple-600/35 transition-all text-sm flex items-center justify-center gap-2 group"
                >
                  <span>🚀</span> Kodni tekshirish
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: IDE (Live preview top, editor bottom) */}
            <div className="lg:col-span-7 flex flex-col gap-4 dark-editor">
              
              {/* LIVE OUTPUT PREVIEW */}
              <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl overflow-hidden flex flex-col h-[260px] shadow-lg">
                <div className="bg-[#07070F] border-b border-[#1E1E3A] px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-white text-xs font-bold tracking-wider uppercase">Live Natija</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-semibold">Sandbox Iframe</span>
                </div>
                <div className="flex-1 bg-white">
                  <iframe
                    ref={iframeRef}
                    title="Live Preview"
                    sandbox="allow-scripts allow-same-origin"
                    className="w-full h-full border-none bg-[#0F0F1A]"
                  />
                </div>
              </div>

                {/* MONOSPACE CODE EDITOR WITH SYNTAX HIGHLIGHTING */}
                <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-[380px] shadow-lg">
                  <div className="bg-[#07070F] border-b border-[#1E1E3A] px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 text-xs">📄</span>
                      <span className="text-white text-xs font-bold font-mono">{activeTask.fileName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="text-[10px] text-gray-400 font-mono">UTF-8</span>
                    </div>
                  </div>

                  <div className="flex-1 flex items-stretch relative overflow-hidden bg-[#07070F]/30">
                    {/* Line Numbers gutter */}
                    <div
                      id="line-numbers"
                      className="w-12 bg-[#07070F]/70 border-r border-[#1E1E3A] py-4 text-right pr-3 select-none text-gray-600 font-mono text-sm leading-6 overflow-hidden flex-shrink-0"
                    >
                      {code.split('\n').map((_, idx) => (
                        <div key={idx}>{idx + 1}</div>
                      ))}
                    </div>

                    {/* Highlight + Textarea wrapper */}
                    <div className="flex-1 relative overflow-hidden">
                      {/* Highlighted code layer (behind textarea) */}
                      <pre
                        ref={highlightRef}
                        aria-hidden="true"
                        className="absolute inset-0 py-4 px-4 font-mono text-sm leading-6 overflow-auto whitespace-pre pointer-events-none m-0"
                        style={{
                          tabSize: 2,
                          background: 'transparent',
                          // Do NOT set color:transparent here — that hides span colors too!
                          scrollbarWidth: 'none',   // Firefox: hide scrollbar on pre
                          msOverflowStyle: 'none',  // IE/Edge
                        }}
                        dangerouslySetInnerHTML={{
                          __html: highlight(code, activeTask.category) + '\n'
                        }}
                      />
                      {/* Editable transparent textarea (on top) */}
                      <textarea
                        ref={editorRef}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onScroll={handleScroll}
                        onKeyDown={handleKeyDown}
                        spellCheck="false"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="absolute inset-0 w-full h-full bg-transparent py-4 px-4 font-mono text-sm leading-6 focus:outline-none resize-none overflow-auto whitespace-pre"
                        style={{
                          tabSize: 2,
                          color: 'transparent',
                          caretColor: '#c792ea',
                          WebkitTextFillColor: 'transparent',
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-[#07070F]/90 border-t border-[#1E1E3A] px-4 py-2 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                    <span>Tab: 2 spaces</span>
                    <span>Lines: {code.split('\n').length}</span>
                  </div>
                </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
