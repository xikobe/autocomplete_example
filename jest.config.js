module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'],
    collectCoverageFrom: [
        '<rootDir>/pages/**',
        '<rootDir>/pages/*.js',
        '<rootDir>/lib/**',
        '<rootDir>/lib/*.js',
        '<rootDir>/components/**',
        '<rootDir>/components/*.js',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/.next/',
        '<rootDir>/node_modules/',
        '<rootDir>/coverage/',
    ],
};
