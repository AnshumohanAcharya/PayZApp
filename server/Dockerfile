# Dockerfile

# Use the official Bun image
# See all versions at <https://hub.docker.com/r/oven/bun/tags>
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies into a temporary folder
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp folder
# Then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
# ENV NODE_ENV=production
# RUN bun test
# RUN bun run build

# Copy production dependencies and source code into the final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app .

# Run the app
USER bun
EXPOSE 8000
CMD ["bun", "run", "dev"]
