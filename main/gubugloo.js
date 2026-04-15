// Bankapur Stores — User Storage
// ─────────────────────────────────────────────────────────
// D1: Encoded phone # Encoded ID # Password
// D2: Name # Full address (Door, Street, Area, City)
//
// Cipher: 1→X  2→A  3→Y  4→G  5→T  6→U  7→Z  8→N  9→B  0→E
//
// HOW TO ADD A USER:
//   1. Take their phone e.g. 9876543210
//      Encode each digit: 9→B, 8→N, 7→Z, 6→U, 5→T, 4→G, 3→Y, 2→A, 1→X, 0→E
//      Result: BNZUTGYAXE
//   2. Take their 6-digit ID e.g. 482913
//      Encode: 4→G, 8→N, 2→A, 9→B, 1→X, 3→Y
//      Result: GNABXY
//   3. D1 entry: "BNZUTGYAXE#GNABXY#theirpassword"
//   4. D2 entry: "Their Name#Door No, Street, Area, City"
//   Keep index positions matched between D1 and D2.
// ─────────────────────────────────────────────────────────

const D1 = [
    // "ENCODEDPHONE#ENCODEDID#password",
    // Example (inactive — replace with real entries):
    // "XAYGTUZNBE#XEABTX#demo123"
    "ZGNYYGGYUB#NEUGAX#vignesh@2013"
];

const D2 = [
    // "Name#Door, Street, Area, City",
    // Example (inactive — replace with real entries):
    // "Demo User#12, Main Street, Gandhi Nagar, Harapanahalli"
    "Vignesh B#171/5, Banagarpet, Tammany hunse mara, Harapanahalli"
];

