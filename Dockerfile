# Stage 1 Build Project
FROM node:20 AS build

WORKDIR /app
COPY . .
COPY .env.production .env
RUN yarn install
RUN yarn build

# Stage 2 Serve With Nginx
FROM nginx:alpine

# This line will copy the nginx configuration to the desired path
COPY nginx.conf /etc/nginx/conf.d/default.conf

# This line will copy the final build of project to nginx path
COPY --from=build /app/build /usr/share/nginx/html

# This line will copy our https certifications
COPY certs/tls.crt /etc/nginx/certs/tls.crt
COPY certs/tls.key /etc/nginx/certs/tls.key

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
