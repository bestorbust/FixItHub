FROM node:18

# Install system dependencies for headless Chrome
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

# Set working directory
WORKDIR /app

# Copy and install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build app
RUN npm run build -- --configuration=production

# Serve built app (use http-server or angular universal if SSR)
RUN npm install -g http-server
CMD ["http-server", "dist/frontend", "-p", "8080"]

EXPOSE 8080
