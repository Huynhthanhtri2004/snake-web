# Dùng Nginx để serve web tĩnh
FROM nginx:alpine

# Copy toàn bộ file web vào thư mục public của Nginx
COPY . /usr/share/nginx/html

# Mở port 80
EXPOSE 80

# Chạy nginx
CMD ["nginx", "-g", "daemon off;"]
