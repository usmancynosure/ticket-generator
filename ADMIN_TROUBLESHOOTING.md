## 🔍 TROUBLESHOOTING: Admin Panel Not Showing Tickets

### Quick Checks:

1. **Is Backend Running?**
   - Check terminal 6
   - Should show: `✅ Firebase initialized successfully`

2. **Did You Submit a Ticket?**
   - Go to: http://localhost:5173
   - Submit a test ticket
   - Check if you see "Pending Verification" message

3. **Check Firebase Console:**
   - Go to: https://console.firebase.google.com
   - Select: ticket-generator-eaf07
   - Click "Firestore Database"
   - Look for "tickets" collection
   - Any documents there?

4. **Check Browser Console:**
   - Press F12 in browser
   - Go to Console tab
   - Any errors?

5. **Check Network Tab:**
   - Press F12 → Network tab
   - Try loading admin panel
   - Look for request to `/api/admin/tickets`
   - What's the response?

---

### If No Tickets Show Up:

#### Step 1: Submit a Test Ticket
1. Go to http://localhost:5173
2. Fill form:
   - Name: Test User
   - Reg: TEST001
   - Batch: 2021-2025
   - Email: test@example.com
3. Submit
4. Should see "Pending Verification"

#### Step 2: Check Firebase
1. Go to Firebase Console
2. Open Firestore Database
3. Should see "tickets" collection
4. Click it - any documents?

#### Step 3: Refresh Admin Panel
1. Go to http://localhost:5173/admin
2. Login again
3. Should see the ticket!

---

### If Still Not Working:

#### Check Backend Logs:
Look at terminal 6 for errors when you:
1. Submit a ticket
2. Load admin panel
3. Any error messages?

#### Test API Directly:
Open browser and visit:
```
http://localhost:5000/api/admin/stats
```

Should show:
```json
{
  "success": true,
  "stats": {
    "pending": 0,
    "approved": 0,
    "rejected": 0,
    "total": 0
  }
}
```

If you see error, tell me what it says!

---

### Common Issues:

**1. Firebase Not Initialized**
- Check .env has all Firebase credentials
- Restart backend: Ctrl+C, then `npm run dev`

**2. No Tickets Submitted**
- Submit a test ticket first
- Then check admin panel

**3. Wrong Filter Selected**
- Click "All" tab in admin panel
- Or click "Pending" tab

**4. Login Not Working**
- Make sure you're logged in
- Username: admin
- Password: admin123

---

### Quick Debug:

**In browser console (F12), run:**
```javascript
fetch('http://localhost:5000/api/admin/tickets')
  .then(r => r.json())
  .then(console.log)
```

This will show you what the API returns!

---

**What do you see when you:**
1. Submit a ticket?
2. Check Firebase Console?
3. Load admin panel?

Let me know and I'll help you fix it! 🔧

