# 🚀 BREVO SETUP - EMAIL THAT WORKS ON RENDER!

## ✅ Why Brevo?
- ✅ **300 emails/day FREE** (3x more than SendGrid!)
- ✅ Works perfectly on Render (uses HTTP API, not SMTP)
- ✅ Easy setup (5 minutes)
- ✅ Reliable delivery
- ✅ Professional dashboard

---

## 📋 STEP 1: Create Free Brevo Account (2 minutes)

### 1.1 Sign Up
1. Go to: https://app.brevo.com/account/register
2. Fill in:
   - **Email:** `warisusman073@gmail.com`
   - **Password:** (your choice)
   - **Company Name:** `Farewell Eve 2025` (or any name)
3. Click **"Create Account"**

### 1.2 Verify Email
1. Check your inbox: `warisusman073@gmail.com`
2. Click the verification link
3. Complete the signup process

### 1.3 Answer Quick Questions (Optional)
Brevo might ask:
- What will you use it for? → **Transactional Emails**
- How many contacts? → **Less than 1,000**
- Skip any optional steps

---

## 🔑 STEP 2: Get API Key (1 minute)

### 2.1 Navigate to API Keys
After logging in:
1. Click your **profile name** (top right corner)
2. Click **"SMTP & API"**
3. Or go directly to: https://app.brevo.com/settings/keys/api

### 2.2 Create API Key
1. Click **"Generate a new API key"** or **"Create a new API key"**
2. **Name:** `Ticket-Generator`
3. Click **"Generate"** or **"Create"**

### 2.3 Copy API Key
You'll see something like:
```
xkeysib-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6-AbCdEfGhIjKlMnOp
```

**IMPORTANT:**
- ✅ Should start with `xkeysib-`
- ✅ About 70-80 characters long
- ⚠️ **Copy it NOW!** Save it somewhere safe!

---

## ✉️ STEP 3: Verify Sender Email (Optional but Recommended - 3 minutes)

For better deliverability, verify your sender email:

### Option A: Email Verification

1. In Brevo dashboard, go to: **Settings** → **Senders & IP**
2. Or go to: https://app.brevo.com/settings/senders
3. Click **"Add a new sender"**
4. Enter:
   - **Email:** `warisusman073@gmail.com`
   - **Name:** `Farewell Eve 2025`
5. Click **"Submit"**
6. Check your email and click the verification link
7. ✅ Done!

### Option B: Skip (Default)
Brevo allows sending from unverified emails on free tier, but deliverability might be slightly lower.

---

## 🔧 STEP 4: Update Your Local .env (1 minute)

Open your `.env` file and update/add these lines:

```env
# Brevo Email Service (works on Render!)
BREVO_API_KEY=xkeysib-your-actual-api-key-here
BREVO_FROM_EMAIL=warisusman073@gmail.com
```

**Remove these old lines if present:**
```
SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=...
EMAIL=...
EMAIL_PASSWORD=...
```

---

## 🧪 STEP 5: Test Locally (Optional - 2 minutes)

```bash
# In project root
npm run dev
```

Then:
1. Open frontend in another terminal: `cd frontend && npm run dev`
2. Visit: `http://localhost:5173`
3. Submit a test ticket
4. Go to admin: `http://localhost:5173/admin`
5. Login and approve
6. Check email! Should arrive in 5-10 seconds! ✅

**If email arrives, you're all set!** 🎉

---

## 🚀 STEP 6: Push to GitHub

```bash
git add .
git commit -m "Switch to Brevo for email sending (300/day free)"
git push origin main
```

Render will automatically start deploying! ⚡

---

## 🌐 STEP 7: Update Render Environment Variables

### In Render Dashboard:

1. Go to: https://dashboard.render.com
2. Open your service: **ticket-generator-1h1c**
3. Click **"Environment"** (left sidebar)

### Remove Old Variables (if present):
- ❌ `SENDGRID_API_KEY`
- ❌ `SENDGRID_FROM_EMAIL`
- ❌ `EMAIL`
- ❌ `EMAIL_PASSWORD`

### Add New Variables:

Click **"Add Environment Variable"** twice:

**Variable 1:**
```
Key: BREVO_API_KEY
Value: xkeysib-your-actual-api-key-from-brevo
```

**Variable 2:**
```
Key: BREVO_FROM_EMAIL
Value: warisusman073@gmail.com
```

4. Click **"Save Changes"**
5. Render will **auto-redeploy** (2-3 minutes)

---

## ⏳ STEP 8: Wait for Deployment

In Render:
- Watch the **"Events"** or **"Logs"** tab
- Should see: **"Deploy live"** ✅
- Wait 2-5 minutes

---

## 🎉 STEP 9: Test on Production!

1. Visit: `https://ticket-generator-1h1c.onrender.com`
2. Submit a test ticket (use your email)
3. Go to admin: `https://ticket-generator-1h1c.onrender.com/admin`
4. Login: `admin` / `admin123`
5. Approve the ticket
6. Check email inbox! 📧

**Email should arrive in 5-10 seconds!** ⚡

---

## 📊 Brevo Free Tier Benefits:

| Feature | Brevo Free |
|---------|------------|
| Emails per day | **300** 🎉 |
| Cost | **FREE forever** |
| Works on Render | ✅ Yes |
| Attachments (PDF) | ✅ Yes |
| Delivery speed | ⚡ Fast (5-10 sec) |
| Tracking | ✅ Opens, clicks |
| API calls | ✅ Unlimited |

---

## 📈 Monitor Your Emails:

### Brevo Dashboard:
1. Go to: https://app.brevo.com/
2. Click **"Statistics"** → **"Email"**
3. See real-time stats:
   - ✅ Delivered
   - ✅ Opened
   - ✅ Clicked
   - ❌ Bounced
   - ❌ Spam reports

Track every email sent! 📊

---

## 🐛 Troubleshooting:

### "Invalid API key"
- Check you copied the full key from Brevo
- Should start with `xkeysib-`
- Make sure no extra spaces
- Verify it's added correctly in Render

### "Sender email not allowed"
- Go to Brevo: Settings → Senders & IP
- Add and verify: `warisusman073@gmail.com`
- Wait 2-3 minutes after verification

### "Daily limit exceeded"
- Free tier: 300 emails/day
- Check Brevo dashboard for usage
- Resets at midnight UTC

### Email not arriving:
- Check spam folder
- Verify Brevo dashboard shows "Delivered"
- Check recipient email is correct
- Check Render logs for errors

### Still not working?
Check Render logs:
```
✅ Email sent successfully to... via Brevo
```

Or error:
```
❌ Email sending failed: [error message]
```

---

## 💡 Pro Tips:

1. **Monitor Daily Limit:** 300 emails = plenty for your event!
2. **Check Dashboard:** See delivery stats in real-time
3. **Verify Sender:** Better deliverability with verified email
4. **Test First:** Always test before sharing with users
5. **Backup Plan:** Keep API key safe in case you need to regenerate

---

## 🎯 Quick Reference:

**Brevo Links:**
- Dashboard: https://app.brevo.com/
- API Keys: https://app.brevo.com/settings/keys/api
- Senders: https://app.brevo.com/settings/senders
- Statistics: https://app.brevo.com/statistics/email
- Documentation: https://developers.brevo.com/

**Your Setup:**
- API Key starts with: `xkeysib-`
- From Email: `warisusman073@gmail.com`
- Daily Limit: 300 emails
- Cost: **FREE** 🎉

---

## ✅ Setup Checklist:

- [ ] Sign up at Brevo (https://app.brevo.com/account/register)
- [ ] Verify your email
- [ ] Generate API key (Settings → SMTP & API)
- [ ] Copy API key (starts with `xkeysib-`)
- [ ] (Optional) Verify sender email in Brevo
- [ ] Update local `.env` with Brevo keys
- [ ] Test locally (optional but recommended)
- [ ] Push to GitHub
- [ ] Add `BREVO_API_KEY` to Render
- [ ] Add `BREVO_FROM_EMAIL` to Render
- [ ] Remove old email variables from Render
- [ ] Save and wait for redeploy
- [ ] Test on production site
- [ ] Check email arrives! 🎉

---

## 🎉 You're All Set!

**Brevo gives you:**
- ✅ 300 emails/day (plenty for your event!)
- ✅ Fast delivery (5-10 seconds)
- ✅ Works perfectly on Render
- ✅ FREE forever
- ✅ Professional email tracking

**No more email issues!** 🚀

---

**Let's get your Brevo API key now!**

Go to: https://app.brevo.com/settings/keys/api


