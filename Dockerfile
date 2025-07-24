# Use a base image with Java 17 (adjust if your JDK version is different)
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from your target/build/libs directory
# Assuming you've already run 'mvn clean install' or './gradlew clean build'
# For Maven:
COPY target/task-manager-0.0.1-SNAPSHOT.jar app.jar
# For Gradle:
# COPY build/libs/task-manager-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot application runs on (default is 8080)
EXPOSE 8080

# Command to run the application when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]

