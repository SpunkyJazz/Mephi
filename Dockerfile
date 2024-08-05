FROM nginx:alpine
COPY build /usr/share/nginx/html
COPY configs/nginx /etc/nginx
