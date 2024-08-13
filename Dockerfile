# Sử dụng Node.js làm base image
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /Client/Client

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Chạy ứng dụng trong chế độ production
CMD ["npm", "run", "start"]
