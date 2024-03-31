# Tell docker to use node 20 for the base image.
FROM node:20

# Create a working dir for the project to sit in.
WORKDIR /app

# Copy both package.json and package-lock.json and put them in the base dir
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything inside the container.
COPY . .

# Make the default port (5173) available to docker.
EXPOSE 5173

# Commands the docker file should run.
CMD ["npm", "run", "dev", "--open"]