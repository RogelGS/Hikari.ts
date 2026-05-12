FROM oven/bun:latest
WORKDIR /app
COPY package.json tsconfig.json ./
RUN bun install
COPY src/ ./src
CMD ["bun", "run", "src/index.ts"]
