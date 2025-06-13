# 📊 Billing Software / Система Управления Торговлей

![Project Preview](images/explore_filtered.png)

## 🌟 About the Project / О проекте

**Billing Software** is a modern web application for managing products, categories and sales in retail.  
**Billing Software** - это современное веб-приложение для управления товарами, категориями и продажами в розничной торговле.

Key features / Основные возможности:

- 📦 Product and category management / Управление товарами и категориями
- 🛒 Functional shopping cart / Функциональная корзина покупок
- 👥 User management / Управление пользователями
- 🔐 Authorization and role system / Система авторизации и ролей

## 🛠 Technology Stack / Технологический стек

### Frontend

- **React** 19.1.0 (functional components, hooks) / (функциональные компоненты, хуки)
- **React Router** 6 for navigation / для навигации
- **Context API** for state management / для управления состоянием
- **Axios** for HTTP requests / для HTTP-запросов
- **React Hot Toast** for notifications / для уведомлений
- **Bootstrap** + custom CSS for styles / + кастомные CSS для стилей (подключен, но почти не используется)

### Backend

- **Spring Boot** (Java)
- **Spring Security** with JWT authentication / с JWT аутентификацией
- **Hibernate** + **MySQL** for data work / для работы с данными
- **Lombok** to reduce boilerplate code / для сокращения boilerplate кода

## 🚀 Features / Возможности

### For Administrators / Для администраторов

- 🔧 Full product and category management / Полное управление товарами и категориями
- 👥 New user registration / Регистрация новых пользователей

Planned features / Можно добавить:

- 📈 Sales analytics / Просмотр аналитики продаж
- 💳 Multiple payment methods support / Поддержка разных способов оплаты
- 📄 Receipt printing / Печать чеков

### For Customers / Для покупателей

- 🏷 Product browsing with filtering / Просмотр товаров с фильтрацией
- 🔍 Search products by categories and names / Поиск товаров по категориям и названию
- 🛒 Convenient shopping cart / Удобная корзина покупок
- 📱 Responsive interface / Адаптивный интерфейс

## 🖥 Interface Screenshots / Скриншоты интерфейса

| ![Main Page](images/explore.png)                   | ![Selected Products](images/explore_filtered.png)      |
| -------------------------------------------------- | ------------------------------------------------------ |
| Main application screen / Главный экран приложения | Selected products in cart / Выбранные товары в корзину |

| ![Items Manager](images/items.png) | ![Categories Manager](images/category.png) |
| ---------------------------------- | ------------------------------------------ |
| Items manager / Менеджер товаров   | Categories manager / Менеджер категорий    |

| ![Users Manager](images/users.png)     | ![Login Page](images/login.png) |
| -------------------------------------- | ------------------------------- |
| Users manager / Менеджер пользователей | Login page / Страница входа     |

## 🛠 Installation and Launch / Установка и запуск

### Requirements / Требования

- Node.js 16+
- Java 17+
- MySQL

### Frontend

```bash
git clone https://github.com/IlyaKukharchuk/Billing-Software.git
cd billing-software/frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

## 📂 Project Structure / Структура проекта

```
billing-software/
├── frontend/               # React application / React приложение
│   ├── public/             # Static files / Статические файлы
│   ├── src/                # Source code / Исходный код
│   │   ├── assets/         # Images and icons / Изображения и иконки
│   │   ├── components/     # UI components / UI компоненты
│   │   ├── context/        # Application contexts / Контексты приложения
│   │   ├── css/            # Styles / Стили
│   │   ├── pages/          # Application pages / Страницы приложения
│   │   ├── service/        # API services / API сервисы
│   │   └── App.js          # Main component / Главный компонент
├── backend/                # Spring Boot application / Spring Boot приложение
│   ├── src/main/java/
│   │   ├── config/         # Configurations / Конфигурации
│   │   ├── controller/     # REST controllers / REST контроллеры
│   │   ├── entity/         # Database entities / Сущности БД
│   │   ├── exceptions/     # Custom exceptions + GlobalExceptionHandler / Кастомные исключения + обработчик
│   │   ├── filters/        # Request filters / Фильтры запросов
│   │   ├── io/             # Request and response DTOs / DTO для запросов и ответов
│   │   ├── repository/     # Repositories / Репозитории
│   │   ├── service/        # Business logic / Бизнес-логика
│   │   └── utl/            # Utility classes / Утилитные классы
└── README.md               # This file / Этот файл
```

## 📜 License / Лицензия

This project is licensed under the MIT License.  
Этот проект распространяется под лицензией MIT.

For more details see [LICENSE](LICENSE) file.  
Подробнее см. в файле [LICENSE](LICENSE).
