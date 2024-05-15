import bodyParser from "body-parser";
import express from "express";
import KafkaConfig from "./config.js"
import controllers from "./controller.js";
import Mongoose from "mongoose";

const app = express()
const jsonParser = bodyParser.json()

app.listen(8081, () => {
    console.log("Server is running on port 8081.")
})

app.post("/api/send", jsonParser, controllers.sendMessageToKafka)

const kafkaConfig = new KafkaConfig()
kafkaConfig.consume('info-lokomotif', (value) =>{
    console.log(value);
})

Mongoose.connect('mongodb://localhost:27017/lokomotif', { useNewUrlParser: true, useUnifiedTopology: true });
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'Koneksi MongoDB gagal:'));
db.once('open', function() {
  console.log('Terhubung ke MongoDB');
});
const availableModels = Mongoose.modelNames();
console.log("Data",availableModels);