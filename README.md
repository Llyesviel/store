# Проект интернет-магазина с админ-панелью

Проект состоит из двух серверов:
- Клиентский сервер (порт 3000) - отображает каталог товаров
- Административный сервер (порт 8080) - предоставляет интерфейс управления товарами

## Требования

- Node.js (версия 12 или выше)
- npm (входит в состав Node.js)

## Установка

1. Склонируйте репозиторий:

```bash
git clone https://github.com/yourusername/shop-project.git
cd shop-project
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите серверы:

1. Запустите клиентский сервер (в первом терминале):

```bash
npm run start-client
```

2. Запустите административный сервер (во втором терминале):

```bash
npm run start-admin
```

## Использование

### Клиентская часть
- Откройте в браузере `http://localhost:3000`
- Здесь отображается каталог товаров с карточками, содержащими:
  - Название товара
  - Стоимость
  - Описание
  - Категории

### Административная панель
- Откройте в браузере `http://localhost:8080`
- Здесь доступны следующие функции:
  - Просмотр всех товаров
  - Добавление нового товара
  - Редактирование существующих товаров
  - Удаление товаров

## Структура проекта

project/
├── admin-server/
│ ├── server.js # Административный сервер
│ ├── admin.html # Интерфейс админ-панели
│ └── api-spec.yaml # Спецификация API
├── client-server/
│ ├── server.js # Клиентский сервер
│ └── public/
│ └── index.html # Клиентский интерфейс
├── data/
│ └── products.json # База данных товаров
├── package.json
└── README.md

## API Endpoints

### Административный сервер (порт 8080)

- `GET /api/products` - получение списка всех товаров
- `POST /api/products` - добавление одного или нескольких товаров
- `PUT /api/products/:id` - обновление товара по ID
- `DELETE /api/products/:id` - удаление товара по ID
- `GET /api-docs` - Swagger UI документация API

### Клиентский сервер (порт 3000)

- `GET /` - главная страница с каталогом товаров
- `GET /api/products` - получение списка всех товаров

## Формат данных товара

json
{
"id": 1,
"name": "Название товара",
"price": 1000,
"description": "Описание товара",
"categories": ["категория1", "категория2"]
}

## Примечания

- Все данные хранятся в файле `data/products.json`
- Изменения в админ-панели сразу отражаются в клиентской части при обновлении страницы
- Для работы с API можно использовать Postman или другой REST-клиент
