### vendmw
This is a dockerised node Typescript project with configured ci-cd pipeline deployed on heroku in a container.
This app is about episodes and commenting on an episode of a series.

## Application hosted url

This server-side app is hosted on heroku. Click here to go there (https://vendmw.herokuapp.com/) and confirm it works.
All APIs created are documented on Postman. Click this link to (https://documenter.getpostman.com/view/10333949/UyxkjQym) view documentation.

### Running App locally

This app is written with Nodejs; Enter the folloeing commands to start app locally
## Setup env for the Project

Create a .env file containing the keys in the env.example file with your own configs; use the cmd to create the env from your root dir

```
mkdir .env
```

## Project setup

```
npm run dev
```

### Open browser and visit or Open Postman to make a request

(http://localhost:5000)

## Running as Docker Container

**From within the project directory run the following:**

```
npm run docker:bash
```

to build image and container for app

when this is done, app will basically start on port `5000`.

### Viewing the running ports

Open a new terminal window and run the following command:

```
docker ps
```

You will be given a printout showing your running containers. Part of the printout should contain something like this:

```
.....   0.0.0.0:5000->5000/tcp,   api

```

This tells you that the various machines exist "locally" at 0.0.0.0 and that the exposed service port have been mapped to port 5000.

### Stopping Container

To stop the docker development environment, issue the following command from the project root:

```
npm run docker:down
```

This will stop all the container and related to this project.

### Starting Container

To start the docker development environment another time run:

```
npm run docker:up
```

This will start the container again

### View the Home Page

To load the welcome message of the app, visit the url below in a browser:

    (http://0.0.0.0:5000)

Thus your adventure begins... The project is up and running.
