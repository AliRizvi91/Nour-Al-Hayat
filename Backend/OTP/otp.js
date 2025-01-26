const otp_Generator = require('otp-generator');

const otpGenerator = () => {
    try {
        const otp = otp_Generator.generate(6, {
            upperCaseAlphabets: true,
            specialChars: false,
            digits: false,  // Ensure digits are included
        });
        return otp;
    } catch (error) {
        // Handle error if OTP generation fails
        console.error('Error generating OTP:', error);
        throw error; // Rethrow the error to the caller
    }
};

module.exports = { otpGenerator };
