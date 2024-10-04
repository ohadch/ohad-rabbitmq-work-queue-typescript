import amqp from 'amqplib/callback_api';
import dotenv from 'dotenv';
import {QUEUE_NAME, RABBITMQ_URL} from "./settings";

dotenv.config();

amqp.connect(RABBITMQ_URL, (error0, connection) => {
    if (error0) {
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = QUEUE_NAME;
        const message = 'Hello World!';

        channel.assertQueue(queue, {durable: false});
        channel.sendToQueue(queue, Buffer.from(message));

        console.log(`Sent: ${message}`);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});