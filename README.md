# Pokemon API

A NestJS-based project that demonstrates a simple API for retrieving Pokemon information using the Clean Architecture principles.

## Table of Contents

- [Project Structure](#project-structure)
- [Clean Architecture](#clean-architecture)
- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
- [API Usage](#api-usage)
- [Swagger UI](#swagger-ui)
- [Testing](#testing)


## Project Structure

```bash
src/
├── domain/
│   ├── pokemon/
│   │   ├── pokemon.entity.ts
│   │   ├── pokemon.interface.ts
├── application/
│   ├── pokemon/
│   │   ├── pokemon.service.ts
│   │   └── pokemon.service.spec.ts
├── infra/
│   ├── redis/
│   │   ├── redis.module.ts
│   │   └── redis.service.ts
├── presentation/
│   ├── pokemon/
│   │   ├── pokemon.controller.ts
│   │   ├── pokemon.controller.spec.ts
│   │   ├── get-pokemon.dto.ts
│   │   ├── get-pokemon.dto.ts
│   │   └── pokemon.schema.ts
│   ├── middleware/
│   │   └── response-format.middleware.ts
│   ├── types/
│   │   └── express.d.ts
│   ├── app.module.ts
│   └── custom-response.interface.ts
├── main.ts
└── openapi.yml

```
## Clean Architecture

The project follows the Clean Architecture principles, which promote the separation of concerns into distinct layers:

- **Domain**: Contains the core business logic and entities, such as Pokemon. This layer is independent of any specific technology or framework.
- **Application**: Holds the services that handle the use cases, which communicate with the domain and infra layers. This layer also defines the interfaces required by the use cases.
- **Infra**: Encapsulates the details of external services, databases, and frameworks. In this project, it includes the Redis module and service.
- **Presentation**: Manages the interaction with users or external systems. It includes the controllers, DTOs, and middleware responsible for handling HTTP requests and responses.


## Prerequisites

Before running the application, make sure you have Docker installed.

## Running the Application
Clone the repository:
```bash
git clone https://github.com/kimpoytoledo/pokemon-api
cd yourrepository
```

### .env file
Use the `.env-example` file as a reference for creating your own `.env` file. Copy the content of the `.env-example` file into a new `.env` file in the root of the project and update the values if necessary:

```bash
REDIS_HOST=redis
REDIS_PORT=6379
CACHE_TTL=3 //seconds
```

### Using Docker

To run the application using Docker and Docker Compose, follow these steps:

1. Make sure you have Docker and Docker Compose installed.
2. Update the `.env` file with the desired values.
3. Run the following command in the project root:
```bash
docker-compose up
```

The application will be available at `http://localhost:3000`.


## API Usage

### Get Pokemon by Name

GET `/pokemon/:name`

Fetches the information of a Pokemon by its name.

**Path Parameters:**

- `name` (string): The name of the Pokemon.

**Example Request:**

```bash
GET /pokemon/pikachu
```

**Example Response:**

```json
{
    "success": true,
    "data": {
        "pokemon": {
            "id": 889,
            "name": "zamazenta",
            "height": 29,
            "weight": 2100
        },
        "source": "API"
    }
}
```
## Swagger UI

The application is configured to use the Swagger UI for interactive API documentation and testing. Once the application is running, you can access the Swagger UI by visiting the following URL:

```bash
http://localhost:3000/api-docs
```

In the Swagger UI, you can view the available endpoints, their descriptions, request parameters, and response types. You can also test the API by sending requests directly from the Swagger UI.

## Testing

To run the tests within the Docker container, first, ensure that the application is running using `docker-compose up`. Then, execute the following command to access the Docker container:
```bash
docker exec -it your_container_id /bin/sh
```

Replace `your_container_id` with the actual container ID of your running Node.js application. You can find the container ID by running `docker ps`.

Once you are inside the container, run the tests using the following command:
```bash
npm run test
```

This will run the tests using Jest, and the test results will be displayed in the console.
