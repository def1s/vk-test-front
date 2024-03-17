# Стажировка в команду Вконтакте

## Содержание
- [Как запустить](#как-запустить)
- [Реализация](#реализация)
    - [Основная структура проекта](#основная-структура-проекта)
- [Задание](#задание)

### Как запустить
1. Склонируйте репозиторий на свой ПК командой `git clone https://github.com/def1s/vk-test-front`
2. Перейдите в корневой каталог проекта
3. Установите все зависимости из package.json `npm install`
4. Запустите приложение с помощью `npm start` (браузер откроется автоматически)
5. Браузер предупредит о том, что соединение небезопасно (я использую https без сертификата для работы с VK tunnel). Найдите и нажмите "все равно посетить веб-сайт" (может отличаться в зависимости от браузера)
6. Если браузер не открылся, то перейдите по адресу _https://localhost:3000/_

### Реализация
_STACK: React, Typescript, FSD, TanStack Query, React Hook Forms, Yup, webpack, VKUI + Bridge + deploy_
- Для проекта я использовал React + TypeScript
- В качестве архитектуры выбрал Feature-sliced design:
    - FSD позволяет легко масштабировать проект, а также удобно работать с разделением ответственности
    - Нетрудно разобраться с архитектурой не знакомому с проектом разработчику
- Для запросов и хранения данных использовал TanStack Query
- Работа с формами осуществляется через React Hook Form
- Валидирую формы через Yup
- Для сборки настроил webpack, добавив необходимые плагины:
    - Dev server
    - CSS Modules
    - Конфигурация проекта декомпозирована на несколько функций в папке `config`
- Для оформления использована библиотека VKUI
- Проект залил в виде мини-приложения VK
  - [прямая ссылка на мини-приложение](https://prod-app51878971-ba129e81207f.pages-ac.vk-apps.com/index.html)
  - [ссылка на мини-приложение в каталоге](https://vk.com/app51878971)

### Основная структура проекта
```
.
├── README.md
├── package.json
├── config
│   └── ... <- Функции для настройки webpack
├── src
│   ├── app
│   │   ├── providers
│   │   │   ├── QueryProvider
│   │   │   │   └── ... <- Провайдер для TanStack Query
│   │   │   ├── VKProvider
│   │   │   │   └── ... <- Провайдер для работы VKUI, VK Bridge и VK tunnel
│   │   │   └── ErrorBoundary
│   │   │       └── ... <- Обработка критических ошибок
│   │   └── ...
│   ├── pages
│   │   └── MainPage
│   │       └── ... <- Основная и единственная страница (виджеты)
│   ├── widgets
│   │   ├── AgeDisplay
│   │   │   └── ... <- Отображение возраста
│   │   └── FactDisplay
│   │       └── ... <- Отображение факта
│   ├── features
│   │   ├── GetAge
│   │   │   ├── model
│   │   │   │   └── formValidationSchema.ts <- Схема валидация формы для получения возраста
│   │   │   ├── ui
│   │   │   │   └── ... <- Форма и логика для получения возраста с API
│   │   │   └── index.ts <- Public API
│   │   └── GetFact
│   │       ├── ui
│   │       │   └── ... <- Кнопка и логика для получения факта
│   │       └── index.ts <- Public API
│   └── shared
│       ├── hooks
│       │   └── useHttp.ts <- Хук для более удобной работы с fetch
│       └── lib
│           └── ... <- Вспомогательные функции
└── webpack.config.js <- Собранная конфигурация webpack
```

## Задание
<h3>Разработка React-приложения</h3>
Приложение должно состоять из нескольких частей:

<ol>
	<li>Блок с кнопкой и текстовым полем. По нажатию на кнопку выполнить запрос к&nbsp;<a href="https://vk.com/away.php?to=https%3A%2F%2Fcatfact.ninja%2Ffact&amp;utf=1" target="_blank">https://catfact.ninja/fact</a>. Полученный факт нужно записать в текстовое поле и установить курсор после первого слова.</li>
	<li>Форма с текстовым полем и кнопкой отправки.&nbsp;Пользователь вводит своё имя в текстовом поле. По истечении 3-х секунд после ввода имени или при отправке формы выполняется запрос к&nbsp;<a href="https://vk.com/away.php?to=https%3A%2F%2Fapi.agify.io%2F&amp;utf=1" target="_blank">https://api.agify.io/</a>&nbsp;с введенным именем в параметре <em>name</em>. Ответом будет возраст человека, определенный по имени. Этот ответ нужно отобразить под текстовым полем.<br>
	Особенности:
	<ul>
		<li>Необходимо предотвращать дублирующие запросы (не отправлять запрос с таким же именем).</li>
		<li>Предусмотреть отправку следующего запроса до того, как текущий был обработан - прерывать запрос, чей ответ нам уже не нужен (частый кейс при медленном интернете).</li>
	</ul>
	</li>
</ol>

<h3>Дополнительные задания:</h3>

<ol>
	<li>Использовать при реализации библиотеку VKUI (можно вынести формы в разные страницы, используя компоненты View и Panel).</li>
	<li>Реализовать валидацию поля ввода имени (имя может состоять только из букв).</li>
	<li>Развернуть данное приложение в виде мини-приложения ВКонтакте. Для этого дополнительно понадобится установить пакет bridge.</li>
	<li>Плюсом будет использование следующих библиотек и технологий, так как они активно применяются в проектах команды:
	<ul>
		<li>Архитектурная методология Feature-Sliced Design</li>
		<li>TanStack Query для работы с запросами</li>
		<li>Typescript</li>
		<li>React Hook Form + Yup для работы с формами и их валидацией</li>
	</ul>
	</li>
</ol>
