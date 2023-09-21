FROM denoland/deno:alpine

# Install depencies
RUN apk update

# Python3
RUN apk add python3

# Switch work dir
WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
ADD . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache ./src/index.ts

# The port that your application listens to.
EXPOSE 3000

CMD ["deno", "run", "--allow-net", "--allow-run", "--allow-read", "--allow-write", "./src/index.ts"]
