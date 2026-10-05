FROM mysql:8.0

LABEL maintainer="Abishek"

ENV MYSQL_ROOT_PASSWORD=root \
    MYSQL_DATABASE=student_management

VOLUME ["/var/lib/mysql"] 

COPY ./mysql /docker-entrypoint-initdb.d/

EXPOSE 3306

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD mysqladmin ping -h localhost -u root -p$MYSQL_ROOT_PASSWORD || exit 1
