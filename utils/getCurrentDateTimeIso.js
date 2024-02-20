export const getCurrentDateTimeInISOString = () => {
    const now = new Date(); // Şu anki tarih ve saat
    const year = now.getFullYear(); // Yılı al
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Ayı al (0-indeksli olduğu için +1 eklenir), gerekirse 2 haneliye tamamla
    const day = String(now.getDate()).padStart(2, '0'); // Günü al, gerekirse 2 haneliye tamamla
    const hours = String(now.getHours()).padStart(2, '0'); // Saati al, gerekirse 2 haneliye tamamla
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Dakikayı al, gerekirse 2 haneliye tamamla
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Saniyeyi al, gerekirse 2 haneliye tamamla
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`; // İstenen formatta tarih oluştur
    return formattedDate;
}