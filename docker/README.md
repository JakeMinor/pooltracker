# Docker

In this folder there are two docker files, one to create a container for Pocketbase and another to create a container for the UI.

In order to create these containers, you will need to run the following command:

```
   docker build -f db.Dockerfile -t pocketbase .
```

This is how the command above translates:
- `docker build`: Tells docker to build an image.
- `-f db.Dockerfile`: Tells docker which file to use to build the image.
- `-t pocketbase`: Tells docker what to tag the image with. (This gives the image a human readable name)
- `.`: Tells docker what directory to look in. (This example was ran in the `.\pooltracker\docker` folder)

Once you have built both images, you are then able to run the containers using docker desktop or the [docker run](https://docs.docker.com/reference/cli/docker/container/run/) command.