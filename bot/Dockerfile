# === Stage 1: Build TypeScript ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only necessary files first for better caching
COPY package.json package-lock.json ./
RUN npm install

# Then copy the rest of the project files
COPY . .

# Build TypeScript into dist/
RUN npm run build


# === Stage 2: Run the compiled JS ===
FROM node:20-alpine

WORKDIR /app

# Copy compiled JS output and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Start the app
CMD ["node", "dist/index.js"]
