# Rodado

Rodado is a Spanish-first, mobile-first wholesale motorcycle tire storefront concept for distributors in the Dominican Republic.

## Product direction

- Brand: Rodado Distribuidora
- Experience: fast B2B ordering with stock visibility, wholesale pricing, volume tiers, and a lightweight cart flow
- Language: Spanish-first, ready for translation keys and English fallback
- Visual system: deep forest green, acid lime, warm off-white, rounded cards, and high-contrast mobile controls

## Current demo

The home page includes:

- Responsive catalog with category tabs and search
- Wholesale price presentation, stock indicators, and featured products
- Add-to-order interactions with quantity and total feedback
- Distributor benefits, delivery messaging, and account entry points
- Spanish metadata and a custom Rodado identity with no Vercel branding

## Production handoff

The next implementation layer should connect the UI to PostgreSQL/Prisma, NextAuth credentials, Zod validation, the Odoo service interface, and a CardNet/Azul payment adapter. Keep fiscal identity (Cédula/RNC) separate from authentication credentials and never persist raw card data.

## Developer

Built and maintained by **Afaq Ahmad**.

## Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` to view the storefront.

## Recommended service boundaries

- `lib/odoo/`: `authenticate`, `getProducts`, `getStock`, `getCustomerPricelist`, `createSaleOrder`
- `lib/payments/`: provider-neutral tokenization and charge interface
- `messages/es.json` and `messages/en.json`: all customer-facing copy
- `prisma/schema.prisma`: users, customers, catalog, price tiers, inventory, orders, payments, and audit records
