# FP's semi-sweet template

## What is it
A quick way for me to have a new testbed or application with all the bells I want right now:
- TypeScript
- React
- Redux (w/ Toolkit)
- React-Router
- React CSS Modules with styleName support
- Jest with enzyme and testing-library
- Feature flag support
- Node v12 express backend
- Webpack multi-bundle, babel configured

It's annoying to constantly rebuild a base sometimes, even just to see `Hello world`. I'm going through a lot of projects, so I made this copy-pasta base that I can easily update.

## How to Use

1. Download master

2. delete `./.git` and `./package-lock.json`

3. Update package.json
    - name
    - version: if it's not `0.0.1`, make it whatever initial semver you want it to be
    - description
    - author: if it's not fp, else I'll own it 😏

4. create a `./.env` file

```
# short string, [a-z0-9_-]{8}
REPO_SHORT_NAME=template

# env names are local, development, and production.
ENV_NAME=local

# only development and production. development === local for NODE_ENV
NODE_ENV=development

# Port the backend node server will serve on. Will be the port acessed via browser.
PORT=3000

# Port webpack will serve assets from
PORT_ASSETS=3333

# The base assets url with port.
# If you want to use a custom domain, here is where you'd do it.
ASSETS_CDN_URL=http://localhost:3333/

# Flags to use in node and react src code. Accessible via included hook.
FLAGS=[test-flag-1, testflag2, test_flag_3]
```

5. With the above done, run `npm install` to generate a new `package-lock`

6. `$ docker-compose build`

7. `$ docker-compose up`

8. Go to `http://localhost:{PORT}/` and verify you see the app config as expected.

9. In a new terminal, `docker-compose exec bff bash`
 
10. Verify typings and lint with `npm run lint`

11.  Verify tests with `npm test`

12. If all looks good, start building or `git init` to start a new git repo and push it up.

## Support
None offered. If it becomes outdated or broken, google is your best friend here.
