FROM node:18-alpine AS build
WORKDIR /app/ui
COPY package.json ./
COPY package-lock.json ./

RUN yarn install

COPY . .

# Build the React app (Parcel build command)
RUN yarn build

RUN ls -la /app

FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's html directory
COPY --from=build /app/ui/build /usr/share/nginx/html

# Expose port 80 (default for web servers)
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
