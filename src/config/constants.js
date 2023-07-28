const responseCodes = {
    3000: 'Healthy Status',
    3001: 'Login successful',
    3002: 'Company registration successful',
    3042: 'Media uploaded',
    //error codes
    1010: 'Company already registered',
    1011: 'Email must be provided',
    1012: 'Password must be provided',
    1013: 'Incorrect email',
    1014: 'Incorrect password',
    1015: 'Your company has not been approved yet',
}

module.exports = {
   RESPONSE_CODE: responseCodes,
}