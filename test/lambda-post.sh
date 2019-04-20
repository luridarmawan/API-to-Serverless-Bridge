TARGET_URL="your_aws_api_url"

curl -X POST \
  $TARGET_URL \
  -H 'Content-Type: application/json' \
  -H 'client-id: yourClientID' \
  -H 'client-id: yourClientSecret' \
  -H 'cache-control: no-cache' \
  -d '{
    "post01": "data 01",
    "post02": "data 02"
}'
echo
