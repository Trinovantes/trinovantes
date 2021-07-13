# -----------------------------------------------------------------------------
FROM ghcr.io/trinovantes/puppeteer-prerender-plugin as builder
# -----------------------------------------------------------------------------

WORKDIR /app

# Install dependencies
COPY tsconfig.json              ./
COPY yarn.lock package.json     ./
RUN yarn install

# Build app
COPY build/                     ./build/
COPY src/                       ./src/
RUN --mount=type=secret,id=GIT_HASH \
    --mount=type=secret,id=GITHUB_PAT \
    yarn buildWeb

# -----------------------------------------------------------------------------
FROM nginx:alpine
LABEL org.opencontainers.image.source https://github.com/Trinovantes/template-spa-typescript-vue
# -----------------------------------------------------------------------------

WORKDIR /app

COPY ./docker/web.conf          /etc/nginx/conf.d/default.conf
COPY ./docker/general.conf      /app/general.conf
COPY --from=builder /app/dist   /app/dist

RUN nginx -t
