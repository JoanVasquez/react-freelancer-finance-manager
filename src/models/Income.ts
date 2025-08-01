export interface Income {
    id: string;
    source: string;
    amount: number;
    date: string;
    category?: 'freelance' | 'royalty' | 'other';
}
