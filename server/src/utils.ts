export function formatMinutesToStringHour(minutesAmount: number) {
    let hours = Math.floor(minutesAmount / 60);
    let minutes = minutesAmount % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function formatStringHourToMinutes(hourAmount: string) {
    let [hours, minutes] = hourAmount.split(':').map(Number);
    minutes = (hours * 60) + minutes;
    return minutes;
}