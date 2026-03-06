const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://eeyong35_db_user:<db_GaKMPD8LRb4ig8bk>@smoothbusiness.dv3k0ij.mongodb.net/?appName=SmoothBusiness', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Database connection error:', err));
app.listen(5000, () => console.log('Server running on port 5000'));

const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
 name: { type: String, required: true },
 price: { type: Number, required: true },
});
const Item = mongoose.model('Item', itemSchema);
app.post('/items', async (req, res) => {
 try {
   const item = new Item(req.body);
   await item.save();
   res.status(201).json(item);
 } catch (err) {
   res.status(400).json({ message: err.message });
 }
});
app.get('/items', async (req, res) => {
 try {
   const items = await Item.find();
   res.json(items);
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
});