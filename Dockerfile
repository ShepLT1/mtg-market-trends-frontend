# main/frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy source code and build
COPY frontend/ ./
COPY frontend/.env ./
RUN npm run build

# Serve using lightweight nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
