const path = require('path')
const express = require('express').Router()




express.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  
  express.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  
  module.exports = express;
  


  //   Fun fact:  your muslces can get over exerted and stop working right.
//  Fun fact: your bladder functions via a surrounding "net" of muscles.
//  Fun fact: Use of strained muscles is extremely painful
//  Fun fact:  I hope you can laugh because I certanly can't