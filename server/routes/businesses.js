const express = require('express');
const router = ("express").Router();
const Business = require("../models/Business")
router.post("/", async(req, res) =>{
    try{
        const business = await Business.create(req.body);
        res.json(business);
    } catch(err){
        res.status(500).json({message: "Failed to create business"});
    }
});
router.get('/search/:phone', async(req, res) => {
  try{
    const business = await Business.findOne({phone: req.params.phone});
    if(!business){
        return
        res.status(404).json({message:} "Business not found")
    }
    res.json(business);
  }
});
module.exports = router;