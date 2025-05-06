FROM node:18
RUN apt-get update && apt-get install -y \
    libasound2-dev \
    libx11-xcb1 \
    libnss3 \
    libxss1 \
    libappindicator3-1 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    fonts-liberation \
    xdg-utils \
    wget \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production
RUN npm install -g http-server
CMD ["http-server", "dist/frontend", "-p", "8080"]
EXPOSE 8080




