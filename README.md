This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Add .env.local file to the root directory

```bash
DB_HOST=postgres
DB_USER=user
DB_PASS=pass
DB_NAME=db
REDIS_URL=redis://redis:6379/0
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/api/graphql
```

First, run the development server:

```bash
yarn install
docker-compose -f local.yml build
docker-compose -f local.yml up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) with your browser to access the graphql studio.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
