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

        channel.assertQueue(queue, {durable: true});

        // This tells RabbitMQ not to give more than one message to a worker at a time.
        channel.prefetch(1);

        console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, (msg) => {
            if (!msg) {
                console.error("No message received");
                return;
            }

            const secs = msg.content.toString().split('.').length - 1;

            console.log(` [x] Received ${msg.content.toString()}, will take ${secs} seconds to process`);
            setTimeout(function () {
                console.log(` [x] Done processing ${msg.content.toString()} in ${secs} seconds`);
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        })
    });
});