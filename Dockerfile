# Використовуємо базовий образ для Node.js
FROM node:14 as build-stage

# Встановлюємо робочу директорію у контейнері
WORKDIR /app

# Копіюємо файли залежностей для додатку
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь проект у контейнер
COPY . .

# Збираємо проект для продакшнього режиму
RUN npm run build

# Використовуємо легший образ для Nginx для запуску додатку у продакшній середовищі
FROM nginx:alpine

# Копіюємо зібраний додаток з попереднього етапу у Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Копіюємо файли конфігурації Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# Команда, яка запускає Nginx при старті контейнера
CMD ["nginx", "-g", "daemon off;"]