# Changelog

Trail grezzo commit-by-commit, più recente in cima. Per il "perché" dietro le decisioni vedi [PROGRESS.md](PROGRESS.md).

- `2ea903b` — feat(i18n): ✨ move every interface string into it.json and serve the site in Italian only
- `3726eff` — feat(upload): ✨ give every uploaded photo a random file name
- `6fad7de` — build(deps): ⬆️ update every dependency except TypeScript and keep vue-tsc on 3.2
- `4ed0e83` — fix(fonts): 🐛 name the theme variable --font-sans so Inter is actually loaded
- `437054a` — feat(version): ✨ show the version badge as a footer at the bottom right of every page
- `0f1f3c6` — refactor(seo): ♻️ add a useSeoHead composable for the page title, description and sharing image
- `fa9006e` — refactor(components): ♻️ group the image components in a folder and import the url utils through the ~ alias
- `676d81f` — feat(version): ✨ add the version badge ported from PrestaBici to the /siti page
- `13d8555` — refactor(styles): ♻️ drop lang="postcss" from the scoped style blocks
- `c1c563f` — docs(upload): 📝 document the upload modal and the Lucide icon convention
- `dff3090` — feat(upload): ✨ review, shrink and upload several photos in series from a modal
- `05cedb3` — refactor(icons): ♻️ switch from Heroicons to Lucide and list every icon name in one file
- `1310fb8` — refactor(images): ♻️ validate the image route params with Valibot instead of Zod
- `b03f841` — docs(changelog): 📝 regenerate the changelog after rewriting the commit messages
- `67a564f` — chore(tooling): 🔧 enforce the commit message format with a commit-msg hook
- `640047d` — docs(upload): 📝 document the in-browser photo shrinking and Vercel's 4.5 MB limit
- `096ae84` — feat(upload): ✨ shrink photos in the browser before uploading
- `beb959c` — docs(deploy): 📝 document the production environment variables and the first deploy on photos.pauperwave.org
- `42ef654` — chore(seo): 🔧 set photos.pauperwave.org as the canonical address of the site
- `c805401` — docs(changelog): 📝 update the changelog
- `12a6a08` — style(tailwind): 🎨 write Tailwind classes in canonical form (size-12 instead of h-12 w-12)
- `2083f6b` — chore(lint): 🚨 add the better-tailwindcss enforce-canonical-classes rule
- `2d2ea95` — refactor(styles): ♻️ move the Tailwind and Nuxt UI imports into assets/css/main.css
- `dda2035` — refactor(ui): ♻️ adapt the code to Nuxt UI 4: no keywords in useSeoMeta, the USkeleton radius comes from the class
- `d4d9503` — build(deps): ⬆️ update dependencies: Nuxt 4.6, Nuxt UI 4, ESLint 10, Vitest 5 (TypeScript stays on 5.8)
- `e5ea232` — docs(changelog): 📝 update the changelog
- `7435dbc` — build(deploy): 🚀 switch to NuxtHub 0.10 and prepare the Vercel deploy with photos on R2 (S3 driver)
- `54661b1` — docs(changelog): 📝 update the changelog
- `93a8b10` — feat(sites): ✨ add the /siti page listing the Pauperwave subdomains
- `0d2c2ef` — fix(images): 🐛 fix the typecheck error when deleting an image (the pathname can be missing)
- `90b2a48` — feat: 🎉 bootstrap the landing from the nuxt-image-gallery template
- `3ea249e` — chore: 🎉 initial commit
