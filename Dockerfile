FROM openjdk:21
WORKDIR /app
COPY ./target/scheduler-0.0.1-SNAPSHOT.jar /app
EXPOSE 3001
ENTRYPOINT [ "java", "-jar", "scheduler-0.0.1-SNAPSHOT.jar" ]
