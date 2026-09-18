import crypto from 'crypto'

function randomOtp(length = 6) {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString()
}

export async function sendOtp(mobile) {
  const code = process.env.DEMO_MODE === 'true' ? '123456' : randomOtp()
  const provider = (process.env.OTP_PROVIDER || 'console').toLowerCase()

  if (provider === 'msg91') {
    // MSG91 = easy-to-use India SMS gateway. Configure keys in .env.
    const url = `https://control.msg91.com/api/v5/otp?template_id=${process.env.MSG91_TEMPLATE_ID}&mobile=91${mobile}&authkey=${process.env.MSG91_AUTH_KEY}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ OTP: code, Sender_ID: process.env.MSG91_SENDER_ID || 'NIRMAN' }),
    }).catch(() => null)
    if (!res || !res.ok) console.warn('[otp] MSG91 send failed, falling back to console')
    else return { sent: true, devCode: process.env.DEMO_MODE === 'true' ? code : undefined }
  }

  if (provider === 'twilio') {
    // Twilio fallback (works outside India too).
    const account = process.env.TWILIO_ACCOUNT_SID
    const token = process.env.TWILIO_AUTH_TOKEN
    if (account && token) {
      const body = new URLSearchParams({ To: `+91${mobile}`, From: process.env.TWILIO_FROM, Body: `Your Nirman SETU OTP is ${code}` })
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${account}/Messages.json`, {
        method: 'POST',
        headers: { Authorization: 'Basic ' + Buffer.from(`${account}:${token}`).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      }).catch(() => null)
      if (res && res.ok) return { sent: true }
      console.warn('[otp] Twilio send failed, falling back to console')
    }
  }

  // Default console provider (development). Prints the code so the flow is usable.
  console.log(`[otp] OTP for ${mobile}: ${code}`)
  return { sent: true, devCode: code }
}

export function verifyOtp(stored, storedExpires, given) {
  if (!stored || !given) return false
  if (`${stored}` !== `${given}`) return false
  if (storedExpires && new Date(storedExpires).getTime() < Date.now()) return false
  return true
}