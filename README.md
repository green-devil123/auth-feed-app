# Auth Feed App

Mini React + TypeScript + Tailwind app implementing an auth-gated feed.

Features:
- Feed with post editor (publish works)
- Sign In / Sign Up forms (frontend only)
- Modal shown for unauthenticated interactions
- Simple animations with CSS

Run locally:

1. npm install
2. npm run dev


Builld
1. npm run build
2. npm install -g serve
3. serve -s dist

One of the most challenging parts of this project was integrating the MUI Rich Text Editor. Handling its CSS customization while ensuring that all predefined features worked correctly required careful configuration and styling adjustments. The editor’s default behavior often conflicted with the overall design, so achieving a seamless user experience took extra effort.