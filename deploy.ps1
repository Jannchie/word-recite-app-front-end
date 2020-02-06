yarn build
scp -i ~/.ssh/word-deploy -o StrictHostKeyChecking=no -r dist/** $env:WORD_SERVER_USERNAME@$env:WORD_SERVER_IP":/usr/share/nginx/html/"