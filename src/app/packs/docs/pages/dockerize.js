const documentContents = `
Even though up until now we have been using the built in development server to work with Martingale, it doesn't require that we use this server.  In production (and most of the time in development) we don't need to use the development server to serve Martingale as it isn't an application stack, it is a web application that consists of only a few files (index.html, app.js, config.json, and some static assets).

Also it isn't always desireable to have to open multiple shell windows to keep the development server alive when we are not making changes to the source of Martingale.

In this section we will create a Dockerfile that will: create a production build, combine it with a standard Nginx image to create our final image, and running it within Docker.

### Creating the production build

To create a custom production build of Martingale all we have to do is exeucte:

\`\`\` bash
yarn build
\`\`\`

The final assets will be generated and placed in the build folder.  You can copy these assets to any webserver as you see fit.

### The Dockerfile

To deploy Martingale to a container we will first need to create a Docker Image that can be ran.  For this sample we will be using the kyma/docker-nginx image that is basically a static website server built on top of the nginx Docker Image.

Create a new file called Dockerfile, inside of it place the following contents:

\`\`\` docker
# An Nginx base image to serve static websites
FROM kyma/docker-nginx

# Copy the application files
WORKDIR /var/www
COPY build/ /var/www/

# Start nginx
CMD 'nginx'
\`\`\`

**NOTE:** This section is not ment to be a full explination of Docker or Dockerfiles, for that please see [https://www.docker.com/](https://www.docker.com/)

### Creating the docker image

Now that we have a Dockerfile that defines what our output image should be, lets create a new Docker Image from it that we can run locally:

\`\`\` bash
docker build -t martingale .
\`\`\`

**NOTE:** You should change "martingale" above to something unique to you, like your [Docker Hub username]/martingale or whatever.

### Running our new image

Finally we can run this image locally to test it:

\`\`\` bash
docker run -p 3000:80 martingale
\`\`\`

You should now be able to hit http://localhost:3000 and see the Martingale UI with all of your changes.

**NOTE:** Change 3000 above to whatever you want your local port to be.
`;

export default {
  $type: 'HeaderPage',
  props: {
    title: 'Martingale - Dockerized'
  },
  children: {
    $type: 'MarkDown',
    children: documentContents
  },
  path: '/docs/dockerize'
};
