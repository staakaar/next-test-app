import nextJest from 'next/jest'
import nestJest from 'next/jest'

const createJestConfig = nextJest({dir: './'})
const customJestConfig = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    setupFilesAterEnv: ['<rootDir>/jest.setup.js'],
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    testEnvironment: 'jsdom',
}

module.exports = createJestConfig(customJestConfig)