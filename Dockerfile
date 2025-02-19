FROM mcr.microsoft.com/playwright:focal

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build TypeScript if needed (or run via ts-node)
RUN npx playwright install --with-deps

# Expose port for any web server if needed (optional)
EXPOSE 3000

# Default command to run tests and generate Allure report
CMD [ "npx", "playwright", "test", "--reporter=allure-playwright" ]
