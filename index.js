import express from "express";
import pkg from 'actuatorhealth'; // Importa como um módulo único
const { default: HealthConnector } = pkg; // Acessa o `default` exportado pelo CommonJS

//amqp://usuario:senha@host:porta/vhost
const rabbitMQConfig = {
  url: 'amqp://user:password@localhost:5672/',
};


const healthConnector = new HealthConnector({
  rabbitMQ: rabbitMQConfig,
});


const app = express();
const PORT = 3000;


app.use(express.json());

// Endpoint de teste de conexão com RabbitMQ
app.get('/health/rabbitmq', async (req, res) => {
  try {
    const isConnected = await healthConnector.rabbitMQConnection();
    if (isConnected) {
      res.status(200).json({ message: 'RabbitMQ connection is healthy' });
    } else {
      res.status(500).json({ message: 'Failed to connect to RabbitMQ' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error while testing RabbitMQ connection', details: error.message });
  }
});

// Endpoint simples que retorna "Hello World"
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
