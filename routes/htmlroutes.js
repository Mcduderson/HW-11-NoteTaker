const path = require("path");
const router = require("express").Router();

router.get('/notes', (req, res) => {
    const filePath = path.join(__dirname, '../public/notes.html');
    return res.sendFile(filePath);
});

router.get('*', (req, res) => {
    const filePath = path.join(__dirname, '../public/index.html');
    return res.sendFile(filePath);
});

module.exports = router;