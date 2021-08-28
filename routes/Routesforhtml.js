const path = require('path')
const express = require('express').Router()




express.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  
  express.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  
  module.exports = express;
  