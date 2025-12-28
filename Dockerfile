FROM node:20-alpine AS builder
WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
COPY frontend/.env ./
RUN npm run build

FROM nginx:alpine

# Replace default config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

