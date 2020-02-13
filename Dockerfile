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

# Setup workdir
################################################################################

WORKDIR /opt/emcasa
COPY ./build /opt/emcasa

# Server variables
################################################################################

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

ARG SSR
ENV SSR=$SSR

ARG API_URL
ENV API_URL=$API_URL

ARG APOLLO_ENGINE_URL
ENV APOLLO_ENGINE_URL=$APOLLO_ENGINE_URL

EXPOSE 3000/tcp

ENTRYPOINT ["node"]
CMD ["server.js"]
