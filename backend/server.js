const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let users = [];
let orders = [];

app.post('/api/register', (req, res) => {
    const user = { id: Date.now(), ...req.body };
    users.push(user);
    res.json({ success: true, user });
});

app.post('/api/login', (req, res) => {
    const user = users.find(u => u.email === req.body.email);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'User not found' });
    }
});

app.post('/api/order', (req, res) => {
    const order = { id: Date.now(), ...req.body, status: 'paid', createdAt: new Date() };
    orders.push(order);
    res.json({ success: true, order });
});

app.get('/api/orders/:email', (req, res) => {
    const userOrders = orders.filter(o => o.buyerEmail === req.params.email);
    res.json({ success: true, orders: userOrders });
});

app.listen(PORT, () => {
    console.log(`SecondHand.ng Backend running on port ${PORT}`);
});