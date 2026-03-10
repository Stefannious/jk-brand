# 🔐 Настройка Supabase (авторизация + заказы)

## 1. Создай проект

1. Зайди на **supabase.com** → Sign Up (бесплатно)
2. New Project → назови `jk-brand`
3. Придумай пароль базы данных (сохрани его)
4. Region: **Europe West** (Frankfurt)
5. Жди ~2 минуты пока проект создаётся

## 2. Получи ключи

В левом меню: **Settings → API**

Скопируй:
- **Project URL** → это `VITE_SUPABASE_URL`
- **anon public** key → это `VITE_SUPABASE_ANON_KEY`

## 3. Создай таблицы в базе данных

Перейди: **SQL Editor** → New Query → вставь и выполни:

```sql
-- Таблица профилей
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Таблица заказов
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL,
  status TEXT DEFAULT 'Новый',
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC NOT NULL DEFAULT 0,
  delivery_cost NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  delivery_type TEXT,
  payment_type TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
```

Нажми **Run** ✅

## 4. Добавь переменные в Vercel

В Vercel → твой проект → **Settings → Environment Variables**:

| Имя | Значение |
|-----|---------|
| `VITE_SUPABASE_URL` | https://xxx.supabase.co |
| `VITE_SUPABASE_ANON_KEY` | eyJhbGci... |

После добавления нажми **Redeploy**.

## 5. Готово! 🎉

Пользователи смогут:
- Регистрироваться и входить
- Видеть историю своих заказов
- Редактировать профиль (имя, телефон, город)
