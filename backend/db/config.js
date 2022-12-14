const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// mongodb database url 
mongoose.connect('mongodb://localhost:27017/e-commerce');

