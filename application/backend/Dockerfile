# Python 3.11.3 container
FROM python:3.11.3-bullseye

LABEL version="1.0"
LABEL description="Container to run the application"

# Set the working directory
WORKDIR /usr/src/app

# Copy the python script to the container
COPY lib/ ./lib
COPY main.py .
COPY requirements.txt .
COPY Makefile .

# Environment variables
ENV MYSQL_DATABASE_HOST = localhost
ENV MYSQL_DATABASE_PORT	= 3306
ENV MYSQL_DATABASE_USER	= root
ENV MYSQL_DATABASE_PASSWORD	= password
ENV MYSQL_DATABASE_DB = demo

# Install the python script dependencies
RUN make install

# Run the python script
ENTRYPOINT [ "make", "run" ]

# Expose the port
EXPOSE 10000