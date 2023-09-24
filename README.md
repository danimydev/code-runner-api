
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
```

#### Get all supported languages

```http
  GET /languages
```

#### Get supported languages by name (unique)

```http
  GET /languages/:languageName
```

#### Run code

```http
  POST /code
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `code`      | `string` | **Required**. Code to be executed |
| `language`      | `string` | **Required**. Supported language name |
