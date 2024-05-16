FROM openjdk:21
WORKDIR /app
COPY ./target/scheduler-info-0.0.1-SNAPSHOT.jar /app
EXPOSE 3001
ENTRYPOINT [ "java", "-jar", "scheduler-info-0.0.1-SNAPSHOT.jar" ]
