# Application FAQ

> React, at its core, is a library (not a framework) that helps you build the user interface.
#### Commands:

- `yarn run dev` - Start in development mode
- `yarn run prettier:format` - Format code according to general rules (Prettier)
- `yarn run lint` — Run linter (ESLint)
- `yarn build` — Build application for production
- `yarn run preview` — Open application in production mode


#### Startup
1. Clone application:
   ```shell
   git clone ___REPO___
   ```
2. Go to application folder:
   ```shell
   cd ___REPO___
   ```
3. Install dependencies yarn:
   ```shell
   yarn install
   ```
4. Set up environment variables
   - For development:
   ```shell
   cp ./env/.env.example ./env/.env.development.local
   ```
   - For production:
   ```shell
   cp ./env/.env.example ./env/.env.production.local
   ```
5. Start application in dev mode:
   ```shell
   yarn dev
   ```
6. Build in production:
   ```shell
   yarn build
   ```
6. Open website in your browser via http://localhost:3000 link.
