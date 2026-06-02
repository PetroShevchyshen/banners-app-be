# Banners App Backend

REST API для управління банерами. Розроблено на [NestJS](https://nestjs.com/) з TypeScript.

## Про проект

**Banners** — це простий і легкий у використанні REST API для управління банерами (зображеннями) з інтеграцією підтримки Base64-кодування. API дозволяє:

- ✨ Створювати нові банери з Base64-кодованими зображеннями
- 📝 Переглядати всі банери або окремий банер за ID
- ✏️ Оновлювати інформацію про банери
- 🗑️ Видаляти банери

**Сховище:** JSON-файл (`db/banners.json`)

## API Endpoints

| Метод    | Маршрут        | Опис                 |
| -------- | -------------- | -------------------- |
| `GET`    | `/banners`     | Отримати всі банери  |
| `GET`    | `/banners/:id` | Отримати банер за ID |
| `POST`   | `/banners`     | Створити новий банер |
| `PUT`    | `/banners/:id` | Оновити банер        |
| `DELETE` | `/banners/:id` | Видалити банер       |

## Вимоги

- **Node.js** >= 18.x
- **npm** >= 9.x (або **yarn**)

## Швидкий старт

### 1. Встановлення залежностей

```bash
npm install
```

### 2. Локальний запуск

**Режим розробки (з автоперезавантаженням):**

```bash
npm run start:dev
```

**Звичайний режим:**

```bash
npm run start
```

**Режим дебагування:**

```bash
npm run start:debug
```

Сервер запуститься на `http://localhost:3000` (за замовчуванням).

## Інші корисні команди

**Компіляція проекту:**

```bash
npm run build
```

**Production режим:**

```bash
npm run start:prod
```

**Запуск тестів:**

```bash
npm run test          # unit-тести
npm run test:watch   # unit-тести з відстеженням змін
npm run test:cov     # покриття тестами
npm run test:e2e     # e2e-тести
```

**Форматування коду:**

```bash
npm run format
```

**Лінтування:**

```bash
npm run lint
```

## Структура проекту

```
src/
├── main.ts           # Точка входу
├── app.module.ts     # Головний модуль
├── app.controller.ts # Контролер
└── ...
```

## Додаткова інформація

- [NestJS документація](https://docs.nestjs.com)
- [TypeScript документація](https://www.typescriptlang.org/docs)
