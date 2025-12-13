# AnimeHub Login Credentials

## ✅ Valid Test Accounts

You can login with any of these accounts:

### Account 1 (Original)
- **Email**: `russell@mail.com`
- **Password**: `12345`

### Account 2
- **Email**: `test@example.com`
- **Password**: `password`

### Account 3
- **Email**: `admin@anime.com`
- **Password**: `admin123`

### Account 4
- **Email**: `user@test.com`
- **Password**: `test123`

## 🔐 How to Login

1. Go to http://localhost:5173/login
2. Enter one of the email/password combinations above
3. Click "Login"
4. You'll be redirected to the homepage

## ⚠️ Common Issues

### "Invalid credentials" error
This happens when:
- Email or password is typed incorrectly
- Using credentials that aren't in the list above
- Extra spaces in email or password fields

### Solution
- Copy and paste the credentials exactly as shown above
- Make sure both backend and frontend servers are running
- Check browser console for any errors (F12)

## 📝 Note

These are **dummy/test accounts** for development. In production, you would:
- Store users in a database (MongoDB, PostgreSQL, etc.)
- Hash passwords with bcrypt
- Use JWT tokens for authentication
- Implement proper user registration
