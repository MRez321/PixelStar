// scripts/scaffold.ts
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..');

// Every file that should exist (relative to project root).
// We'll create directories automatically.
const files: { filepath: string; content?: string }[] = [
  // GitHub Actions
  { filepath: '.github/workflows/deploy.yml', content: '# CI/CD workflow\n' },

  // Drizzle
  { filepath: 'drizzle/schema/auth.ts', content: '// auth schema\n' },
  { filepath: 'drizzle/schema/blog.ts', content: '// blog schema\n' },
  { filepath: 'drizzle/schema/users.ts', content: '// users schema\n' },
  { filepath: 'drizzle/schema/api-keys.ts', content: '// api-keys schema\n' },
  { filepath: 'drizzle/schema/favorites.ts', content: '// favorites schema\n' },
  { filepath: 'drizzle/schema/billing.ts', content: '// billing schema\n' },
  { filepath: 'drizzle/schema/webhooks.ts', content: '// webhooks schema\n' },
  { filepath: 'drizzle/relations.ts', content: '// drizzle relations\n' },
  { filepath: 'drizzle/seed.ts', content: '// seed script\n' },
  // migrations folder created dynamically when drizzle-kit runs, but we'll add .gitkeep
  { filepath: 'drizzle/migrations/.gitkeep', content: '' },

  // emails
  { filepath: 'emails/magic-link.tsx', content: '// magic link email\n' },
  { filepath: 'emails/welcome.tsx', content: '// welcome email\n' },
  { filepath: 'emails/quota-warning.tsx', content: '// quota warning email\n' },

  // public
  { filepath: 'public/favicon.ico', content: '' },
  { filepath: 'public/og-image.png', content: '' },

  // scripts (already present, but we'll ensure they exist)
  { filepath: 'scripts/scaffold.ts', content: '' }, // will not overwrite itself
  { filepath: 'scripts/seed-db.ts', content: '// seed database script\n' },
  { filepath: 'scripts/backup-db.ts', content: '// backup database script\n' },

  // app
  { filepath: 'app/(auth)/signin/page.tsx', content: 'export default function SignIn() { return <div>Sign In</div>; }\n' },
  { filepath: 'app/(auth)/signup/page.tsx', content: 'export default function SignUp() { return <div>Sign Up</div>; }\n' },
  { filepath: 'app/(auth)/verify/page.tsx', content: 'export default function Verify() { return <div>Verify Email</div>; }\n' },
  { filepath: 'app/(auth)/layout.tsx', content: 'export default function AuthLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n' },
  { filepath: 'app/(blog)/blog/[slug]/page.tsx', content: 'export default function BlogPost() { return <div>Blog Post</div>; }\n' },
  { filepath: 'app/(blog)/blog/page.tsx', content: 'export default function BlogList() { return <div>Blog List</div>; }\n' },
  { filepath: 'app/(blog)/blog/loading.tsx', content: 'export default function Loading() { return <div>Loading...</div>; }\n' },
  { filepath: 'app/(blog)/search/page.tsx', content: 'export default function Search() { return <div>Search</div>; }\n' },
  { filepath: 'app/(blog)/layout.tsx', content: 'export default function BlogLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n' },
  { filepath: 'app/(portfolio)/portfolio/page.tsx', content: 'export default function Portfolio() { return <div>Portfolio</div>; }\n' },
  { filepath: 'app/(portfolio)/github/page.tsx', content: 'export default function GitHub() { return <div>GitHub</div>; }\n' },
  { filepath: 'app/(portfolio)/layout.tsx', content: 'export default function PortfolioLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n' },
  { filepath: 'app/(apps)/apps/image-optimizer/page.tsx', content: 'export default function ImageOptimizer() { return <div>Image Optimizer</div>; }\n' },
  { filepath: 'app/(apps)/apps/[appId]/page.tsx', content: 'export default function AppPage() { return <div>App</div>; }\n' },
  { filepath: 'app/(apps)/apps/layout.tsx', content: 'export default function AppsLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n' },
  { filepath: 'app/(apps)/layout.tsx', content: 'export default function AppsGroupLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n' },
  { filepath: 'app/(dashboard)/dashboard/profile/page.tsx', content: 'export default function Profile() { return <div>Profile</div>; }\n' },
  { filepath: 'app/(dashboard)/dashboard/favorites/page.tsx', content: 'export default function Favorites() { return <div>Favorites</div>; }\n' },
  { filepath: 'app/(dashboard)/dashboard/api-keys/page.tsx', content: 'export default function ApiKeys() { return <div>API Keys</div>; }\n' },
  { filepath: 'app/(dashboard)/dashboard/billing/page.tsx', content: 'export default function Billing() { return <div>Billing</div>; }\n' },
  { filepath: 'app/(dashboard)/dashboard/layout.tsx', content: 'export default function DashboardLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n' },
  { filepath: 'app/(dashboard)/admin/users/page.tsx', content: 'export default function AdminUsers() { return <div>Admin Users</div>; }\n' },
  { filepath: 'app/(dashboard)/admin/posts/page.tsx', content: 'export default function AdminPosts() { return <div>Admin Posts</div>; }\n' },
  { filepath: 'app/(dashboard)/admin/analytics/page.tsx', content: 'export default function AdminAnalytics() { return <div>Admin Analytics</div>; }\n' },
  { filepath: 'app/(dashboard)/admin/layout.tsx', content: 'export default function AdminLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n' },
  { filepath: 'app/(dashboard)/layout.tsx', content: 'export default function DashboardGroupLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }\n' },
  { filepath: 'app/api/auth/[...nextauth]/route.ts', content: '// auth handler\n' },
  { filepath: 'app/api/v1/image-optimizer/route.ts', content: '// image optimizer API\n' },
  { filepath: 'app/api/v1/[app]/route.ts', content: '// dynamic app API\n' },
  { filepath: 'app/api/v1/webhooks/stripe/route.ts', content: '// stripe webhook handler\n' },
  { filepath: 'app/api/v1/docs/route.ts', content: '// OpenAPI docs endpoint\n' },
  { filepath: 'app/api/internal/blog/route.ts', content: '// internal blog API\n' },
  { filepath: 'app/api/internal/favorites/route.ts', content: '// internal favorites API\n' },
  { filepath: 'app/api/internal/search/route.ts', content: '// internal search API\n' },
  { filepath: 'app/api/health/route.ts', content: '// health check\n' },
  { filepath: 'app/docs/page.tsx', content: 'export default function Docs() { return <div>API Docs</div>; }\n' },
  { filepath: 'app/layout.tsx', content: 'import type { Metadata } from "next";\nimport "./globals.css";\nexport const metadata: Metadata = { title: "My Portfolio" };\nexport default function RootLayout({ children }: { children: React.ReactNode }) { return (\n<html lang="en"><body>{children}</body></html>\n); }\n' },
  { filepath: 'app/page.tsx', content: 'export default function Home() { return <div>Home</div>; }\n' },
  { filepath: 'app/error.tsx', content: '"use client";\nexport default function Error() { return <div>Error</div>; }\n' },
  { filepath: 'app/not-found.tsx', content: 'export default function NotFound() { return <div>Not Found</div>; }\n' },
  { filepath: 'app/globals.css', content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' },

  // components
  { filepath: 'components/ui/.gitkeep', content: '' },
  { filepath: 'components/layout/global-nav.tsx', content: 'export function GlobalNav() { return <nav>Nav</nav>; }\n' },
  { filepath: 'components/layout/sub-nav.tsx', content: 'export function SubNav() { return <nav>Sub Nav</nav>; }\n' },
  { filepath: 'components/layout/footer.tsx', content: 'export function Footer() { return <footer>Footer</footer>; }\n' },
  { filepath: 'components/layout/quick-access.tsx', content: 'export function QuickAccess() { return <div>Quick Access</div>; }\n' },
  { filepath: 'components/auth/signin-form.tsx', content: 'export function SignInForm() { return <form>Sign In</form>; }\n' },
  { filepath: 'components/auth/role-guard.tsx', content: 'export function RoleGuard() { return null; }\n' },
  { filepath: 'components/blog/post-editor.tsx', content: 'export function PostEditor() { return <div>Editor</div>; }\n' },
  { filepath: 'components/blog/post-card.tsx', content: 'export function PostCard() { return <div>Post Card</div>; }\n' },
  { filepath: 'components/blog/post-renderer.tsx', content: 'export function PostRenderer() { return <div>Post Renderer</div>; }\n' },
  { filepath: 'components/portfolio/.gitkeep', content: '' },
  { filepath: 'components/apps/.gitkeep', content: '' },
  { filepath: 'components/dashboard/.gitkeep', content: '' },

  // lib
  { filepath: 'lib/auth.ts', content: '// auth config\n' },
  { filepath: 'lib/db.ts', content: '// database client\n' },
  { filepath: 'lib/redis.ts', content: '// redis client\n' },
  { filepath: 'lib/rate-limiter.ts', content: '// rate limiter\n' },
  { filepath: 'lib/billing/index.ts', content: '// billing service interface\n' },
  { filepath: 'lib/billing/mock.ts', content: '// mock billing\n' },
  { filepath: 'lib/billing/stripe.ts', content: '// stripe billing (future)\n' },
  { filepath: 'lib/email.ts', content: '// email client (resend)\n' },
  { filepath: 'lib/api-keys.ts', content: '// api key utilities\n' },
  { filepath: 'lib/webhooks.ts', content: '// webhook utilities\n' },
  { filepath: 'lib/search.ts', content: '// full-text search helpers\n' },
  { filepath: 'lib/analytics.ts', content: '// analytics helpers\n' },
  { filepath: 'lib/validators/index.ts', content: '// zod schemas\n' },
  { filepath: 'lib/utils.ts', content: '// shared utilities\n' },

  // hooks
  { filepath: 'hooks/.gitkeep', content: '' },
  // styles
  { filepath: 'styles/.gitkeep', content: '' },
  // types
  { filepath: 'types/.gitkeep', content: '' },

  // Config files
  { filepath: '.env.local.example', content: 'DATABASE_URL=\nREDIS_URL=\nAUTH_SECRET=\n' },
  { filepath: '.env.production.example', content: 'DATABASE_URL=\nREDIS_URL=\nAUTH_SECRET=\n' },
  { filepath: '.eslintrc.js', content: 'module.exports = { extends: ["next/core-web-vitals", "prettier"] };\n' },
  { filepath: '.prettierrc', content: '{\n  "semi": true,\n  "singleQuote": true,\n  "tabWidth": 2,\n  "trailingComma": "all",\n  "plugins": ["prettier-plugin-tailwindcss"]\n}\n' },
  { filepath: 'docker-compose.yml', content: '' },
  { filepath: 'docker-compose.prod.yml', content: '' },
  { filepath: 'Dockerfile', content: '' },
  { filepath: 'Dockerfile.dev', content: '' },
  { filepath: 'next.config.js', content: '/** @type {import("next").NextConfig} */\nconst nextConfig = {};\nmodule.exports = nextConfig;\n' },
  { filepath: 'tailwind.config.ts', content: 'import type { Config } from "tailwindcss";\nexport default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: {} }, plugins: [require("tailwindcss-animate")] } satisfies Config;\n' },
  { filepath: 'tsconfig.json', content: '{\n  "compilerOptions": {\n    "target": "ES2017",\n    "lib": ["dom", "dom.iterable", "esnext"],\n    "allowJs": true,\n    "skipLibCheck": true,\n    "strict": true,\n    "noEmit": true,\n    "esModuleInterop": true,\n    "module": "esnext",\n    "moduleResolution": "bundler",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "jsx": "preserve",\n    "incremental": true,\n    "plugins": [{ "name": "next" }],\n    "paths": { "@/*": ["./*"] }\n  },\n  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],\n  "exclude": ["node_modules"]\n}\n' },
  { filepath: 'drizzle.config.ts', content: `import type { Config } from "drizzle-kit";\nexport default { schema: "./drizzle/schema/*", out: "./drizzle/migrations", driver: "pg", dbCredentials: { connectionString: process.env.DATABASE_URL! } } satisfies Config;\n` },
  { filepath: 'vitest.config.ts', content: `import { defineConfig } from "vitest/config";\nimport react from "@vitejs/plugin-react";\nexport default defineConfig({ plugins: [react()], test: { environment: "jsdom" } });\n` },
];

// Create directories and files
for (const { filepath, content } of files) {
  const fullPath = path.join(root, filepath);
  const dir = path.dirname(fullPath);

  // Ensure directory exists
  fs.mkdirSync(dir, { recursive: true });

  // Write file (don't overwrite scaffold.ts itself)
  if (filepath === 'scripts/scaffold.ts') continue;

  fs.writeFileSync(fullPath, content || '', 'utf-8');
}

console.log('✅ Full project scaffold created (all empty files).');