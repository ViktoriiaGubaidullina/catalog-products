# About

A small demo app for browsing a product catalog.

It includes two pages:
- **Catalog** (`/`) - displays a list of products with pagination and a simple search filter
- **Product Detail** (`/product/[id]`) - shows detailed information about a selected product along with a generated QR code

The app uses data from [DummyJSON](https://dummyjson.com/docs/products#products-categories).

I initially planned to implement filtering via query parameters, but since DummyJSON doesn’t support category- or search-based filtering, I decided to keep the current implementation.

If you’re curious, you can check how filtering is implemented manually in the computed property `filteredProducts` inside `store/products.ts`, and check how it works in commit `4f06572c2fd2826eb30bc862432d5785783a3bc3`.

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
