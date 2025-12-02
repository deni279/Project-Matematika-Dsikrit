// Validasi ISBN-10
function validateISBN10(isbn) {
    // Hapus tanda "-" dan spasi
    isbn = isbn.replace(/[- ]/g, "");

    // ISBN-10 harus 10 digit
    if (isbn.length !== 10) return false;

    let total = 0;

    // Hitung 9 digit pertama
    for (let i = 0; i < 9; i++) {
        if (!/^\d$/.test(isbn[i])) return false;
        total += (10 - i) * parseInt(isbn[i]);
    }

    // Karakter terakhir bisa angka atau 'X'
    let last = isbn[9].toUpperCase();
    if (last === "X") {
        total += 10;
    } else if (/^\d$/.test(last)) {
        total += parseInt(last);
    } else {
        return false;
    }

    // ISBN-10 valid jika total % 11 == 0
    return total % 11 === 0;
}

// Validasi ISBN-13
function validateISBN13(isbn) {
    isbn = isbn.replace(/[- ]/g, "");

    // ISBN-13 harus 13 digit
    if (isbn.length !== 13) return false;

    let total = 0;

    // Hitung 12 digit pertama
    for (let i = 0; i < 12; i++) {
        if (!/^\d$/.test(isbn[i])) return false;
        
        // Pola perhitungan: 1,3,1,3,...
        const multiplier = (i % 2 === 0) ? 1 : 3;
        total += multiplier * parseInt(isbn[i]);
    }

    // Check digit
    const checkDigit = (10 - (total % 10)) % 10;

    return checkDigit === parseInt(isbn[12]);
}



// Fungsi utama ketika tombol ditekan
function cekISBN() {
    const isbn = document.getElementById("isbn").value.trim();
    const hasil = document.getElementById("hasil");

    if (isbn.length === 10) {
        hasil.innerText = validateISBN10(isbn)
            ? "ISBN-10 VALID ✔️"
            : "ISBN-10 TIDAK VALID ❌";
    }
    else if (isbn.length === 13) {
        hasil.innerText = validateISBN13(isbn)
            ? "ISBN-13 VALID ✔️"
            : "ISBN-13 TIDAK VALID ❌";
    }
    else {
        hasil.innerText = "Format ISBN tidak sesuai (harus 10 atau 13 digit).";
    }
}
