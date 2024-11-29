export function reverseVigenereCipher(encryptedText, key, customAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    // Map characters to indices based on the custom alphabet
    const charToIndex = (char) => {
        if (char === undefined) return -1;
        return customAlphabet.indexOf(char.toUpperCase());
    };
    const indexToChar = (index, isUpperCase) => {
        const char = customAlphabet[(index + customAlphabet.length) % customAlphabet.length];
        return isUpperCase ? char.toUpperCase() : char;
    };

    const alphabetLength = customAlphabet.length;
    key = key.toUpperCase();

    let decryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < encryptedText.length; i++) {
        const currentChar = encryptedText[i];
        const isUpperCase = currentChar === currentChar.toUpperCase();

        if (customAlphabet.includes(currentChar.toUpperCase())) {
            const encryptedIndex = charToIndex(currentChar);
            const keyCharIndex = charToIndex(key[keyIndex % key.length]);

            if (encryptedIndex === -1 || keyCharIndex === -1) {
                decryptedText += currentChar;
            } else {
                // Decrypt by subtracting the key's index, ensuring wraparound
                const decryptedIndex = encryptedIndex - keyCharIndex;
                decryptedText += indexToChar(decryptedIndex, isUpperCase);

                // Move to the next character in the key
                keyIndex++;
            }
        } else {
            // If character is not in the custom alphabet, keep it as is
            decryptedText += currentChar;
        }
    }

    return decryptedText;
}