#!/bin/bash
ps cax | grep node > /dev/null
if [ $? -eq 0 ]; then
  echo "Process is running." >/dev/null 2>&1
else
  echo "Process is not running."
  #PATH=$PATH:/usr/local/bin
  PATH=$PATH:/home/butchersmarket/.nvm/versions/node/v10.12.0/bin
  pm2 start ecosystem.config.js --env production
fi
