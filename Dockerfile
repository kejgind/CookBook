# --- build stage ---
FROM node:14-alpine AS build
WORKDIR /app

# Kopiujemy dependency files
COPY package*.json ./

# Instalacja zależności
RUN npm ci --legacy-peer-deps

# Kopiujemy resztę projektu
COPY . .

# Build statycznej aplikacji
RUN npm run build

# --- runtime stage ---
FROM nginx:1.25-alpine

# Konfiguracja Nginx dla SPA (fallback na index.html)
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
    try_files $uri $uri/ /index.html;\n\
    }\n\
    error_page 500 502 503 504 /50x.html;\n\
    location = /50x.html { root /usr/share/nginx/html; }\n\
    }\n' > /etc/nginx/conf.d/default.conf

# Kopiujemy wynik buildu do nginx
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Eksponujemy port
EXPOSE 80
