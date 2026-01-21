'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Save, ShieldCheck, Database, Globe } from 'lucide-react';

export default function PortalVault() {
    const [showPass, setShowPass] = useState<Record<string, boolean>>({});
    const [credentials, setCredentials] = useState({
        tenderBoard: { user: '', pass: '' },
        omran: { user: '', pass: '' },
        pdo: { user: '', pass: '' },
        jsrs: { user: '', pass: '' },
        bnc: { user: '', pass: '' }
    });

    const toggleVisibility = (key: string) => {
        setShowPass(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleChange = (portal: string, field: 'user' | 'pass', value: string) => {
        setCredentials(prev => ({
            ...prev,
            [portal]: { ...prev[portal as keyof typeof prev], [field]: value }
        }));
    };

    const handleSave = (portal: string) => {
        alert(`${portal.toUpperCase()} Synchronized with Sovereign Intelligence Cloud`);
    };

    return (
        <div className="glass rounded-[2rem] p-10 border-white max-w-5xl mx-auto shadow-xl">
            <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Lock size={32} />
                </div>
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Sovereign Intelligence Vault</h2>
                    <p className="text-slate-500 mt-1 font-medium">Secured authentication bridge for governmental and private FF&E portals</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PortalAuthCard
                    name="Oman Tender Board"
                    icon={<Globe size={18} />}
                    creds={credentials.tenderBoard}
                    show={showPass['tenderBoard']}
                    onToggle={() => toggleVisibility('tenderBoard')}
                    onChange={(f, v) => handleChange('tenderBoard', f, v)}
                    onSave={() => handleSave('tenderBoard')}
                />
                <PortalAuthCard
                    name="OMRAN Group"
                    icon={<ShieldCheck size={18} />}
                    creds={credentials.omran}
                    show={showPass['omran']}
                    onToggle={() => toggleVisibility('omran')}
                    onChange={(f, v) => handleChange('omran', f, v)}
                    onSave={() => handleSave('omran')}
                />
                <PortalAuthCard
                    name="PDO RABiTAH"
                    icon={<Database size={18} />}
                    creds={credentials.pdo}
                    show={showPass['pdo']}
                    onToggle={() => toggleVisibility('pdo')}
                    onChange={(f, v) => handleChange('pdo', f, v)}
                    onSave={() => handleSave('pdo')}
                />
                <PortalAuthCard
                    name="JSRS Network"
                    icon={<Database size={18} className="text-blue-500" />}
                    creds={credentials.jsrs}
                    show={showPass['jsrs']}
                    onToggle={() => toggleVisibility('jsrs')}
                    onChange={(f, v) => handleChange('jsrs', f, v)}
                    onSave={() => handleSave('jsrs')}
                />
                <PortalAuthCard
                    name="BNC Network"
                    icon={<Globe size={18} className="text-orange-500" />}
                    creds={credentials.bnc}
                    show={showPass['bnc']}
                    onToggle={() => toggleVisibility('bnc')}
                    onChange={(f, v) => handleChange('bnc', f, v)}
                    onSave={() => handleSave('bnc')}
                />
            </div>

            <div className="mt-12 p-6 rounded-[1.5rem] bg-slate-50 border border-slate-200 flex items-start gap-4">
                <ShieldCheck className="text-primary shrink-0" size={24} />
                <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">Enterprise Encrypted Bridge</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        Your credentials are never stored in plain text. They are used to initialize headless browser sessions for FF&E data harvesting across isolated sovereign networks.
                    </p>
                </div>
            </div>
        </div>
    );
}

function PortalAuthCard({ name, icon, creds, show, onToggle, onChange, onSave }: any) {
    return (
        <div className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                    {icon}
                </div>
                <h3 className="font-bold text-slate-800 tracking-tight">{name}</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Access Identity</label>
                    <input
                        type="text"
                        value={creds.user}
                        onChange={(e) => onChange('user', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm focus:border-primary outline-none text-slate-900 transition-colors font-medium"
                        placeholder="Username / Code"
                    />
                </div>
                <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Security Key</label>
                    <input
                        type={show ? 'text' : 'password'}
                        value={creds.pass}
                        onChange={(e) => onChange('pass', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm focus:border-primary outline-none text-slate-900 pr-12 transition-colors font-medium"
                        placeholder="••••••••"
                    />
                    <button
                        onClick={onToggle}
                        className="absolute right-4 top-10 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            <button
                onClick={onSave}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
                <Save size={16} /> Link Architecture
            </button>
        </div>
    );
}
