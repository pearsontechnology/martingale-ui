FROM kyma/docker-nginx

# Copy the application files
WORKDIR /var/www
COPY build/ /var/www/

# Start nginx
CMD 'nginx'
