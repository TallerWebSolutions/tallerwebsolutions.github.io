#!/bin/bash

set -e

# Renew certs.
certbot renew --quite --noninteractive

# Copy blog certs.
cp /etc/letsencrypt/live/taller-blog.dropit.in/fullchain.pem \
  /home/taller-docker/docker-proxy/certs/taller-blog.dropit.in.crt
cp /etc/letsencrypt/live/taller-blog.dropit.in/privkey.pem \
  /home/taller-docker/docker-proxy/certs/taller-blog.dropit.in.key

# Copy site certs.
cp /etc/letsencrypt/live/taller-site.dropit.in/fullchain.pem \
  /home/taller-docker/docker-proxy/certs/taller-site.dropit.in.crt
cp /etc/letsencrypt/live/taller-site.dropit.in/privkey.pem \
  /home/taller-docker/docker-proxy/certs/taller-site.dropit.in.key
