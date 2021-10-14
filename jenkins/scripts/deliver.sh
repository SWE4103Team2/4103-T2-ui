#!/usr/bin/env sh

npm run build

npm start &
sleep 1
echo $! > .pidfile