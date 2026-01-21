export interface Lead {
    id: string;
    title: string;
    portal: 'TenderBoard' | 'OMRAN' | 'PDO' | 'Airports' | 'JSRS';
    region: string;
    category: string[];
    stage: 'Design' | 'Awarded' | 'Tendering' | 'Unknown';
    mainContractor?: string;
    consultant?: string;
    type: 'Hospitality' | 'Healthcare' | 'Office' | 'Residential' | 'Other';
    dateScraped: string;
    description: string;
    rawUrl: string;
}

export function calculateScore(lead: Lead): number {
    let score = 0;

    // 1. Stage Scoring
    if (lead.stage === 'Design') {
        score += 40;
    } else if (lead.stage === 'Awarded') {
        score += 100;
    } else if (lead.stage === 'Tendering') {
        score += 20;
    }

    // 2. Type Multiplier
    const multipliers: Record<string, number> = {
        'Hospitality': 1.5,
        'Healthcare': 1.5,
        'Office': 1.0,
        'Residential': 1.0,
        'Other': 1.0,
    };

    const multiplier = multipliers[lead.type] || 1.0;
    score = score * multiplier;

    return score;
}

export function rankLeads(leads: Lead[]) {
    return leads
        .map(lead => ({ ...lead, score: calculateScore(lead) }))
        .sort((a, b) => b.score - a.score);
}
