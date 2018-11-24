# Lab3
Lab 3 project

Testide jooksutamiseks peab olema arvutisse installeeritud node (8.12.0) ja npm (6.4.1)

Testide jooksutamiseks on vaja teha esmaslt kaust kuhu testid panna ja liikuda sinna kasuta

mkdir test-projekt

cd test-projekt

npm init --yes

npm i --save mocha@4.0.1 puppeteer@0.13.0 chai@4.1.2 http-server@0.10.0

npm i --save lodash

Enne testide käivitamis on veel vaja confida genereeritud package.json faili ja asendada "scripts" sisu

"test": "mocha test/bootstrap.js --recursive test",  
"server": "http-server src"

npm install

npm test
