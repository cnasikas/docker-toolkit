[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# docker-toolkit

Manage docker containers and images from a graphical user interface.

## Installation

- `cd ./docker && yarn install`
- In the `api` directory, copy `.env-template` to `.env`.
- Add your docker host to the respective variable in `.env`. The docker host can be either `/var/run/docker.sock` or a url that follows the [URL Standard](https://nodejs.org/api/url.html#url_url_strings_and_url_objects).
- `yarn install`
- Start the server: `yarn start`
- In the `app` directory, copy `.env-template` to `.env.development.local` for development or `.env.production.local` for production and modify the variables accordingly. See more at [create-react-app](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#what-other-env-files-can-be-used).
- `yarn install`
- Start the app: `yarn start`

## RESTful API

The RESTful API exposes the following routes:

### List containers

Get the details of all available containers.

**URL** : `/api/container`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content** : `[{}]`

**Content examples**

```json
[
    {
        "id": "d4ab65c9306a",
        "image": "httpd",
        "state": "running",
        "status": "Up 3 hours"
    },
    {
        "id": "b55adb5daff1",
        "image": "alpine",
        "state": "exited",
        "status": "Exited (0) 2 hours ago"
    },
    {
        "id": "7ccba42e41cd",
        "image": "ubuntu",
        "state": "running",
        "status": "Up 5 hours"
    }
]
```

### Create container

Create a container.

**URL** : `/api/container/create`

**Method** : `POST`

**Data example** All fields must be sent.

```json
{
    "image": "ubuntu"
}
```

#### Success Response

**Code** : `200 OK`

**Content** : `{}`

### Start container

Start container by id.

**URL** : `/api/container/:id/start`

**Method** : `POST`

#### Success Response

**Code** : `200 OK`

**Content** : `{}`

### Stop container

Stop container by id.

**URL** : `/api/container/:id/stop`

**Method** : `POST`

#### Success Response

**Code** : `200 OK`

**Content** : `{}`

### Delete container

Delete container by id.

**URL** : `/api/container/:id`

**Method** : `DELETE`

#### Success Response

**Code** : `200 OK`

**Content** : `{}`

All error responses follow [Docker Engine API](https://docs.docker.com/engine/api/v1.40/#tag/Container)

## WebSocket API

Various operation of docker node such as container creation, image build, and container monitoring can take a lot of time. For that reason, a WebSocket Server is available where clients can connect, register to docker node streams, and interact with.

**Warning**: Only [socket-io](https://socket.io/) clients are supported.

### Messages

**name**: `stats`

**response**: Server responses container's stats to client.

**Paylod example**

```json
{
    "cpu": "0.00%",
    "id": "b55adb5daff1",
    "mem_limit": "NaN KiB",
    "mem_perc": "NaN%",
    "mem_usage": "NaN kB",
    "name": "bold_gates",
    "net": "0 B / 0 B"
}
```

**name**: `log`

**response**: Server responses container's log to client.

**Paylod example**

```json
{
    "log": "/ # ls -la"
}
```

**name**: `output`

**response**: Server responses output to client.

**Paylod example**

```json
{
    "output": "Image successfully build!"
}
```

**name**: `attach-container`

**request**: Client requests to be attached to a container for monitoring (stats & log).

**Paylod example**

```json
{
    "id": "d4ab65c9306a"
}
```

**name**: `create-container`

**request**: Client requests the creation of a container by image name.

**Paylod example**

```json
{
    "image": "ubuntu"
}
```

**name**: `build-image`

**request**: Client requests the building of an image by tar file.

**Paylod example**

```json
{
    "image": "Buffer",
    "tag": "my-image"
}
```

## CLI Usage

The CLI provides various functionalities to aid in the interaction with your docker node, without the need of API or APP deployment.

### Usage

```
node cli.js <command>

Commands:
  cli.js container <create|start|stop|dele  Manage docker containers. Run cli.js
  te|logs|stats|list> [id]                  container --help for more
                                            information.
  cli.js image build <file>                 Manage docker images. Run cli.js
                                            image --help for more information.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

### Examples

```
node cli.js container list
node cli.js container create --image my_image_name
node cli.js container start 3ac79a9ced0c
node cli.js container logs 3ac79a9ced0c --stream
node cli.js container stats 3ac79a9ced0c --stream
node cli.js image build ./image.tar --image my_image_name
```

## TODO

- Throttle stream when building an image or creating a container (Performance optimization).
- More arguments on container creation and image build.
- Dockerize toolkit.
