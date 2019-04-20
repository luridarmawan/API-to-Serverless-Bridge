TARGET_URL="http://localhost:3000/test/echo?var1=value1&var2=value2"

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
