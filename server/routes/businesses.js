const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: 'Business route working' });
});
module.exports = router;