# React + Vite

Šis ir Todo lietotnes frontend – React ar Vite. Veidne nodrošina minimālu iestatījumu, lai React darbotos Vite vidē ar HMR un dažiem ESLint noteikumiem.

Pašlaik pieejami divi oficiālie spraudņi:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) izmanto [Babel](https://babeljs.io/) (vai [oxc](https://oxc.rs), ja lieto [rolldown-vite](https://vite.dev/guide/rolldown)) Fast Refresh vajadzībām
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) izmanto [SWC](https://swc.rs/) Fast Refresh vajadzībām

## React Compiler

Šajā veidnē React Compiler nav ieslēgts tā ietekmes dēļ uz dev un build veiktspēju. Lai to pievienotu, skatīt [šo dokumentāciju](https://react.dev/learn/react-compiler/installation).

## ESLint konfigurācijas paplašināšana

Ja izstrādājat produkcijas lietotni, iesakām lietot TypeScript ar type-aware lint noteikumiem. Apskatiet [TS veidni](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts), lai uzzinātu, kā integrēt TypeScript un [`typescript-eslint`](https://typescript-eslint.io) savā projektā.

## Palaidums

```bash
npm install
npm run dev
```

Lietotne būs pieejama pie `http://localhost:5173`. Backend (Django) jāpalaiž atsevišķi no `backend/` mapes.
