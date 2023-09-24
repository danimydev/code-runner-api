# code-runner-api

A deno api for running code in different programming languages.


## Requirements

- [deno](https://deno.land/)
- [docker-desktop](https://www.docker.com/products/docker-desktop/)


## Supported Languages

- [typescript](https://www.typescriptlang.org/)
- [python](https://www.python.org/)


## Run Locally

Clone the project

```bash
  git clone https://github.com/thieves-guild/code-runner-api.git
```

Go to the project directory

```bash
  cd code-runner-api
```

Start the server

```bash
  # locally production
  deno task start
```

```bash
  # locally development
  deno task dev
```

```bash
  # container
  docker-compose up --build
```

## API Reference

#### Health check
```http
GET /health

HTTP/1.1 200 OK
```

#### Get all supported languages

```http
GET /languages

HTTP/1.1 200 OK
Content-Type: application/json

{
  "languages": [
    {
      "name": "typescript",
      "info": {
        "enviromentCommand": "--version",
        "executionCommand": "deno",
        "executionArgs": [
          "run"
        ],
        "extension": "ts",
        "websiteUrl": "https://www.typescriptlang.org/"
      },
      "enviroment": [
        "deno 1.37.0 (release, x86_64-unknown-linux-gnu)",
        "v8 11.8.172.3",
        "typescript 5.2.2"
      ]
    },
    {
      "name": "python3",
      "info": {
        "enviromentCommand": "--version",
        "executionCommand": "python3",
        "executionArgs": [],
        "extension": "py",
        "websiteUrl": "https://www.python.org/"
      },
      "enviroment": [
        "Python 3.10.13"
      ]
    }
  ],
  "timeStampt": 1695563685183
}
```

#### Get supported languages by name (unique)

```http
GET /languages/:languageName

HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "python3",
  "info": {
    "enviromentCommand": "--version",
    "executionCommand": "python3",
    "executionArgs": [],
    "extension": "py",
    "websiteUrl": "https://www.python.org/"
  },
  "enviroment": [
    "Python 3.10.13"
  ],
  "timeStampt": 1695563724530
}
```

#### Run code

```http
POST /code
Content-Type: application/json

{
  "language": "typescript",
  "code": "console.log('hello world');"
}

HTTP/1.1 201 OK
Content-Type: application/json

{
  "languague": "typescript",
  "code": 0,
  "stdout": "hello world\n",
  "stderr": "",
  "timeStampt": 1695563805981
}
```
