FROM mhart/alpine-node:10.15 as base


# create a bootstrapped environment
FROM base as environment

RUN apk --no-cache add make


# create a distributable package
FROM environment as builder

WORKDIR /url-shortener

COPY Makefile Makefile
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY .babelrc .babelrc

RUN make bootstrap-dev

COPY src src

RUN make build


# install app
FROM environment

WORKDIR /url-shortener

COPY Makefile Makefile
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN make bootstrap-prod

COPY --from=builder /url-shortener/dist dist
COPY config config
COPY logs logs
COPY public public

EXPOSE $PORT

ENTRYPOINT [ "npm", "run", "server:prod" ]
