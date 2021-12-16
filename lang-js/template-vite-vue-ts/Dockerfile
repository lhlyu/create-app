FROM nginx:latest

# router history 模式 时需要的文件
COPY ./default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html/

COPY dist/ .

EXPOSE 80