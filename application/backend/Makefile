install:
	# Install commands
	pip3 install --upgrade pip && \
	pip3 install -r requirements.txt

format:
	# Format the source code
	black *.py lib/*.py

lint:
	# Lint the source code
	pylint --disable=R,C *.py lib/*.py

docker: 
	# Build the container
	docker build -t demo-backend .

run:
	# Start the script
	python3 main.py

all: install format docker