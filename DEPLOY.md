# 🚀 Инструкция по запуску сайта JK Brand

## Шаг 1 — Настройка Telegram-бота

1. Открой **@BotFather** в Telegram
2. Напиши `/newbot` → придумай название и username
3. Скопируй **токен** (вида `123456789:AAF...`)
4. Открой **@userinfobot** → напиши любое сообщение → скопируй **id**
5. Открой файл `src/services/telegram.ts`
6. Замени:
   - `ВСТАВЬ_ТОКЕН_БОТА_СЮДА` → твой токен
   - `ВСТАВЬ_СВОЙ_CHAT_ID_СЮДА` → твой id

---

## Шаг 2 — Загрузка на GitHub

1. Зарегистрируйся на **github.com**
2. Создай новый репозиторий (New repository) → назови `jk-brand`
3. Скачай и установи **GitHub Desktop** (desktop.github.com)
4. В GitHub Desktop: File → Add Local Repository → выбери папку `jk/`
5. Нажми "Publish repository"

---

## Шаг 3 — Деплой на Vercel (бесплатно)

1. Зайди на **vercel.com** → Sign up with GitHub
2. Нажми "Add New Project"
3. Выбери репозиторий `jk-brand`
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Нажми **Deploy** → через ~2 минуты сайт будет на vercel.app

---

## Шаг 4 — Подключение домена

1. Купи домен на **reg.ru** (например `jk-brand.ru`)
2. В Vercel: Settings → Domains → Add Domain → введи `jk-brand.ru`
3. Vercel покажет DNS-записи (два значения)
4. В reg.ru: Личный кабинет → Домены → DNS-серверы → добавь записи от Vercel
5. Через 15–60 минут сайт будет доступен на твоём домене ✅

---

## Шаг 5 — Обновления сайта

Чтобы обновить сайт в будущем:
1. Измени файлы в папке `jk/`
2. В GitHub Desktop: напиши комментарий → Commit → Push
3. Vercel автоматически пересоберёт и обновит сайт 🔄

---

## Контакты для поддержки
Email: Jjjako@mail.ru | Тел: +7 (925) 633-76-19
