const express = require('express');
const user = require('../model/user.model');
const transporter = require('../config/emailAuth');
const router = express.Router();

router.post('', async (req, res) => {
    const userData = await user.create(req.body);
    
    await transporter.sendMail({
        from: '"Digvijay Singh" <foo@example.com>',
        to: `${userData.email}`, 
        subject: `Welcome to ABC system ${userData.first_name} ${userData.last_name}`, 
        text: `Hi ${userData.first_name}, Please confirm your email address`
      });

    res.status(201).send(userData);
});

router.get('', async (req, res) => {
    const page = req.query.page || 1;
    const size = req.query.limit || 2;
    const offset = (page - 1) * size;

    console.log(size);

    const getUser = await user.find().skip(offset).limit(size).lean().exec();
    const totalDocument = await user.find().countDocuments();
    const totalPage = Math.ceil(totalDocument / size);
    res.status(200).json({ getUser,totalPage });
})

module.exports = router;