import express from 'express';
import { config } from './config/config';
import https from 'https';
import http from 'http';
import app from './app';
import fs from 'fs';
import mongoose from 'mongoose';
e.connect(uri)

const port = config.port!;
const serverHttp = config.serverHttp!;
const uri = `mongodb+srv://Admin:abc-123@projet.b8hbi.mongodb.net/Test`;  

if(serverHttp=="true"){
  http.createServer(app).listen(port, () => {
    try{
      mongoose.connect(uri)
      console.log('Connexion à MongoDB réussie');
    }catch{
      console.log('Connexion à MongoDB échouer');
    }
    console.log(`Serveur en écoute sur <http://localhost:${port}>`);
  })
}else{
  const options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
  };
  https.createServer(options,app).listen(port, () => {

    try{
      mongoose.connect(uri)
      console.log('Connexion à MongoDB réussie');
    }catch{
      console.log('Connexion à MongoDB échouer');
    }
    console.log(`Serveur en écoute sur <https://localhost:${port}>`);
  })
}