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

        channel.assertQueue(queue, {durable: false});

        channel.consume(queue, (message) => {
            console.log(`Received: ${message?.content.toString()}`);
        }, {
            noAck: true
        })
    });
});