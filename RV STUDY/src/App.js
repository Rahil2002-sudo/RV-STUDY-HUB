import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  BookOpen, 
  MessageCircle, 
  CheckSquare, 
  AlertCircle,
  X,
  Save,
  Filter,
  LayoutGrid,
  Sun,
  Moon,
  Globe,
  Briefcase
} from 'lucide-react';

// --- Global Styles for Animations & Background ---
const globalStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes spin-earth {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  }
  .glass-panel-dark {
    background: rgba(17, 24, 39, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }
  .earth-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    pointer-events: none;
    opacity: 0.15;
  }
`;

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', size = 'md', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-emerald-600/90 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-400/20 backdrop-blur-md",
    secondary: "bg-white/40 hover:bg-white/60 text-emerald-900 border border-white/50 shadow-sm backdrop-blur-sm dark:bg-black/40 dark:text-emerald-100 dark:border-white/10 dark:hover:bg-black/60",
    danger: "bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/20 dark:text-red-400",
    ghost: "text-emerald-800 hover:bg-emerald-500/10 dark:text-emerald-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "p-2.5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', style = {} }) => (
  <div 
    className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${className}`}
    style={style}
  >
    {children}
  </div>
);

const Badge = ({ children, color = 'emerald' }) => {
  const colors = {
    emerald: "bg-emerald-100/80 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700",
    blue: "bg-blue-100/80 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700",
    purple: "bg-purple-100/80 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700",
    amber: "bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700",
    rose: "bg-rose-100/80 text-rose-800 border-rose-200 dark:bg-rose-900/50 dark:text-rose-300 dark:border-rose-700",
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm shadow-sm ${colors[color] || colors.emerald}`}>
      {children}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md animate-[fade-in-up_0.3s_ease-out]">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/50 dark:border-gray-700 transform transition-all">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
            {title}
          </h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Animated Earth Component ---
const SpinningEarth = () => (
  <div className="earth-container">
    <svg viewBox="0 0 500 500" className="w-[800px] h-[800px] animate-[spin-earth_60s_linear_infinite]">
      <defs>
        <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
        </radialGradient>
      </defs>
      <circle cx="250" cy="250" r="240" fill="url(#globeGradient)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
      <ellipse cx="250" cy="250" rx="240" ry="80" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" transform="rotate(0 250 250)" />
      <ellipse cx="250" cy="250" rx="240" ry="80" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" transform="rotate(45 250 250)" />
      <ellipse cx="250" cy="250" rx="240" ry="80" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" transform="rotate(90 250 250)" />
      <ellipse cx="250" cy="250" rx="240" ry="80" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" transform="rotate(135 250 250)" />
      <circle cx="250" cy="250" r="160" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.1" />
      <circle cx="250" cy="250" r="80" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.1" />
    </svg>
  </div>
);

// --- Main Application ---

const defaultGroups = [
  // --- 1. Managerial Accounting (Blue) ---
  { id: 1, name: "Managerial Accounting", category: "Classes", link: "", notes: "Practice Q3 from Chapter 4.", pinned: true, color: "blue" },
  { id: 2, name: "Project: Accounting", category: "Projects", link: "", notes: "Financial analysis due Friday.", pinned: false, color: "blue" },

  // --- 2. Business Research Methods (Purple) ---
  { id: 3, name: "Business Research Methods", category: "Classes", link: "", notes: "Read methodology section.", pinned: false, color: "purple" },
  { id: 4, name: "Project: Research", category: "Projects", link: "", notes: "Survey questionnaire draft.", pinned: true, color: "purple" },

  // --- 3. Marketing Management (Emerald) ---
  { id: 5, name: "Marketing Management", category: "Classes", link: "", notes: "Case study discussion tomorrow.", pinned: true, color: "emerald" },
  { id: 6, name: "Project: Marketing", category: "Projects", link: "", notes: "Competitor analysis slides.", pinned: false, color: "emerald" },

  // --- 4. Mgmt & Org Behaviour (Amber) ---
  { id: 7, name: "Mgmt & Org Behaviour", category: "Classes", link: "", notes: "Submit assignment 2.", pinned: false, color: "amber" },
  { id: 8, name: "Project: OB", category: "Projects", link: "", notes: "Roleplay script preparation.", pinned: false, color: "amber" },

  // --- 5. Statistics (Blue) ---
  { id: 9, name: "Statistics", category: "Classes", link: "", notes: "Bring calculator for test.", pinned: true, color: "blue" },
  { id: 10, name: "Project: Statistics", category: "Projects", link: "", notes: "Data cleaning complete.", pinned: false, color: "blue" },

  // --- 6. Economics for Managers (Emerald) ---
  { id: 11, name: "Economics for Managers", category: "Classes", link: "", notes: "Demand/Supply curves recap.", pinned: false, color: "emerald" },
  { id: 12, name: "Project: Economics", category: "Projects", link: "", notes: "Market trend report.", pinned: false, color: "emerald" },

  // --- 7. Yoga (Amber) ---
  { id: 13, name: "Yoga Class", category: "Classes", link: "", notes: "Bring mat. Morning session.", pinned: false, color: "amber" },
  { id: 14, name: "Project: Wellness/Yoga", category: "Projects", link: "", notes: "Health journal submission.", pinned: false, color: "amber" },

  // --- 8. IT Skills for Managers (Purple) ---
  { id: 15, name: "IT Skills for Managers", category: "Classes", link: "", notes: "Excel formulas test.", pinned: false, color: "purple" },
  { id: 16, name: "Project: IT Skills", category: "Projects", link: "", notes: "Database implementation.", pinned: false, color: "purple" },

  // --- Unofficial ---
  { id: 99, name: "Section B - Lunch Gang", category: "Social", link: "", notes: "Canteen at 1 PM?", pinned: false, color: "rose" }
];

const categories = [
  { id: 'all', label: 'All Groups', icon: LayoutGrid },
  { id: 'Classes', label: 'Study Subjects', icon: BookOpen },
  { id: 'Projects', label: 'Project Teams', icon: Briefcase },
  { id: 'Social', label: 'Unofficial', icon: MessageCircle },
];

export default function StudyGroupHub() {
  // --- 1. DATA PERSISTENCE FOR GROUPS ---
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('studyGroups');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Fallback: If data looks corrupted or old (too few items), reset to defaults
      if (parsed.length < 1) return defaultGroups; 
      return parsed;
    }
    return defaultGroups;
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  // --- 2. DATA PERSISTENCE FOR DARK MODE ---
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('rv_hub_dark_mode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Classes',
    link: '',
    notes: '',
    color: 'blue'
  });

  // --- SAVE GROUPS WHEN CHANGED ---
  useEffect(() => {
    localStorage.setItem('studyGroups', JSON.stringify(groups));
  }, [groups]);

  // --- SAVE DARK MODE WHEN CHANGED ---
  useEffect(() => {
    localStorage.setItem('rv_hub_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Inject Styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const handleSaveGroup = (e) => {
    e.preventDefault();
    if (editingGroup) {
      setGroups(groups.map(g => g.id === editingGroup.id ? { ...formData, id: g.id, pinned: g.pinned } : g));
    } else {
      setGroups([...groups, { ...formData, id: Date.now(), pinned: false }]);
    }
    closeModal();
  };

  const deleteGroup = (id) => {
    if(window.confirm('Remove this group card?')) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  const togglePin = (id) => {
    setGroups(groups.map(g => g.id === id ? { ...g, pinned: !g.pinned } : g));
  };

  const openModal = (group = null) => {
    if (group) {
      setEditingGroup(group);
      setFormData({
        name: group.name,
        category: group.category,
        link: group.link,
        notes: group.notes,
        color: group.color
      });
    } else {
      setEditingGroup(null);
      setFormData({ name: '', category: 'Classes', link: '', notes: '', color: 'blue' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
  };

  const filteredGroups = groups.filter(group => {
    const matchesCategory = activeCategory === 'all' || group.category === activeCategory;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          group.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  filteredGroups.sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 font-sans ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-gray-900'}`}>
      
      {/* Background Animated Earth */}
      <SpinningEarth />

      {/* Main Content Wrapper (Glass Effect) */}
      <div className="relative z-10 min-h-screen backdrop-blur-[2px]">
        
        {/* Header */}
        <header className={`sticky top-0 z-30 transition-all duration-300 border-b ${darkMode ? 'glass-panel-dark border-gray-800' : 'glass-panel border-white/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
              
              {/* College Branding */}
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveCategory('all')}>
                <div className="relative">
                  <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-600/30 transform transition-transform group-hover:rotate-12 group-hover:scale-110">
                    <Globe size={32} strokeWidth={2} className="animate-pulse" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-teal-600 dark:from-emerald-400 dark:to-teal-300 tracking-tight leading-none uppercase">
                    RV Institute
                  </h1>
                  <h2 className="text-lg md:text-xl font-bold text-emerald-700/80 dark:text-emerald-500/80 uppercase tracking-widest">
                    Of Management
                  </h2>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-[0.2em] mt-0.5 ml-0.5">SECTION B • STUDY HUB</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none md:w-64 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type="text"
                    placeholder="Search subjects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2.5 w-full rounded-xl border transition-all outline-none ${
                      darkMode 
                      ? 'bg-gray-800/50 border-gray-700 text-white focus:bg-gray-800 focus:border-emerald-500' 
                      : 'bg-white/50 border-white/60 text-gray-900 focus:bg-white focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/10'
                    }`}
                  />
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2.5 rounded-xl transition-all ${
                    darkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-white/50 text-gray-600 hover:bg-white hover:text-indigo-600 hover:shadow-md'
                  }`}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Button onClick={() => openModal()} className="rounded-xl shadow-emerald-500/30 hover:scale-105 active:scale-95">
                  <Plus size={20} className="mr-2" />
                  <span className="hidden sm:inline">Add Custom</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Categories */}
            <aside className="lg:w-72 flex-shrink-0 animate-[fade-in-up_0.6s_ease-out]">
              <div className={`p-4 rounded-3xl ${darkMode ? 'glass-panel-dark' : 'glass-panel'}`}>
                <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Filters</h3>
                <nav className="space-y-2">
                  {categories.map((cat, idx) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    const count = groups.filter(g => cat.id === 'all' || g.category === cat.id).length;
                    
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 animate-[fade-in-up_0.5s_ease-out_both] ${
                          isActive 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-700/50 hover:pl-6'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
                          {cat.label}
                        </div>
                        {count > 0 && (
                          <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                          }`}>
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200/30 dark:border-gray-700/30">
                  <div className={`rounded-2xl p-5 relative overflow-hidden group ${darkMode ? 'bg-emerald-900/20' : 'bg-gradient-to-br from-emerald-100/80 to-teal-50/80'}`}>
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                       <Globe size={80} />
                    </div>
                    <div className="relative z-10">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-md mb-3 group-hover:rotate-12 transition-transform">
                        <CheckSquare size={20} />
                      </div>
                      <h3 className="font-bold text-emerald-900 dark:text-emerald-300">Exam Tip</h3>
                      <p className="text-xs font-medium text-emerald-800/70 dark:text-emerald-400/70 mt-1 leading-relaxed">
                        Don't let deadlines scroll away! Pin your group cards for upcoming exams to keep them at the top.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Grid Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6 animate-[fade-in-up_0.8s_ease-out]">
                <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
                  {activeCategory === 'all' ? 'Dashboard' : categories.find(c => c.id === activeCategory)?.label}
                </h2>
                <div className="px-4 py-1.5 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {filteredGroups.length} Active Groups
                </div>
              </div>

              {filteredGroups.length === 0 ? (
                <div className={`text-center py-20 rounded-3xl border-2 border-dashed transition-all animate-[fade-in-up_0.5s_ease-out] ${darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-300/60 bg-white/30'}`}>
                  <div className="mx-auto w-20 h-20 bg-emerald-100/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Filter className="text-emerald-500" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">No groups found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
                  {filteredGroups.map((group, idx) => (
                    <Card 
                      key={group.id} 
                      className={`${darkMode ? 'glass-panel-dark' : 'glass-panel'} group flex flex-col h-full`}
                      style={{ animation: `fade-in-up 0.6s ease-out ${idx * 0.1}s backwards` }}
                    >
                      {/* Card Header */}
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex flex-col gap-2">
                             <div className="flex gap-2 mb-1">
                                <Badge color={
                                  group.color === 'blue' ? 'blue' : 
                                  group.color === 'emerald' ? 'emerald' : 
                                  group.color === 'purple' ? 'purple' : 
                                  group.color === 'rose' ? 'rose' : 'amber'
                                }>
                                  {group.category}
                                </Badge>
                                {group.pinned && (
                                  <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                    Pinned
                                  </span>
                                )}
                             </div>
                             <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-emerald-600 transition-colors">
                               {group.name}
                             </h3>
                          </div>
                          
                          <button 
                             onClick={() => togglePin(group.id)}
                             className={`p-2 rounded-full transition-all duration-300 ${group.pinned ? 'text-amber-500 bg-amber-100 dark:bg-amber-900/30 rotate-45' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'}`}
                          >
                             <svg width="18" height="18" viewBox="0 0 24 24" fill={group.pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                               <path d="M21.4 12.6l-2.8-2.8a2 2 0 0 0-2.83 0L5 20.5a.5.5 0 0 0 .14.85l3.54.71a2 2 0 0 0 1.62-.57l9.9-9.9a2 2 0 0 0 0-2.83z"></path>
                               <line x1="16" y1="7" x2="22" y2="13"></line>
                             </svg>
                          </button>
                        </div>

                        {/* Notes Section */}
                        <div className={`rounded-xl p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-emerald-50/50 border border-emerald-100/50 group-hover:bg-emerald-50'}`}>
                          <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <AlertCircle size={14} />
                            <span>Quick Notes</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-medium leading-relaxed opacity-90">
                            {group.notes || <span className="text-gray-400 italic font-normal">No notes added yet.</span>}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className={`px-6 py-4 flex items-center justify-between border-t ${darkMode ? 'bg-gray-900/30 border-gray-700' : 'bg-white/40 border-white/50'}`}>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openModal(group)}
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => deleteGroup(group.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <a 
                          href={group.link || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold shadow-lg transition-all transform active:scale-95 ${
                            group.link 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/30' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                          }`}
                          onClick={e => !group.link && e.preventDefault()}
                        >
                          Join Chat
                          <ExternalLink size={14} strokeWidth={2.5} />
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Modal Content */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingGroup ? 'Update Group Info' : 'New Study Group'}
      >
        <form onSubmit={handleSaveGroup} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Group Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all"
              placeholder="e.g. Business Analytics - Sec B"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Label Color</label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className={`w-4 h-4 rounded-full bg-${formData.color === 'emerald' ? 'emerald' : formData.color}-500`}></div>
                <select 
                  className="bg-transparent w-full text-sm font-medium focus:outline-none dark:text-white"
                  value={formData.color}
                  onChange={e => setFormData({...formData, color: e.target.value})}
                >
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                  <option value="emerald">Emerald</option>
                  <option value="amber">Amber</option>
                  <option value="rose">Rose</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">WhatsApp Invite Link</label>
            <div className="relative">
              <ExternalLink size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="url" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all"
                placeholder="https://chat.whatsapp.com/..."
                value={formData.link}
                onChange={e => setFormData({...formData, link: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Important Notes</label>
            <textarea 
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all resize-none"
              placeholder="Paste deadlines, zoom links, or exam dates here..."
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="pt-2 flex gap-3">
            <Button type="button" variant="secondary" className="flex-1" onClick={closeModal}>Cancel</Button>
            <Button type="submit" className="flex-1 shadow-lg shadow-emerald-500/20">
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
