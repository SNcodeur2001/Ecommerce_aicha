import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'db.json')
const ITERATIONS = 310000
const KEY_LENGTH = 32
const DIGEST = 'sha256'
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'dev-admin-secret-change-me'

export type AdminUser = {
  id: string
  username: string
  passwordHash: string
  salt: string
  role: string
}

async function readDb() {
  const raw = await fs.readFile(DB_PATH, 'utf8')
  return JSON.parse(raw) as { admins?: AdminUser[] }
}

export async function getAdminUsers() {
  const db = await readDb()
  return db.admins ?? []
}

export function hashPassword(password: string, salt: string) {
  return pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex')
}

export function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString('hex')
  const passwordHash = hashPassword(password, salt)
  return { passwordHash, salt }
}

export async function verifyAdminPassword(username: string, password: string) {
  const users = await getAdminUsers()
  const user = users.find((entry) => entry.username === username)

  if (!user) {
    return null
  }

  const expectedHash = hashPassword(password, user.salt)
  const actualHash = user.passwordHash

  const expectedBuffer = Buffer.from(expectedHash, 'hex')
  const actualBuffer = Buffer.from(actualHash, 'hex')

  if (expectedBuffer.length !== actualBuffer.length) {
    return null
  }

  const match = timingSafeEqual(expectedBuffer, actualBuffer)
  return match ? user : null
}

export function createSessionToken(username: string) {
  const payload = `${username}:${Date.now()}`
  const encodedPayload = Buffer.from(payload).toString('base64url')
  const signature = createHmac('sha256', SESSION_SECRET).update(encodedPayload).digest('hex')
  return `${encodedPayload}.${signature}`
}

export function verifySessionToken(token: string) {
  if (!token) {
    return null
  }

  const [payload, signature] = token.split('.')
  if (!payload || !signature) {
    return null
  }

  const expectedSignature = createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
  const actualSignature = Buffer.from(signature, 'hex')
  const expectedSignatureBuffer = Buffer.from(expectedSignature, 'hex')

  const valid = actualSignature.length === expectedSignatureBuffer.length && timingSafeEqual(actualSignature, expectedSignatureBuffer)

  if (!valid) {
    return null
  }

  const decoded = Buffer.from(payload, 'base64url').toString('utf8')
  const [username] = decoded.split(':')
  return username || null
}
