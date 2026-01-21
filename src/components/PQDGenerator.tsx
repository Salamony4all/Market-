'use client';

import React, { useState } from 'react';
import { FileText, Download, Check, Shield } from 'lucide-react';
import jsPDF from 'jspdf';

export default function PQDGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [complete, setComplete] = useState(false);

    const generatePDF = async () => {
        setIsGenerating(true);

        const doc = new jsPDF();

        // Header
        doc.setFillColor(196, 167, 93); // Gold
        doc.rect(0, 0, 210, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text('PRE-QUALIFICATION DOCUMENT', 20, 25);
        doc.setFontSize(10);
        doc.text('FF&E MARKET SCANNER: PIPELINE GENERATOR', 20, 32);

        // Body
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text('Commercial Registration (CR) Information', 20, 60);
        doc.setFontSize(10);
        doc.text('Registered Name: [USER_COMPANY_NAME]', 20, 70);
        doc.text('CR Number: [USER_CR_NUMBER]', 20, 78);
        doc.text('Tax ID: [USER_TAX_ID]', 20, 86);

        doc.setFontSize(14);
        doc.text('FF&E Capabilities & Certifications', 20, 106);
        doc.setFontSize(10);
        doc.text('• Specialized Furniture Supply (ISO 9001)', 20, 116);
        doc.text('• Interior Fit-out Excellence (JSRS Approved)', 20, 124);
        doc.text('• Global Logistics & Muscat Distribution', 20, 132);

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Generated via FF&E Commander Intelligence System - Muscat, Oman', 105, 280, { align: 'center' });

        // Simulate delay
        await new Promise(r => setTimeout(r, 1500));

        doc.save('Oman_FFE_PQD.pdf');
        setIsGenerating(false);
        setComplete(true);
        setTimeout(() => setComplete(false), 3000);
    };

    return (
        <div className="glass rounded-2xl p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <FileText className="text-primary" size={20} />
                        PQD Auto-Assembler
                    </h3>
                    <p className="text-xs text-text-muted mt-1">Generate Omani-standard Pre-Qualification Docs</p>
                </div>
                <Shield className="text-primary/20" size={40} />
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Check size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">Omani CR Certificate</p>
                        <p className="text-[10px] text-slate-400 font-medium">Attached & Verified (JSRS)</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Check size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">Chamber of Commerce</p>
                        <p className="text-[10px] text-slate-400 font-medium">Active Subscription 2026</p>
                    </div>
                </div>
            </div>

            <button
                onClick={generatePDF}
                disabled={isGenerating}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${complete ? 'bg-green-500 text-white' : 'bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/20'
                    }`}
            >
                {isGenerating ? (
                    <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin"></div>
                        Assembling PDF...
                    </span>
                ) : complete ? (
                    <>
                        <Check size={18} />
                        PDF Generated
                    </>
                ) : (
                    <>
                        <Download size={18} />
                        Export PQD Package
                    </>
                )}
            </button>
        </div>
    );
}
