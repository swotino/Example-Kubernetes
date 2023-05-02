FROM mysql:8.0.33

LABEL version="1.0"
LABEL description="Container to run the database"

# Initialize Database
COPY database.sql /docker-entrypoint-initdb.d/

# Environment variables
ENV MYSQL_ROOT_PASSWORD=password

# Expose the port
EXPOSE 3306