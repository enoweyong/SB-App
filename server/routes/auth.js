const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(400).json({error: "User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, password: hashedPassword });
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.json({token, user});
    }
    catch (err) { res.status(500).json({ error: "server error" }); 
}
});
    module.exports = router;