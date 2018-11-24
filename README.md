# Lab3
<b>Lab 3 project</b>

Testide jooksutamiseks peab olema arvutisse installeeritud node (8.12.0) ja npm (6.4.1)

Liigu käsurealt alla tõmmatud projekti kausta ja sisesta järgmised käsud:

npm init --yes

npm i --save mocha@4.0.1 puppeteer@0.13.0 chai@4.1.2 http-server@0.10.0

npm i --save lodash

<b>Enne testide käivitamis on veel vaja confida genereeritud package.json faili ja asendada "scripts" sisu</b>

"test": "mocha test/bootstrap.js --recursive test",  
"server": "http-server src"

npm install

npm test
