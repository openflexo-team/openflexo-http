# Uses a Java 8 ready alpine
FROM openjdk:8-jre-alpine

# Resource center volume
VOLUME /rc

# Define working directory.
WORKDIR /openflexo

ADD webroot webroot
ADD libs libs
ADD start.sh .

RUN \
    chmod +x start.sh

EXPOSE 8080

ENTRYPOINT ["./start.sh"]

CMD ["/bin/sh"]
