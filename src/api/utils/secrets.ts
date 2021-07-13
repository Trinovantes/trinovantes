import { config } from 'dotenv'
import fs from 'fs'

// Loads .env into process.env
config()

export enum Secrets {
    GITHUB_PAT = 'GITHUB_PAT',
}

export function getSecret(key: string): string {
    // Check if it's already defined in process.env
    const envValue = process.env[key]
    if (envValue) {
        return envValue
    }

    // Check if it exists as a runtime secret via Docker
    const secretsFile = `/run/secrets/${key}`
    if (fs.existsSync(secretsFile)) {
        const secret = fs.readFileSync(secretsFile)
        return secret.toString('utf-8')
    }

    // Cannot find the secret anywhere
    throw new Error(`Cannot find ${key}`)
}
