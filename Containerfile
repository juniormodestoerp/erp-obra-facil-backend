# Environment Build
ARG BUILD_ENV
ARG NODE_ENV

# --------------> The build image
FROM node:lts-alpine@sha256:7a91aa397f2e2dfbfcdad2e2d72599f374e0b0172be1d86eeb73f1d33f36a4b2 AS build

ENV USER_UID=1000
ENV USER_NAME=node
ENV HOME=/home/${USER_NAME}
ENV APP_HOME=/usr/src/app
ENV BUILD_ENV=${BUILD_ENV}

WORKDIR ${APP_HOME}
RUN apk add --no-cache g++ make curl python3 dumb-init

COPY --chown=${USER_UID}:${USER_UID} package*.json ./
RUN npm ci && npm cache clean --force && \
    rm -rf .npmrc /tmp/* /var/tmp/*
COPY --chown=${USER_UID}:${USER_UID} . .
RUN npm run build

# Development Stage
FROM build AS development
ENV NODE_ENV=development
ENV BUILD_ENV=${BUILD_ENV}
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD npm run start:$BUILD_ENV

# Test Stage
FROM build AS test
ENV NODE_ENV=test
ENV BUILD_ENV=${BUILD_ENV}
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD npm run start:$BUILD_ENV

# Production Stage
FROM node:lts-alpine@sha256:7a91aa397f2e2dfbfcdad2e2d72599f374e0b0172be1d86eeb73f1d33f36a4b2 AS production

ENV USER_UID=1000
ENV USER_NAME=node
ENV HOME=/home/${USER_NAME}
ENV APP_HOME=/usr/src/app
ENV NODE_ENV=production
ENV BUILD_ENV=${BUILD_ENV}

WORKDIR ${APP_HOME}

COPY --chown=${USER_UID}:${USER_UID} --from=build /usr/src/app/.env ./
COPY --chown=${USER_UID}:${USER_UID} --from=build /usr/src/app/.nvmrc ./
COPY --chown=${USER_UID}:${USER_UID} --from=build /usr/src/app/.npmrc ./

COPY --chown=${USER_UID}:${USER_UID} --from=build /usr/src/app/dist ./dist
COPY --chown=${USER_UID}:${USER_UID} --from=build /usr/src/app/tools ./tools
COPY --chown=${USER_UID}:${USER_UID} --from=build /usr/src/app/prisma ./prisma
COPY --chown=${USER_UID}:${USER_UID} --from=build /usr/src/app/package*.json ./
COPY --chown=${USER_UID}:${USER_UID} --from=build /usr/src/app/node_modules ./node_modules

RUN apk add --no-cache g++ make curl python3 dumb-init && \
    npm cache clean --force && npm prune --force --omit=dev && \
    rm -rf /tmp/* /var/tmp/*

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD npm run start:$BUILD_ENV

# --------------> The runtime image
FROM ${NODE_ENV} AS runtime
LABEL maintainer="Bruno Vilefort <bruno.clara@yahoo.com>"
EXPOSE 8080 8443
RUN chown -R ${USER_UID}:${USER_UID} ${HOME} ${APP_HOME} && \
    chmod -R 755 ${HOME} ${APP_HOME}
USER ${USER_UID}