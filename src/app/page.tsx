'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    BarChart3,
    Map as MapIcon,
    Shield,
    Search,
    Bell,
    Globe,
    Sliders,
    FileText,
    PhoneCall,
    Lock,
    ExternalLink,
    ChevronRight,
    Zap,
    CheckCircle2,
    Mail,
    Languages,
    UserCheck,
    Building2,
    Settings,
    LayoutGrid,
    Menu,
    ChevronDown,
    PieChart,
    Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PQDGenerator from '@/components/PQDGenerator';
import PortalVault from '@/components/PortalVault';
import JSRSAlerts from '@/components/JSRSAlerts';
import PipelineExporter from '@/components/PipelineExporter';

// Dynamically import Map to avoid SSR errors
const MuscatMap = dynamic(() => import('@/components/MuscatMap'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-slate-50 flex items-center justify-center font-bold text-slate-400">Initializing Intelligence Map...</div>
});

const MOCK_LEADS = [
    { id: 1, title: "OMRAN: Nikki Beach Resort - Furniture Package", region: "Muscat (Yiti)", type: "Hospitality", stage: "Awarded to Contractor", primeTarget: "Douglas OHI", score: 150, priority: "CRITICAL", timestamp: "2 hours ago", status: "Active", arabicTitle: "عمران: منتجع نيكي بيتش - حزمة الأثاث", contact: { name: "Ahmed Al-Balushi", role: "Procurement Manager", linkedIn: "linkedin.com/in/ahmed-oman-procurement" } },
    { id: 2, title: "PDO: Office Refurbishment - Ras Al Hamra", region: "Muscat", type: "Office", stage: "Design/Consultancy", primeTarget: "Atkins", score: 40, priority: "EARLY", timestamp: "5 hours ago", status: "Active", arabicTitle: "تنمية نفط عمان: تجديد المكاتب - رأس الحمراء", contact: { name: "Sarah Williams", role: "FF&E Specifier", linkedIn: "linkedin.com/in/sarah-ffe-atkins" } },
    { id: 3, title: "OAMC: Salalah Airport T3 Expansion - Lighting fit-out", region: "Salalah", type: "Infrastructure", stage: "Tendering", primeTarget: "Pending", score: 60, priority: "HIGH", timestamp: "12 hours ago", status: "Active", arabicTitle: "مطارات عمان: توسعة مطار صلالة مبنى 3 - تجهيز الإضاءة", contact: { name: "John Doe", role: "Project Director", linkedIn: "#" } }
];

export default function WarRoom() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showOutreach, setShowOutreach] = useState<any>(null);
    const [clientDate, setClientDate] = useState<string | null>(null);
    const [clientTime, setClientTime] = useState<string | null>(null);

    useEffect(() => {
        const now = new Date();
        setClientDate(now.toLocaleDateString('en-OM', { weekday: 'long', month: 'long', day: 'numeric' }));
        setClientTime(now.toLocaleTimeString('en-OM', { hour: '2-digit', minute: '2-digit' }));
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-900 font-outfit">
            {/* Premium Sidebar */}
            <aside className={`bg-white border-r border-slate-200 w-72 h-full transition-all flex flex-col z-20 relative ${isSidebarOpen ? '' : '-ml-72'}`}>
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary shadow-lg shadow-slate-100 border border-slate-100">
                            <Shield size={22} fill="var(--primary)" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">MARKET SCANNER</h1>
                            <p className="text-[10px] font-bold text-primary mt-1 tracking-[0.2em] uppercase">Pipeline Generator</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar pb-10">
                    <div className="mb-8">
                        <p className="text-[10px] font-black text-slate-400 px-4 mb-4 uppercase tracking-[0.15em]">Strategic Console</p>
                        <NavItem icon={<LayoutGrid size={18} />} label="Market Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                        <NavItem icon={<MapIcon size={18} />} label="War Room Map" active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
                        <NavItem icon={<FileText size={18} />} label="PQD Auto-Assembler" active={activeTab === 'pqd'} onClick={() => setActiveTab('pqd')} />
                    </div>

                    <div className="mb-8">
                        <p className="text-[10px] font-black text-slate-400 px-4 mb-4 uppercase tracking-[0.15em]">Operations & Leads</p>
                        <NavItem icon={<PieChart size={18} />} label="Portal Intelligence" active={activeTab === 'scan'} onClick={() => setActiveTab('scan')} />
                        <NavItem icon={<Lock size={18} />} label="Secure Vault" active={activeTab === 'vault'} onClick={() => setActiveTab('vault')} />
                        <PipelineExporter isSidebar={true} />
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 px-4 mb-4 uppercase tracking-[0.15em]">System Settings</p>
                        <NavItem icon={<Settings size={18} />} label="Preferences" />
                    </div>
                </nav>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-sm">
                                M
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold truncate text-slate-900">Mohamad</p>
                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Supreme Operator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto relative bg-[#f8fafc] custom-scrollbar">
                {/* Modern Header */}
                <header className="h-20 border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-10">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            aria-label="Toggle sidebar"
                            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200"
                        >
                            <Menu size={22} />
                        </button>
                        <div className="relative group flex items-center">
                            <Search size={18} className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search Sovereignty Intelligence..."
                                aria-label="Search intelligence"
                                className="bg-slate-50 border border-slate-100 rounded-[1.25rem] py-3 pl-12 pr-16 text-sm w-80 lg:w-96 focus:outline-none focus:bg-white focus:border-primary/30 transition-all font-medium text-slate-900 shadow-inner"
                            />
                            <span className="hidden md:flex items-center gap-1 absolute right-3 text-[10px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-1 rounded-lg">
                                <kbd className="font-bold">Ctrl</kbd>
                                <span>K</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex flex-col text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Live Intelligence Status</p>
                            <div className="flex items-center gap-2 justify-end">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-slate-900">Optimal Sync</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                Updated {clientTime ?? '--:--'}
                            </span>
                        </div>
                        <button aria-label="Notifications" className="relative p-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl transition-all shadow-sm group">
                            <Bell size={20} className="text-slate-400 group-hover:text-slate-900" />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Dynamic Views */}
                <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
                    {activeTab === 'dashboard' && (
                        <div className="animate-fade-in space-y-10">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Muscat War Room</h2>
                                    <p className="text-slate-500 font-medium flex items-center gap-2">
                                        <Target size={16} className="text-primary" />
                                        Sovereign FF&E Intelligence Hub • {clientDate ?? 'Loading date...'}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="p-4 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Zap size={20} />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global P&L</p>
                                            <p className="text-lg font-black leading-none">OMR 4.2M</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Highlighting */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <StatCard label="Critical Wins" value="12" sub="Next 48H Deadline" icon={<Zap className="text-primary" />} />
                                <StatCard label="Active Tenders" value="28" sub="Sovereign Entities" icon={<Globe className="text-secondary" />} />
                                <StatCard label="Compliance" value="100%" sub="JSRS Verified" icon={<CheckCircle2 className="text-green-500" />} />
                                <StatCard label="New Leads" value="+3" sub="Detected This Hour" icon={<Target className="text-blue-500" />} />
                            </div>

                            {/* Central Intelligence Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                {/* Global Opportunities Feed */}
                                <div className="lg:col-span-8 flex flex-col gap-10">
                                    <div className="h-[380px] md:h-[550px] glass rounded-[2.5rem] overflow-hidden relative shadow-2xl border-white group">
                                        <MuscatMap />
                                        <div className="absolute top-6 left-6 z-[1000] glass p-4 rounded-[1.5rem] border-white shadow-xl max-w-[280px]">
                                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <MapIcon size={14} className="text-primary" /> Intelligence Map
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                                                    <span>Muscat Central</span>
                                                    <span className="text-primary">14 Active</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="w-[70%] h-full bg-primary"></div>
                                                </div>
                                                <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                                                    <span>Salalah Zone</span>
                                                    <span className="text-secondary">6 Active</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="w-[30%] h-full bg-secondary"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="glass rounded-[2rem] p-8 border-white bg-white/50">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                                <Target size={22} className="text-primary" />
                                                Strategic Market Feed
                                            </h3>
                                            <div className="flex gap-2 p-1 bg-slate-50 border border-slate-100 rounded-xl">
                                                <button aria-pressed className="px-4 py-1.5 rounded-lg text-xs font-bold bg-white shadow-sm text-slate-900 border border-slate-100">LIVE SCAN</button>
                                                <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-600">HOSPITALITY</button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {MOCK_LEADS.map(lead => <LeadRow key={lead.id} lead={lead} onOutreach={() => setShowOutreach(lead)} />)}
                                        </div>
                                    </div>
                                </div>

                                {/* Automation & Alerts Column */}
                                <div className="lg:col-span-4 space-y-8">
                                    <div className="glass rounded-[2rem] p-8 bg-white text-slate-900 border-white shadow-xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:scale-150"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="font-black text-sm uppercase tracking-widest text-primary">Daily Briefing</h3>
                                                <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold">GST 08:00 AM</span>
                                            </div>
                                            <div className="space-y-4">
                                                {MOCK_LEADS.slice(0, 2).map((lead, idx) => (
                                                    <div key={lead.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/50 transition-all cursor-pointer">
                                                        <p className="text-[9px] font-black text-primary mb-1 tracking-widest uppercase">Target #{idx + 1}</p>
                                                        <h4 className="text-sm font-bold leading-tight mb-2">{lead.title}</h4>
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                                            <Building2 size={12} /> {lead.primeTarget}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full mt-6 py-3 rounded-2xl bg-primary text-slate-900 font-bold text-xs hover:brightness-110 transition-all shadow-xl shadow-primary/10">
                                                Review Full Daily Package
                                            </button>
                                        </div>
                                    </div>

                                    <PQDGenerator />
                                    <JSRSAlerts />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'vault' && (
                        <div className="animate-fade-in pt-6">
                            <PortalVault />
                        </div>
                    )}

                    {activeTab === 'pqd' && (
                        <div className="max-w-4xl mx-auto py-10 animate-fade-in space-y-10">
                            <div className="text-center">
                                <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">PQD Generator Engine</h2>
                                <p className="text-slate-500 font-medium">Professional Pre-Qualification Document Assembly following Sovereign Standards</p>
                            </div>
                            <PQDGenerator />
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
                                    <Shield className="text-primary mb-4" size={32} />
                                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-3">Compliance Certified</h4>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Generated documents automatically incorporate Omani Royal Decree 26/2023 clauses for state procurement compatibility.</p>
                                </div>
                                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-inner">
                                    <Lock className="text-secondary mb-4" size={32} />
                                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-3">Encrypted Export</h4>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Every generated PDF is cryptographically signed to prevent manipulation and ensure authenticity during portal submission.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Outreach Modal Overhaul */}
                <AnimatePresence>
                    {showOutreach && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-slate-100/60 backdrop-blur-md flex items-center justify-center p-4 lg:p-10"
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }}
                                className="bg-white rounded-[3rem] w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-200"
                            >
                                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-[1.25rem] bg-white border border-slate-100 flex items-center justify-center text-primary shadow-lg shadow-slate-100">
                                            <Languages size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">AI Bilingual Intelligence</h3>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Architecting Sovereign Communication</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowOutreach(null)} className="p-3 hover:bg-slate-200 bg-slate-100 rounded-[1rem] text-slate-500 transition-all font-bold">&times;</button>
                                </div>

                                <div className="p-12 overflow-y-auto flex-1 custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-black bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest">English Manuscript</span>
                                                <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 italic transition-all">Download Source</button>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 text-slate-700 text-sm leading-[1.8] font-medium shadow-inner relative">
                                                <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 border border-slate-100">
                                                    <p className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-1">Subject Line</p>
                                                    <p className="font-bold text-slate-900 leading-tight">Priority FF&E Package Proposal - {showOutreach.title}</p>
                                                </div>
                                                <p>Dear {showOutreach.contact.name},</p>
                                                <br />
                                                <p>Following our strategic intelligence harvest, we have identified the <strong className="text-slate-900">{showOutreach.title}</strong> project as a top-tier fit for our specialized FF&E ecosystem. Our JSRS-verified capacity is perfectly aligned with the technical requirements of OIA-linked entities.</p>
                                                <br />
                                                <p>We are prepared to deploy a complete furniture, lighting, and fit-out package that emphasizes durability, premium aesthetics, and Omani architectural heritage. Our Pre-Qualification folder is attached for your immediate review.</p>
                                                <br />
                                                <p>Waiting for your call to coordinate the architectural presentation.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6 text-right" dir="rtl">
                                            <div className="flex items-center justify-between">
                                                <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 italic transition-all">تنزيل المصدر</button>
                                                <span className="text-[11px] font-black bg-secondary/10 text-secondary px-4 py-1.5 rounded-full border border-secondary/20 uppercase tracking-widest font-arabic">المسودة الرسمية (عربية)</span>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 text-slate-700 text-sm leading-[2] font-medium shadow-inner font-arabic">
                                                <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 border border-slate-100">
                                                    <p className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-1">عنوان الموضوع</p>
                                                    <p className="font-bold text-slate-900 leading-tight">الموضوع: مقترح حزمة الأثاث والمعدات ذو الأولوية - {showOutreach.arabicTitle}</p>
                                                </div>
                                                <p>الفاضل {showOutreach.contact.name} المحترم،</p>
                                                <br />
                                                <p>بناءً على معلوماتنا المتخصصة، حددنا مشروع <strong className="text-slate-900">{showOutreach.arabicTitle}</strong> كأولوية قصوى لمجموعة خدماتنا المتكاملة في مجال الأثاث والمعدات. إن قدراتنا المعتمدة من قبل JSRS تتوافق تمامًا مع المتطلبات الفنية للجهات المرتبطة بجهاز الاستثمار العماني.</p>
                                                <br />
                                                <p>نحن مستعدون لتوفير حزمة كاملة تركز على المتانة والجمالية الراقية والتراث المعماري العماني. ملف التأهيل المسبق مرفق لمراجعتكم الفورية.</p>
                                                <br />
                                                <p>في انتظار تواصلكم لتنسيق العرض المعماري الفني.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 border-t border-slate-100 flex justify-end gap-5 bg-slate-50/50">
                                    <button onClick={() => setShowOutreach(null)} className="px-8 py-4 rounded-[1.25rem] border border-slate-200 text-xs font-black hover:bg-white transition-all text-slate-400 uppercase tracking-widest">Discard Intelligence</button>
                                    <button className="px-12 py-4 rounded-[1.25rem] bg-primary text-white text-xs font-black hover:brightness-110 transition-all shadow-[0_20px_40px_-10px_rgba(196,167,93,0.3)] uppercase tracking-[0.2em] flex items-center gap-3">
                                        <Mail size={18} className="text-white" /> Deploy Outreach Protocol
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

// Subcomponents
function NavItem({ icon, label, active = false, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all border ${active
                ? 'bg-primary/10 text-primary border-primary/20 shadow-sm transform scale-[1.02]'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-transparent'
                }`}
        >
            <span className={active ? 'text-primary' : 'text-slate-400 transition-colors group-hover:text-slate-900'}>{icon}</span>
            {label}
        </button>
    );
}

function StatCard({ label, value, sub, icon }: any) {
    return (
        <div className="bg-white rounded-[2rem] p-8 glow-card border-slate-100 group">
            <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                    {icon}
                </div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] leading-none">{label}</p>
            </div>
            <p className="text-3xl font-black mb-1 tracking-tighter text-slate-900">{value}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{sub}</p>
        </div>
    );
}

function LeadRow({ lead, onOutreach }: any) {
    const priorityTone = lead.priority === 'CRITICAL'
        ? 'bg-red-500/90'
        : lead.priority === 'HIGH'
            ? 'bg-amber-500/90'
            : 'bg-slate-300';

    return (
        <div className="group flex items-center gap-8 p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-primary/40 hover:shadow-xl hover:shadow-slate-200/40 transition-all cursor-default relative overflow-hidden">
            <div className={`absolute left-2 top-6 bottom-6 w-1 rounded-full ${priorityTone}`} />
            <div className={`w-16 h-16 rounded-[1.5rem] flex flex-col items-center justify-center text-xl font-black border transition-all ${lead.score >= 100
                ? 'bg-primary/5 text-primary border-primary/20 shadow-inner'
                : 'bg-slate-50 text-slate-400 border-slate-100 shadow-inner'
                }`}>
                <span className="text-[9px] font-black uppercase tracking-tighter opacity-70">Gold</span>
                {lead.score}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                    <h4 className="font-black text-[15px] tracking-tight text-slate-900 group-hover:text-primary transition-colors">{lead.title}</h4>
                    {lead.score >= 100 && (
                        <span className="text-[9px] bg-secondary/5 text-secondary border border-secondary/10 px-3 py-1 rounded-full font-black uppercase tracking-[0.15em]">Sovereign Tier</span>
                    )}
                    <span className="text-[9px] bg-slate-100 text-slate-500 border border-slate-200 px-3 py-1 rounded-full font-black uppercase tracking-[0.15em]">{lead.priority}</span>
                </div>
                <div className="flex items-center gap-6 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2 text-primary/80"><Globe size={14} /> {lead.region}</span>
                    <span className="flex items-center gap-2"><Building2 size={14} /> {lead.primeTarget}</span>
                    <span className="flex items-center gap-2"><Shield size={14} /> {lead.timestamp}</span>
                </div>
            </div>
            <div className="flex gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all md:transform md:translate-x-4 md:group-hover:translate-x-0">
                <button
                    onClick={onOutreach}
                    aria-label={`Open outreach draft for ${lead.title}`}
                    className="p-4 bg-primary/10 text-primary rounded-2xl hover:bg-primary/20 transition-all shadow-md shadow-primary/5 border border-primary/10"
                >
                    <Mail size={18} />
                </button>
                <button aria-label={`Open ${lead.title} in new tab`} className="p-4 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all">
                    <ExternalLink size={18} />
                </button>
            </div>
        </div>
    );
}
