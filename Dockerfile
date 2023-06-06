# Use the official Python base image with version 3.9.13
FROM python:3.9.13

# Set the working directory inside the container
WORKDIR /app

# Copy the Python script and all files in the current directory to the container
COPY . /app

# Expose port 8080
EXPOSE 8080

# Run the Python script when the container starts
CMD [ "python", "webserver.py" ]
