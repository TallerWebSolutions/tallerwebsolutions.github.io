#!/bin/bash

set -ex

npm use
npm install
npm run build
rsync -avzhe "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" --exclude '.git' --delete ./.tmp/ taller-docker@67.205.177.225:/mnt/volume-baleia-prod/taller-site/
