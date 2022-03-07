import amqplib from 'amqplib';

amqplib.connect(process.env.AMQP_URL, (err, connect) => {
  connect.createChannel((error, channel) => {
    channel.assertQueue('transaction', {
      durable: false,
    });
  });
});
