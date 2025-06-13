export const formatDate = (date: Date) =>
    date.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
