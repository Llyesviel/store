# Проект интернет-магазина с админ-панелью

Проект состоит из трех серверов:
- Клиентский сервер (порт 3000) - отображает каталог товаров с GraphQL API
- Административный сервер (порт 8080) - предоставляет интерфейс управления товарами
- Чат сервер (порт 4000) - обеспечивает WebSocket соединение для чата

## Требования

- Node.js (версия 12 или выше)
- npm (входит в состав Node.js)

## Установка

1. Склонируйте репозиторий:

```bash
git clone https://github.com/Llyesviel/store.git
cd store
```

2. Установите зависимости:

```bash
npm run install-deps
```

3. Запустите все серверы одной командой:

```bash
npm start
```

Или запустите серверы по отдельности:

```bash
npm run start-client    # Клиентский сервер
npm run start-admin    # Административный сервер
npm run start-chat     # Чат сервер
```

## Использование

### Клиентская часть
- Откройте в браузере `http://localhost:3000`
- Здесь отображается каталог товаров с карточками, содержащими:
  - Название товара
  - Стоимость
- Доступен чат с администратором
- Используется GraphQL для оптимизированной загрузки данных

### Административная панель
- Откройте в браузере `http://localhost:8080`
- Здесь доступны следующие функции:
  - Просмотр всех товаров
  - Добавление нового товара
  - Редактирование существующих товаров
  - Удаление товаров
  - Чат с покупателями

## Структура проекта

project/
├── admin-server/
│ ├── server.js # Административный сервер
│ ├── index.html # Интерфейс админ-панели
│ └── api-spec.yaml # Спецификация REST API
├── client-server/
│ ├── server.js # Клиентский сервер с GraphQL
│ └── public/
│ └── index.html # Клиентский интерфейс
├── chat-server/
│ └── server.js # WebSocket сервер для чата
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
- `/graphql` - GraphQL endpoint для оптимизированных запросов данных
- `GET /api/products` - получение списка всех товаров (REST API)
- `GET /api/categories` - получение списка всех категорий

### Чат сервер (порт 4000)

- WebSocket соединение для обмена сообщениями между клиентами и администраторами

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
- Изменения в админ-панели сразу отражаются в клиентской части
- Клиентская часть использует GraphQL для оптимизации загрузки данных
- Чат работает в реальном времени через WebSocket соединение
- Для работы с REST API можно использовать Swagger UI или другой REST-клиент
