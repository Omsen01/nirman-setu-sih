// Auto-seeds the database once on first boot (only if empty).
// Used by index.js so a fresh deployment is immediately populated.
import Worker from '../models/Worker.js'
import User from '../models/User.js'

export async function ensureSeeded() {
  try {
    const workers = await Worker.countDocuments()
    const users = await User.countDocuments()
    if (workers > 0 && users > 0) {
      console.log('[seed] data already present — skipping auto-seed')
      return
    }
    const { runSeed } = await import('../scripts/seed.js')
    await runSeed()
    console.log('[seed] auto-seed complete')
  } catch (err) {
    console.error('[seed] auto-seed failed:', err.message)
  }
}