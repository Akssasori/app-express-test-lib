import express from "express";
import pkg from 'actuatorhealth'; // Importa como um módulo único
const { default: HealthConnector } = pkg; // Acessa o `default` exportado pelo CommonJS

//amqp://usuario:senha@host:porta/vhost
const rabbitMQConfig = {
  url: 'amqp://user:password@localhost:5672/',
};

const mysqlConfig = {
  host: 'gcoperatio-01-16890299366.dev.mysql.globoi.com',
  user: 'u_gc_operation_c',
  password: 'd2hDdKQaNr',
  database: 'gc_operation_creative_gcp_qa',
};

const oracleDBConfig = {
 user: 'GCSISCOM',
 password: 'cld_12Gcsiscom',
 connectString: 'siscomhml-scan.corp.tvglobo.com.br:1521/sv_cloudservices.dbsiscomhml.g.globo',
}


const healthConnector = new HealthConnector({
  rabbitMQ: rabbitMQConfig,
  mySQL: mysqlConfig,
  oracleDB: oracleDBConfig,
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

// Endpoint de teste de conexão com RabbitMQ
app.get('/health/mysql', async (req, res) => {
  try {
    const isConnected = await healthConnector.mySQLConnection();
    if (isConnected) {
      res.status(200).json({ message: 'Mysql connection is healthy' });
    } else {
      res.status(500).json({ message: 'Failed to connect to Mysql' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error while testing mysql connection', details: error.message });
  }
});

// Endpoint de teste de conexão com RabbitMQ
app.get('/health/oracle', async (req, res) => {
  try {
    const isConnected = await healthConnector.oracleDBConnection();
    if (isConnected) {
      res.status(200).json({ message: 'Oracle connection is healthy' });
    } else {
      res.status(500).json({ message: 'Failed to connect to Oracle' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error while testing Oracle connection', details: error.message });
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
