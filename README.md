This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, run the command:
```bash
npm install
docker compose up
```

Second, run the comands, only once (if the docker image is build) is to populate the DB and make Tables :
```bash
npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all
```

Then, run the development server, in a second terminal:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
