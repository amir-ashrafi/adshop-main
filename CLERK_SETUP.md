# Clerk Setup Guide

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
CLERK_SECRET_KEY="sk_test_your_secret_key_here"

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

## How to Get Clerk Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select existing one
3. Go to "API Keys" section
4. Copy the "Publishable Key" and "Secret Key"
5. Replace the placeholder values in your `.env.local` file

## Setting Up Admin Users

1. Sign up with a user account in your application
2. Go to Clerk Dashboard → Users
3. Find your user and click on it
4. Go to "Metadata" tab
5. Add a new metadata field:
   - Key: `isAdmin`
   - Value: `true`
6. Save the changes

## Testing the User Management

The current implementation uses mock data for testing. To use real Clerk data:

1. Ensure your environment variables are set correctly
2. Replace the mock data in `/api/dashboard/users/route.ts` with real Clerk API calls
3. Uncomment the clerkClient code and remove the mock data

## Current Status

- ✅ User Management UI is fully functional
- ✅ Mock data is working for testing
- ⚠️ Real Clerk integration requires proper environment setup
- ⚠️ Admin user needs to be configured in Clerk Dashboard

## Troubleshooting

If you see "Failed to fetch users":
1. Check if `.env.local` file exists
2. Verify Clerk keys are correct
3. Ensure you're signed in as an admin user
4. Check browser console for detailed error messages 