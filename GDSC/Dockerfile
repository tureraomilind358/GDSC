# ============================
# 1. Build Stage
# ============================
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (for better caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of the project and build
COPY src ./src
RUN mvn clean package -DskipTests

# ============================
# 2. Runtime Stage
# ============================
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port Render provides (default 8080, overridden by $PORT)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]
