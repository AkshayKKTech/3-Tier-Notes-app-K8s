# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false
COPY public ./public
COPY src ./src
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy main nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy server block config
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Create non-root user and permissions
RUN addgroup -g 1001 -S appgroup && \
    adduser -S -u 1001 -G appgroup appuser && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx

USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]