ARG BASE_IMAGE=node:20-alpine
FROM ${BASE_IMAGE} AS base
WORKDIR /app

FROM base AS build
COPY package.json package-lock.json* ./
RUN npm ci
COPY tsconfig.json ./
COPY src/ src/
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && rm -rf /root/.npm
COPY --from=build /app/dist dist/
USER appuser
EXPOSE 3000
CMD ["node", "dist/index.js"]
