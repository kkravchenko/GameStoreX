# Gamestore

Run on Angular 19, ngrx store

Данные о пользователях хранятся в ngrx store.
Состояние стора пользователе хранится в localstore.

При переключении языка, тексты на сайте будет на выбранном языке.
При переключении валют, цены будут пересчитаны по рейту заданному для валюты а currency.json.

## Run

npm i  
ng serve

## Run in docker container

docker build -t gamestore .  
docker run -p 8080:80 gamestore
