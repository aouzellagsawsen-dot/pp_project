# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


project/
├── src/
│   ├── config/
│   │   ├── db.js            # Connexion base de données
│   │   └── env.js           # Variables d'environnement
│   │
│   ├── models/              # 📦 MODEL — données & 
│   │   ├── user.model.js
│   │   └── product.model.js
│   │
│   ├── views/               # 👁️ VIEW — réponses JSON 
│   │   └── (optionnel si API pure, sinon EJS/Pug)
│   │
│   ├── controllers/         # 🎮 CONTROLLER — 
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   └── product.controller.js
│   │
│   ├── routes/              # 🛣️ Routes — lien URL ↔ 
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── index.js
│   │
│   ├── middlewares/         # 🔒 Auth, validation, 
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   └── app.js
├── .env
└── server.js

```

---

## 🧪 Endpoints

| Méthode | Route | Auth |
|---|---|---|
| POST | `/api/v1/auth/register` | ❌ |
| POST | `/api/v1/auth/login` | ❌ |
| POST | `/api/v1/auth/refresh` | ❌ |
| POST | `/api/v1/auth/logout` | ✅ JWT |
| GET | `/api/v1/auth/me` | ✅ JWT |

---

## 🔄 Résumé du flux
```
POST /login
  → validate.middleware   vérifie les inputs
  → passport.authenticate vérifie email + password en DB
  → auth.controller       génère accessToken + refreshToken
  → réponse JSON avec les tokens

Requête protégée
  → jwt.middleware        vérifie le token JWT
  → req.user disponible dans le controller