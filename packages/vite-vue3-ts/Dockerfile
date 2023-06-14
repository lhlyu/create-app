FROM nginx:latest

COPY ./default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html/

COPY dist/ .

EXPOSE 80