const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname)); // Разрешаем браузеру брать файлы из папки

// Поскольку у нас нет ключей ЮKassa, мы сделаем "Имитацию" оплаты (тестовый режим)
app.post('/api/create-payment', async (req, res) => {
    // Просто возвращаем фейковую ссылку на оплату, которая сразу начислит монеты
    console.log("Имитация создания платежа...");
    res.json({ url: '/api/fake-pay' });
});

// Если игрок перешел по ссылке /api/fake-pay, мы просто возвращаем его в игру
app.get('/api/fake-pay', (req, res) => {
    res.redirect('/?success=true');
});

// Отдаем саму игру при заходе на сайт
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер запущен! Откройте http://localhost:3000');
});