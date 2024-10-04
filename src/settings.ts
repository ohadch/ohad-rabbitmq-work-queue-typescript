import { config } from 'dotenv';

config();

export const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

export const QUEUE_NAME = 'hello';