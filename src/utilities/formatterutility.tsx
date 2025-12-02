export const formatterUtility = (amount: number, noSign=false) => {
    const sign = noSign ? "" : "₦";
    return `${sign}${amount.toLocaleString()}`
}

export const formatISODateToCustom = (isoString: string) => {
    if (!isoString) {
        return '';
    }

    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    let rawHours = date.getHours(); // Renamed to rawHours to distinguish
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const ampm = rawHours >= 12 ? 'pm' : 'am';
    rawHours = rawHours % 12;
    const formattedHours = rawHours ? String(rawHours).padStart(2, '0') : '12';

    return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds}${ampm}`;
};