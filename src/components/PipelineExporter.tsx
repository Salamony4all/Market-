'use client';

import React, { useMemo, useState } from 'react';
import { FileSpreadsheet, Check, X, Filter, ChevronRight } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Lead {
    id: number;
    title: string;
    region: string;
    client: string;
    keyPerson: string;
    budget: string;
    winRate: string;
    type: string;
    score: number;
}

const ALL_PROJECTS: Lead[] = [
    { id: 1, title: "OMRAN: Nikki Beach Resort - Furniture Package", region: "Muscat (Yiti)", client: "OMRAN Group", keyPerson: "Ahmed Al-Balushi", budget: "OMR 750,000", winRate: "85%", type: "Hospitality", score: 150 },
    { id: 2, title: "PDO: Office Refurbishment - Ras Al Hamra", region: "Muscat", client: "Petroleum Development Oman", keyPerson: "Sarah Williams", budget: "OMR 120,000", winRate: "65%", type: "Office", score: 40 },
    { id: 3, title: "OAMC: Salalah Airport T3 Expansion", region: "Salalah", client: "Oman Airports", keyPerson: "John Doe", budget: "OMR 2,100,000", winRate: "45%", type: "Infrastructure", score: 60 },
    { id: 4, title: "Duqm Refinery Housing Phase 2", region: "Duqm", client: "OQ / Duqm Refinery", keyPerson: "Mohammed Al-Riyam", budget: "OMR 450,000", winRate: "70%", type: "Residential", score: 90 },
    { id: 5, title: "Sohar Freezone Office Fit-out", region: "Sohar", client: "Sohar Freezone", keyPerson: "Khalid Al-Saidi", budget: "OMR 85,000", winRate: "90%", type: "Office", score: 45 },
    { id: 6, title: "Yiti Sustainable City - Lighting fit-out", region: "Muscat (Yiti)", client: "Diamond Developers / OMRAN", keyPerson: "Jane Smith", budget: "OMR 320,000", winRate: "75%", type: "Hospitality", score: 110 }
];

const REGIONS = ["Muscat", "Salalah", "Duqm", "Sohar", "Muscat (Yiti)"];
const EXPORT_HEADERS = [
    "Project Name",
    "Region",
    "Client",
    "Key Decision Maker",
    "Project Type",
    "Approx. Budget (OMR)",
    "Win Rate",
    "Score"
];

const parseBudget = (value: string) => {
    const numeric = Number(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) ? numeric : 0;
};

const parsePercent = (value: string) => {
    const numeric = Number(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) ? numeric / 100 : 0;
};

const formatOmanRial = (value: number) => `OMR ${new Intl.NumberFormat('en-OM', { maximumFractionDigits: 0 }).format(value)}`;

export default function PipelineExporter({ isSidebar = false }: { isSidebar?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [includeSummary, setIncludeSummary] = useState(true);
    const [isExporting, setIsExporting] = useState(false);

    const filteredLeads = useMemo(() => ALL_PROJECTS.filter(lead =>
        selectedRegions.length === 0 || selectedRegions.some(r => lead.region.includes(r))
    ), [selectedRegions]);

    const totalBudget = useMemo(() => filteredLeads.reduce((sum, lead) => sum + parseBudget(lead.budget), 0), [filteredLeads]);
    const averageWinRate = useMemo(() => {
        if (!filteredLeads.length) {
            return 0;
        }
        const total = filteredLeads.reduce((sum, lead) => sum + parsePercent(lead.winRate), 0);
        return Math.round((total / filteredLeads.length) * 100);
    }, [filteredLeads]);

    const toggleRegion = (region: string) => {
        setSelectedRegions(prev =>
            prev.includes(region)
                ? prev.filter(r => r !== region)
                : [...prev, region]
        );
    };

    const exportToExcel = () => {
        setIsExporting(true);
        const exportedAt = new Date();

        const worksheetData = filteredLeads.map(lead => ({
            "Project Name": lead.title,
            "Region": lead.region,
            "Client": lead.client,
            "Key Decision Maker": lead.keyPerson,
            "Project Type": lead.type,
            "Approx. Budget (OMR)": parseBudget(lead.budget),
            "Win Rate": parsePercent(lead.winRate),
            "Score": lead.score
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData, { header: EXPORT_HEADERS });
        worksheet['!cols'] = [
            { wch: 48 },
            { wch: 18 },
            { wch: 28 },
            { wch: 22 },
            { wch: 16 },
            { wch: 18 },
            { wch: 12 },
            { wch: 10 }
        ];
        worksheet['!autofilter'] = { ref: `A1:H${worksheetData.length + 1}` };

        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:H1');
        for (let row = 1; row <= range.e.r; row += 1) {
            const budgetCell = worksheet[XLSX.utils.encode_cell({ r: row, c: 5 })];
            if (budgetCell) {
                budgetCell.z = '"OMR" #,##0';
            }
            const winRateCell = worksheet[XLSX.utils.encode_cell({ r: row, c: 6 })];
            if (winRateCell) {
                winRateCell.z = '0%';
            }
            const scoreCell = worksheet[XLSX.utils.encode_cell({ r: row, c: 7 })];
            if (scoreCell) {
                scoreCell.z = '0';
            }
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "FF&E Pipeline");

        if (includeSummary) {
            const regionRows = REGIONS.map(region => {
                const regionLeads = filteredLeads.filter(lead => lead.region.includes(region));
                const regionBudget = regionLeads.reduce((sum, lead) => sum + parseBudget(lead.budget), 0);
                return [region, regionLeads.length, regionBudget];
            });

            const summaryRows: (string | number)[][] = [
                ["FF&E Pipeline Summary"],
                ["Generated On", exportedAt.toLocaleString('en-OM')],
                [],
                ["Metric", "Value"],
                ["Projects", filteredLeads.length],
                ["Total Budget (OMR)", totalBudget],
                ["Average Win Rate", averageWinRate / 100],
                [],
                ["Region", "Projects", "Total Budget (OMR)"],
                ...regionRows
            ];

            const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
            summarySheet['!cols'] = [{ wch: 26 }, { wch: 18 }, { wch: 20 }];

            const totalBudgetCell = summarySheet['B6'];
            if (totalBudgetCell) {
                totalBudgetCell.z = '"OMR" #,##0';
            }
            const avgWinRateCell = summarySheet['B7'];
            if (avgWinRateCell) {
                avgWinRateCell.z = '0%';
            }
            for (let i = 0; i < regionRows.length; i += 1) {
                const rowIndex = 10 + i;
                const regionBudgetCell = summarySheet[`C${rowIndex}`];
                if (regionBudgetCell) {
                    regionBudgetCell.z = '"OMR" #,##0';
                }
            }

            XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
        }

        XLSX.writeFile(workbook, `Oman_FFE_Pipeline_${exportedAt.toISOString().split('T')[0]}.xlsx`);

        setTimeout(() => {
            setIsExporting(false);
            setIsOpen(false);
        }, 900);
    };

    if (isSidebar) {
        return (
            <div className="space-y-4 px-2 pt-2 border-t border-slate-100 mt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Pipeline Export Engine</p>
                <div className="space-y-2">
                    {REGIONS.slice(0, 4).map(region => (
                        <button
                            key={region}
                            onClick={() => toggleRegion(region)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold transition-all hover:bg-slate-50 border border-transparent"
                        >
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${selectedRegions.includes(region) ? 'bg-primary shadow-[0_0_8px_rgba(196,167,93,0.5)]' : 'bg-slate-200'}`}></div>
                                <span className={selectedRegions.includes(region) ? 'text-slate-900' : 'text-slate-500'}>{region}</span>
                            </div>
                            {selectedRegions.includes(region) && <Check size={12} className="text-primary" />}
                        </button>
                    ))}
                </div>
                <button
                    onClick={exportToExcel}
                    disabled={isExporting}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl text-[11px] font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 mt-2 disabled:opacity-50"
                >
                    {isExporting ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <FileSpreadsheet size={14} />}
                    {isExporting ? 'Generating...' : 'Export Selected Areas'}
                </button>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 rounded-[1.25rem] text-xs font-bold text-slate-700 transition-all"
            >
                <FileSpreadsheet size={16} className="text-green-600" />
                Pipeline Export
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/60">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Excel Export Studio</p>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">FF&E Pipeline Workbook</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">Generate a clean, analysis-ready Excel file with summary insights.</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} aria-label="Close exporter" className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 transition-all text-slate-500">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projects</p>
                                    <p className="text-2xl font-black text-slate-900 mt-2">{filteredLeads.length}</p>
                                    <p className="text-xs text-slate-500 font-medium mt-1">Across {selectedRegions.length || REGIONS.length} regions</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Budget</p>
                                    <p className="text-2xl font-black text-slate-900 mt-2">{formatOmanRial(totalBudget)}</p>
                                    <p className="text-xs text-slate-500 font-medium mt-1">Includes all selected leads</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Win Rate</p>
                                    <p className="text-2xl font-black text-slate-900 mt-2">{averageWinRate}%</p>
                                    <p className="text-xs text-slate-500 font-medium mt-1">Weighted across pipeline</p>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                            <Filter size={14} className="text-primary" /> Filter by Region
                                        </h4>
                                        <button
                                            onClick={() => setSelectedRegions([])}
                                            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {REGIONS.map(region => (
                                            <button
                                                key={region}
                                                onClick={() => toggleRegion(region)}
                                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedRegions.includes(region)
                                                    ? 'bg-primary/10 border-primary/30 text-primary'
                                                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'
                                                    }`}
                                            >
                                                {region}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-full lg:w-64 space-y-3">
                                    <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                                        <span>Include Summary Sheet</span>
                                        <button
                                            onClick={() => setIncludeSummary(prev => !prev)}
                                            className={`w-12 h-6 rounded-full transition-all relative ${includeSummary ? 'bg-primary/80' : 'bg-slate-200'}`}
                                        >
                                            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${includeSummary ? 'left-7' : 'left-1'}`}></span>
                                        </button>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-medium">Adds a summary tab with totals and regional breakdown.</p>
                                </div>
                            </div>

                            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Preview</p>
                                    <p className="text-[10px] text-slate-400 font-bold">Showing first 3 rows</p>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {filteredLeads.slice(0, 3).map((lead) => (
                                        <div key={lead.id} className="px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{lead.title}</p>
                                                <p className="text-[11px] text-slate-500 font-semibold">{lead.region} • {lead.client}</p>
                                            </div>
                                            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">{lead.winRate} • {formatOmanRial(parseBudget(lead.budget))}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                Ready to export
                                <ChevronRight size={14} className="text-primary" />
                                {selectedRegions.length ? `${selectedRegions.length} regions` : 'All regions'}
                            </div>
                            <button
                                onClick={exportToExcel}
                                disabled={isExporting}
                                className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
                            >
                                {isExporting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <FileSpreadsheet size={16} />}
                                {isExporting ? 'Building Workbook...' : 'Export to Excel'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
