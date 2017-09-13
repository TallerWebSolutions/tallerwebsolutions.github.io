#!/bin/bash

set -e

# Renew certs.
certbot renew -q --noninteractive \
--post-hook "docker exec -i docker-proxy service nginx reload"

# Copy site certs.
cp /etc/letsencrypt/live/taller.net.br/fullchain.pem \
  /home/taller-docker/docker-proxy/certs/taller.net.br.crt
cp /etc/letsencrypt/live/taller.net.br/privkey.pem \
  /home/taller-docker/docker-proxy/certs/taller.net.br.key
