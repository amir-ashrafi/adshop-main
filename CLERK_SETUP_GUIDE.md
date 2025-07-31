# Clerk Setup Guide - User Management

## 🚨 Current Issue
The user management system is not showing real users because Clerk is not properly configured.

## 🔧 Step-by-Step Setup

### 1. Get Clerk API Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select your existing one
3. Navigate to **API Keys** in the sidebar
4. Copy both keys:
   - **Publishable Key** (starts with `pk_test_...`)
   - **Secret Key** (starts with `sk_test_...`)

### 2. Configure Environment Variables

The `.env.local` file has been created. Update it with your real Clerk keys:

```env
# Replace these placeholder values with your real Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_actual_publishable_key"
CLERK_SECRET_KEY="sk_test_your_actual_secret_key"
```

### 3. Set Up Admin User

1. Sign up with a user account in your application
2. Go to Clerk Dashboard → **Users**
3. Find your user and click on it
4. Go to **Metadata** tab
5. Add a new metadata field:
   - **Key**: `isAdmin`
   - **Value**: `true`
6. Save the changes

### 4. Test Clerk Configuration

Visit this URL to test if Clerk is working:
```
http://localhost:3001/api/test-clerk
```

You should see a JSON response indicating if Clerk is working correctly.

### 5. Restart Development Server

After updating the environment variables:

```bash
npm run dev
```

## 🎯 Expected Results

After proper setup:

1. **User Management Page** (`/dashboard/usersManagement`) will show real users
2. **Dashboard Stats** will show actual user counts
3. **User Actions** (admin toggle, ban/unban, delete) will work with real data

## 🔍 Troubleshooting

### If you see "Clerk configuration error":

1. **Check environment variables** are set correctly
2. **Verify API keys** are copied exactly (no extra spaces)
3. **Restart the server** after changing environment variables
4. **Check browser console** for detailed error messages

### If you see "Forbidden - Admin access required":

1. **Set up admin user** in Clerk Dashboard (step 3 above)
2. **Sign in with the admin user**
3. **Check metadata** is set correctly

### If you see "No users found":

1. **Create test users** by signing up multiple accounts
2. **Check Clerk Dashboard** to see if users are being created
3. **Verify API keys** have proper permissions

## 📋 Quick Test Commands

```bash
# Test environment setup
npm run setup-env

# Test admin setup
npm run setup-admin

# Test Clerk API
curl http://localhost:3001/api/test-clerk
```

## 🎉 Success Indicators

When everything is working correctly:

- ✅ User Management page loads without errors
- ✅ Real user data appears in the table
- ✅ User statistics show on dashboard
- ✅ Admin actions work (toggle admin, ban/unban, delete)
- ✅ Search functionality works with real data

## 📞 Need Help?

If you're still having issues:

1. Check the browser console for errors
2. Check the server logs for detailed error messages
3. Verify your Clerk application is active and properly configured
4. Ensure you're using the correct API keys for your environment (test/production) 