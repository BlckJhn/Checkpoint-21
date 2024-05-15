const express = require('express');
const path = require('path');
const app = express();

// Middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hourOfDay = date.getHours(); // 0 to 23

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        // If it's a weekday and between 9 AM and 5 PM, proceed
        next();
    } else {
        res.send('Sorry, this website is only available during working hours (Monday to Friday, from 9:00 to 17:00).');
    }
};

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', workingHoursMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


