const express = require('express');
const admin = require('../model/admin.model');
const transporter = require('../config/emailAuth');
const router = express.Router();

router.post('', async (req, res) => {
    const adminData = await admin.create(req.body);
    
    await transporter.sendMail({
        from: '"Digvijay Singh" <foo@example.com>',
        to: `${adminData.email}`, 
        subject: `${adminData.first_name} ${adminData.last_name} has registered with us`, 
        text: `Please welcome ${adminData.first_name} ${adminData.last_name}`
      });

    res.status(201).send(adminData);
});

router.get('', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const offset = (page - 1) * limit;

    const getadmin = await admin.find().populate('user').skip(offset).limit(limit).lean().exec();
    const totalDocument = await admin.find().countDocuments();
    const totalPage = Math.ceil(totalDocument / limit);
    res.status(200).json({ getadmin,totalPage });
})

module.exports = router;