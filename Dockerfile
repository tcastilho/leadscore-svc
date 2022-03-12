FROM node:14.18.0 AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm i @nestjs/cli && npm i --only=production
COPY . .
RUN npm run build


FROM node:14.18.0 AS app
WORKDIR /app
ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PORT="3000"
COPY --from=builder /app ./
EXPOSE 3000
RUN ["chmod", "+x", "start.sh"]
CMD ["sh", "start.sh"]
