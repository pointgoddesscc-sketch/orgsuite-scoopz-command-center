# Cookie Rotation Instructions
## Orgsuite Scoopz Command Center – Business & Marketing Edition

**Purpose**  
Keep your Git HTTP Customization cookies and marketing service sessions secure by regularly rotating them. Session cookies should never live forever.

---

## 1. When to Rotate Cookies

Rotate immediately if:
- You shared a cookie value anywhere (chat, screenshot, email, Git)
- A team member leaves
- You suspect unauthorized access
- Every 7–14 days as good hygiene for marketing dashboards
- After any security incident

---

## 2. How to Rotate Browser Session Cookies (GitHub, Vercel, Notion, Linear, etc.)

### Step-by-step

1. **Log out** of the service in your browser (GitHub, Vercel, Notion, Linear, Google, Stripe, etc.).
2. **Clear existing cookies** for that domain:
   - Chrome / Edge → DevTools → Application → Cookies → select domain → Clear
   - Safari → Preferences → Privacy → Manage Website Data
3. **Log back in** normally.
4. Open **DevTools → Application → Cookies**.
5. Copy the new `name=value` pairs you need.
6. Open the ready-to-paste file:  
   `docs/orgsuite-cookies-ready.txt`
7. Replace the old `REPLACE_...` (or previous real values) with the new ones.
8. Copy the entire updated block.
9. In your Git client → **HTTP Customization → Import Cookie → Clipboard** → Paste.
10. Test by making a request to a private resource.

The old session is now invalid. The new session cookies are active.

---

## 3. Quick Rotation Checklist (copy into Notion or Linear)

- [ ] Log out of service
- [ ] Clear old cookies in browser
- [ ] Log in again
- [ ] Copy fresh cookie values
- [ ] Update `orgsuite-cookies-ready.txt`
- [ ] Re-import via Clipboard in HTTP Customization
- [ ] Verify access still works
- [ ] Delete any screenshots or notes that contained old values

---

## 4. Twilio Auth Token Rotation (Company Messaging)

Twilio does **not** use browser cookies for API calls.  
It uses Account SID + Auth Token.

**Rotate the Auth Token when:**
- It was ever shown in a screenshot or chat
- A developer leaves the team
- Every 90 days as policy

### How to rotate Twilio Auth Token

1. Go to [Twilio Console](https://console.twilio.com) → Account → API keys & tokens.
2. Click **Create new Auth Token** (or “Request a new Auth Token”).
3. Copy the new token immediately (it is shown only once).
4. Update the environment variable on Vercel:
   ```
   TWILIO_AUTH_TOKEN = the_new_token
   ```
5. Redeploy the project.
6. Delete / revoke the old Auth Token.
7. Update any local `.env` files and never commit them.

Your marketing WhatsApp route (`/api/marketing/whatsapp`) will automatically use the new token.

---

## 5. JavaScript Helper – Detect Expired Session (Optional)

Add this small check in marketing pages if you want to warn users when a session may be stale:

```js
/**
 * Simple session health check for Orgsuite marketing dashboards
 * Call this on page load if you rely on cookie-based auth
 */
async function checkSessionHealth(serviceUrl) {
  try {
    const res = await fetch(serviceUrl, { credentials: 'include' });
    if (res.status === 401 || res.status === 403) {
      console.warn('Session may be expired – rotate cookies');
      return false;
    }
    return true;
  } catch (err) {
    console.error('Session check failed', err);
    return false;
  }
}
```

---

## 6. Best Practices Summary

| Item                    | Recommendation                          |
|-------------------------|-----------------------------------------|
| Browser session cookies | Rotate every 7–14 days or after exposure |
| Twilio Auth Token       | Rotate immediately if exposed + every 90 days |
| Storage                 | Never store real cookies in Git         |
| Import method           | Always use Clipboard after rotation     |
| Documentation           | Keep this file updated in the repo      |

---

**File location in repo**  
`docs/COOKIE-ROTATION.md`

This keeps the Orgsuite Scoopz Command Center secure while supporting continuous marketing operations.
