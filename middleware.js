const express = require('express');
const app = express();  

// Logger MiddleWare
const logger = (req, res, next) => {
    const currDate = new Date();
    console.log(`${currDate} $[req.method] $[req.url]`);
    next();
};

app.use(logger);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
