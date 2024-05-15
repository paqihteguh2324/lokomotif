import { Kafka } from "kafkajs"; // Import Kafka library
import Mongoose from "mongoose";

class KafkaConfig { // Define a class named KafkaConfig

  constructor() { // Constructor function to initialize the class
    this.kafka = new Kafka({ // Create a new Kafka instance
      clientId: "nodejs-kafka", // Set the client ID for this application
      brokers: ['0.0.0.0:9092'] // Specify the Kafka broker address (replace with your actual broker URL)
    });
    this.producer = this.kafka.producer(); // Create a Kafka producer instance
    this.consumer = this.kafka.consumer({ groupId: "myGroup" }); // Create a Kafka consumer instance with a group ID
  }

  async produce(topic, message) { // Asynchronous function to produce messages
    try {
      await this.producer.connect(); // Connect the producer to Kafka

      const messages = [ // Define an array of messages to send
        {
          value: JSON.stringify(message), // Stringify the message object for sending
        },
      ];

      await this.producer.send({ // Send the message(s)
        topic: topic, // Specify the topic to send the message to
        messages: messages, // The array of messages to send
      });
    } catch (err) { // Catch any errors during production
      console.log(err); // Log the error message
    } finally { // Always disconnect the producer after sending
      await this.producer.disconnect(); // Disconnect the producer from Kafka
    }
  }

  async consume(topic, callback){
    try{
        await this.consumer.connect()
        await this.consumer.subscribe({topic: topic, fromBeginning: true})
        await this.consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                const value = JSON.parse(message.value.toString());

                if (!Mongoose.models['info-lokomotif']) {
                    const InfoLokomotifSchema = new Mongoose.Schema({
                        kodeLoko: String,
                        namaLoko: String,
                        dimensiLoko: String,
                        status: String,
                        waktu: String
                      });
                    
                      Mongoose.model('info-lokomotif', InfoLokomotifSchema);
                  }
                
                const InfoLokomotif = Mongoose.model('info-lokomotif');
                 const dataToSave = new InfoLokomotif(
                    {
                     kodeLoko: value.kode,
                     namaLoko: value.nama,
                     dimensiLoko: value.dimensi,
                     status: value.status,
                     waktu: value.waktu
                    });
                dataToSave.save()
                    .then(() => {
                    console.log('Data berhasil disimpan ke MongoDB');
                    })
                    .catch((err) => {
                    console.error('Gagal menyimpan data ke MongoDB:', err);
                    });
                callback(value);
            }
        })
    }catch(err){
        console.log(err)
    }
}
}

export default KafkaConfig; // Export the KafkaConfig class for use in other modules
