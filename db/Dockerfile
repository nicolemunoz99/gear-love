FROM postgres:12.1

COPY ./setup_db.sql /docker-entrypoint-initdb.d/setup_db.sql

EXPOSE 5432

ENV PGDATA=/data