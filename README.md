# Task Manager API

This is a simple RESTful API for managing tasks, built with Spring Boot. It provides endpoints for creating, retrieving, updating, changing status, and deleting tasks. The application uses an H2 database for persistence.

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
    * [Cloning the Repository](#cloning-the-repository)
    * [Project Structure](#project-structure)
    * [Configuration](#configuration)
* [Building the Application](#building-the-application)
* [Running the Application](#running-the-application)
    * [From IntelliJ IDEA](#from-intellij-idea)
    * [From Command Line](#from-command-line)
* [API Endpoints](#api-endpoints)
* [Testing](#testing)
* [H2 Database Console](#h2-database-console)

## Features

* **Task Management:**
    * Create new tasks.
    * Fetch all tasks or a single task by ID.
    * Update existing task details (title, description, status).
    * Change only the status of a task.
    * Delete tasks.
* **Data Model:** Tasks have a UUID, title, optional description, and status (TODO, IN_PROGRESS, DONE).
* **Persistence:** Uses an embedded H2 database for data storage.
* **Input Validation:** Ensures task titles are not blank and statuses are valid.
* **Proper HTTP Status Codes:** Returns appropriate status codes for API operations (e.g., 201 Created, 200 OK, 400 Bad Request, 404 Not Found, 204 No Content).
* **Global Exception Handling:** Centralized handling of validation errors and `TaskNotFoundException`.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Java Development Kit (JDK) 17 or higher:**
    * [Download JDK](https://www.oracle.com/java/technologies/downloads/)
* **Apache Maven 3.6+ or Gradle 7.x+:**
    * [Download Maven](https://maven.apache.org/download.cgi)
    * [Download Gradle](https://gradle.org/install/)
* **Git:**
    * [Download Git](https://git-scm.com/downloads)
* **An IDE (Integrated Development Environment):**
    * [IntelliJ IDEA Ultimate (recommended for Spring Boot)](https://www.jetbrains.com/idea/download/)
    * [Visual Studio Code with Java extensions](https://code.visualstudio.com/docs/java/java-tutorial)
* **API Testing Tool (Optional but Recommended):**
    * [Postman](https://www.postman.com/downloads/)
    * `curl` (built-in on most systems)

## Getting Started

### Cloning the Repository

To get a copy of the project, clone the repository to your local machine:

```bash
git clone https://github.com/aqualicy/task-manager.git # Replace with your actual repo URL
cd task-manager # Navigate into the project directory
```

### Project Structure

The key components of the application are organized into packages:

```
src/main/java/org/challenge/taskmanager
├── TaskManagerApplication.java  (Main Spring Boot application class)
├── controller                   (REST API endpoints)
│   └── TaskController.java
├── dto                          (Data Transfer Objects for requests)
│   └── UpdateStatusRequest.java
├── exception                    (Custom exceptions and global exception handler)
│   ├── GlobalExceptionHandler.java
│   └── TaskNotFoundException.java
├── model                        (Domain objects and enums)
│   ├── Task.java
│   └── TaskStatus.java
├── repository                   (Spring Data JPA repository for database interaction)
│   └── TaskRepository.java
└── service                      (Business logic layer)
    └── TaskService.java
```

### Configuration

The application uses an H2 file-based database for persistence. The configuration is located in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:h2:file:./data/taskdb;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update # Automatically creates/updates schema for development
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

* **`jdbc:h2:file:./data/taskdb`**: This specifies a file-based H2 database that will store its data in a `data` directory within your project. This data will persist across application restarts.
* **`spring.h2.console.enabled=true`**: Enables the H2 web console, accessible at `http://localhost:8080/h2-console`.

## Building the Application

### Using Maven:

Navigate to the project's root directory in your terminal and run:

```bash
mvn clean install
```

This command compiles the source code, runs tests, and packages the application into a JAR file in the `target/` directory.

### Using Gradle:

Navigate to the project's root directory in your terminal and run:

```bash
./gradlew clean build
```

This command performs similar actions for Gradle projects.

## Running the Application

### From IntelliJ IDEA:

1.  Open the project in IntelliJ IDEA.
2.  Navigate to `src/main/java/org/challenge/taskmanager/TaskManagerApplication.java`.
3.  Right-click on the `main` method or the class name and select `Run 'TaskManagerApplication.main()'`.
4.  The application will start, and you'll see logs in the IntelliJ console.

### From Command Line:

After building the application (using `mvn clean install` or `./gradlew clean build`), a JAR file will be created in the `target/` (Maven) or `build/libs/` (Gradle) directory.

Navigate to the project's root directory in your terminal and run:

```bash
# For Maven
java -jar target/taskmanager-0.0.1-SNAPSHOT.jar # Adjust version if different

# For Gradle
java -jar build/libs/taskmanager-0.0.1-SNAPSHOT.jar # Adjust version if different
```

The application will start, typically on port `8080`.

## API Endpoints

Once the application is running, you can interact with the API using a tool like Postman, Insomnia, or `curl`. All endpoints are prefixed with `/api/tasks`.

### 1. Create a New Task

* **URL:** `http://localhost:8080/api/tasks`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body (JSON):**
    ```json
    {
        "title": "Create Task",
        "description": "Testing a task creation.",
        "status": "TODO"
    }
    ```
* **Success Response:** `201 Created` with the created Task object.
* **Error Response:** `400 Bad Request` if `title` is blank or `status` is invalid.

### 2. Fetch All Tasks

* **URL:** `http://localhost:8080/api/tasks`
* **Method:** `GET`
* **Success Response:** `200 OK` with a JSON array of all tasks.

### 3. Fetch Task by ID

* **URL:** `http://localhost:8080/api/tasks/{uuid}` (e.g., `http://localhost:8080/api/tasks/a1b2c3d4-e5f6-7890-1234-567890abcdef`)
* **Method:** `GET`
* **Success Response:** `200 OK` with the Task object.
* **Error Response:** `404 Not Found` if the task with the given UUID does not exist.

### 4. Update a Task

* **URL:** `http://localhost:8080/api/tasks/{uuid}`
* **Method:** `PUT`
* **Headers:** `Content-Type: application/json`
* **Body (JSON):**
    ```json
    {
        "id": "{uuid-of-task-to-update}",
        "title": "Task title updated",
        "description": "Testing task update.",
        "status": "IN_PROGRESS"
    }
    ```
  *Note: The `id` in the body should match the `uuid` in the URL path.*
* **Success Response:** `200 OK` with the updated Task object.
* **Error Response:** `400 Bad Request` (e.g., invalid status) or `404 Not Found` (if task ID doesn't exist).

### 5. Change Task Status

* **URL:** `http://localhost:8080/api/tasks/{uuid}/status`
* **Method:** `PATCH`
* **Headers:** `Content-Type: application/json`
* **Body (JSON):**
    ```json
    {
        "status": "DONE"
    }
    ```
* **Success Response:** `200 OK` with the Task object showing the new status.
* **Error Response:** `400 Bad Request` (if `status` is invalid) or `404 Not Found` (if task ID doesn't exist).

### 6. Delete a Task

* **URL:** `http://localhost:8080/api/tasks/{uuid}`
* **Method:** `DELETE`
* **Success Response:** `204 No Content` (indicating successful deletion with no response body).
* **Error Response:** `404 Not Found` if the task with the given UUID does not exist.

## Testing

Unit tests for the service layer are located in `src/test/java/org/challenge/taskmanager/service/TaskServiceTest.java`.

To run all tests:

### Using Maven:

```bash
mvn test
```

### Using Gradle:

```bash
./gradlew test
```

### From IntelliJ IDEA:

Right-click on the `TaskServiceTest.java` file in the Project tool window and select `Run 'TaskServiceTest'`.

## H2 Database Console

You can access the H2 database console to inspect the database and its data directly:

1.  Ensure the Spring Boot application is running.
2.  Open your web browser and navigate to: `http://localhost:8080/h2-console`
3.  Enter the following credentials:
    * **JDBC URL:** `jdbc:h2:file:./data/taskdb`
    * **User Name:** `sa`
    * **Password:** `password`
4.  Click `Connect`.

You can now browse the `TASK` table and execute SQL queries.

## Running with Docker Compose

Docker Compose allows you to build, run, and manage both your backend and frontend services together with a single command.

1.  **Build Frontend Assets:**
    Navigate to your `ui/` directory in the terminal and run:
    ```bash
    yarn build
    ```
    This compiles your React application into static files.

2.  **Build Backend JAR:**
    Navigate to the **main project directory** (the parent of `ui/`) in the terminal and run:
    ```bash
    mvn clean install
    # OR for Gradle:
    # ./gradlew clean build
    ```
    This packages your Spring Boot application into an executable JAR.

3.  **Run Docker Compose:**
    Navigate back to the **main project directory** (where `docker-compose.yml` is located) and run:
    ```bash
    docker compose up --build
    ```
  * `docker compose up`: Starts the services defined in `docker-compose.yml`.
  * `--build`: Ensures Docker Compose builds (or rebuilds) the images if they don't exist or if their source code has changed.

    This command will:
  * Build the `backend` image using the `Dockerfile` in the current directory.
  * Build the `frontend` image using the `Dockerfile` in the `ui/` directory.
  * Start both containers.

### Accessing the Applications:

* **Frontend UI:** Open your browser to `http://localhost:3000`
* **Backend API:** The API is running inside the container on port 8080. You can access it from your host at `http://localhost:8080`.
* **H2 Console:** `http://localhost:8080/h2-console` (remember to use `jdbc:h2:file:/app/data/taskdb` as the JDBC URL in the console, as that's the path *inside the container's volume*).

### Stopping and Cleaning Up:

To stop the containers and remove them (but keep the volumes/data if mapped):
```bash
docker compose down
```
To stop and remove containers AND volumes (which means H2 data will be lost):
```bash
docker compose down -v
```