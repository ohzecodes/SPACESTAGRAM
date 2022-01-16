read -p "Enter API KEY: " key 
echo const apikey: string = \'$key\' > src/APIKEY.ts
echo 'export {apikey}' >> src/APIKEY.ts