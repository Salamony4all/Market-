'use client';

import React from 'react';
import { UserPlus, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

const NEW_SUPPLIERS = [
    { id: 1, name: "Studio International Ltd", origin: "UK / London", cert: "FF&E Design", date: "Today" },
    { id: 2, name: "Al-Hadid Engineering", origin: "UAE / Dubai", cert: "Fit-out Contractor", date: "Yesterday" },
    { id: 3, name: "Milano Sanitary S.p.A", origin: "Italy", cert: "Sub-contractor", date: "2 days ago" },
];

export default function JSRSAlerts() {
    return (
        <div className="glass rounded-2xl p-6 border border-secondary/10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-tighter">
                    <UserPlus size={18} className="text-secondary" />
                    New JSRS Certifications
                </h3>
                <span className="text-[10px] font-bold text-secondary animate-pulse px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/20">NEW ALERTS</span>
            </div>

            <div className="space-y-3">
                {NEW_SUPPLIERS.map(supplier => (
                    <div key={supplier.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary/30 transition-all hover:bg-white hover:shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">{supplier.name}</p>
                            <ExternalLink size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            <MapPin size={10} className="text-primary/70" /> {supplier.origin}
                            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                            <ShieldCheck size={10} className="text-green-600" /> {supplier.cert}
                        </div>
                        <p className="text-[9px] text-slate-300 mt-2 font-bold uppercase">{supplier.date}</p>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-2xl bg-white border border-slate-200 hover:border-primary/50 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all shadow-sm">
                View Full Supplier Pipeline
            </button>
        </div>
    );
}
