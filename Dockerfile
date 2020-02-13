FROM node:12.10
ARG BUILD_DATE
ARG VCS_REF
LABEL maintainer="EmCasa <dev@emcasa.com>" \
      org.opencontainers.image.title="react starter for EmCasa." \
      org.opencontainers.image.description="boilerplate service for EmCasa." \
      org.opencontainers.image.authors="EmCasa <dev@emcasa.com>" \
      org.opencontainers.image.license="MIT" \
      org.opencontainers.image.source="https://github.com/emcasa/react-starter" \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.created=$BUILD_DATE

ARG BUILD_APOLLO_ENGINE
ENV APOLLO_ENGINE_URL=$BUILD_APOLLO_ENGINE

ARG BUILD_API_URL
ENV API_URL=$BUILD_API_URL

ARG BUILD_NODE_ENV
ENV NODE_ENV=$BUILD_NODE_ENV

ARG BUILD_SSR_ENABLED
ENV SSR=$BUILD_SSR_ENABLED

# app set workdir

WORKDIR /opt/emcasa/frontend
COPY ./build /opt/emcasa/frontend

ENTRYPOINT ["node"]
CMD ["server.js"]
