# Локальный чат

- Чат работает без сервера, в рамках одного браузера.
- У каждой вкладки своя сессия.
- При входе в чат пользователь должен идентифицировать себя и комнату чата в которую он хочет войти.
- Данные чата сохраняются и восстанавливаться при входе пользователя в комнату.
- Данные комнат и сообщений хранятся локально и не удаляются при закрытии браузера.

## Реализовано:
- Добавление и удаление комнат
- Модельное окно
- Условный рендеринг
- Добавление сообщений
- Прокрутка к последнему сообщению при обновлении списка сообщений
- Прикрепление к сообщению ответа
- Проверка на имя (вводилось ли оно)

## Информация:
- Приложение написано на React
- Использован JS
- Зависимости не хранятся в проекте
- Проект запускается при вводе команд npm install и npm run start