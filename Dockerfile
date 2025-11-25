# Stage 1: Build Angular App
FROM node:lts-alpine as build

WORKDIR /app

# Copy package.json và package-lock.json trước để tận dụng cache layer của Docker
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build ứng dụng Angular cho môi trường production
RUN npm run build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy file build từ Stage 1 vào thư mục phục vụ của Nginx
# Lưu ý: Đường dẫn /app/dist/scoutli-frontend có thể thay đổi tùy tên project trong angular.json
# Tôi giả định tên project là 'frontend' dựa trên cấu trúc thư mục .angular/cache/21.0.0/frontend
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy file cấu hình nginx tùy chỉnh (nếu cần, để handle routing SPA)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
