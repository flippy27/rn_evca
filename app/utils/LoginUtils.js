export const is_valid_email = ({ email }) => {
    if (!email ) {
        console.log('returning becuase no email',email);
        return false;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    return emailRegex.test(email);
}

export const is_valid_password = ({ password }) => {
    console.log('el pas',password);
    if (!password || password.length < 8) {
        return false;
    }
    console.log('pase lo primero');
    const specialCharacters = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", "\\", ":", ";", "\"", "'", "<", ",", ">", ".", "?", "/"];
    const hasSpecialCharacter = specialCharacters.some(char => password.includes(char));
    if (!hasSpecialCharacter) {
        return false;
    }
    console.log('pase lo segundo');
    
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const hasNumber = numbers.some(num => password.includes(num));
    if (!hasNumber) {
        return false;
    }
    console.log('pase lo tercero');

    return true;
}





