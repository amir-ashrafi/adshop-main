# Digital Shop

A modern e-commerce platform built with Next.js, Prisma, and PostgreSQL.

## Features

- Product management with categories
- User authentication with Clerk
- Shopping cart functionality
- **Automatic discount expiration system**
- Responsive design with Tailwind CSS
- Real-time price calculations

## Discount System

The application includes an automatic discount expiration system that:

### Features
- **Automatic Expiration**: Discounts automatically expire when their end time is reached
- **Real-time Validation**: Prices are calculated in real-time based on current time vs discount end time
- **Validation**: Prevents discounts without end times from being created
- **Clean UI**: Expired discounts are automatically hidden from discount sections

### How it Works
1. When creating a product with a discount, an end time (`discountEndsAt`) is required
2. The system automatically calculates effective prices based on current time
3. Expired discounts are filtered out from all product listings
4. A scheduled task can automatically reset expired discounts in the database

### Manual Discount Expiration
To manually expire discounts, run:
```bash
npm run expire-discounts
```

### API Endpoints
- `GET /api/expire-discounts` - Check for expired discounts
- `POST /api/expire-discounts` - Expire all expired discounts

### Setting up Automatic Expiration
To set up automatic discount expiration, you can:

1. **Use a cron job** (recommended for production):
```bash
# Run every hour
0 * * * * cd /path/to/your/app && npm run expire-discounts
```

2. **Use a service like Vercel Cron** (if deployed on Vercel):
Add to your `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/expire-discounts",
      "schedule": "0 * * * *"
    }
  ]
}
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables
4. Run database migrations: `npm run migrate`
5. Start the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file with:
```
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."
```

## Database Schema

The application uses PostgreSQL with the following key models:
- `Product`: Products with optional discounts and expiration times
- `CartItem`: Shopping cart items
- `Order`: Customer orders
- `Image`: Product images

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
