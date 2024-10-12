# RabbitMQ Typescript Tutorial

This is a working example of a RabbitMQ worker queue using TypeScript.

Refer [here](https://www.rabbitmq.com/tutorials/tutorial-two-javascript) for the original tutorial.

## Setup

First, copy the `.env.example` file to `.env` and update the values as needed.

The, Run the RabbitMQ server using Docker:

```bash
docker compose up -d rabbitmq
```

Install the dependencies:

```bash
npm install
```

## Running Multiple Consumers

In multiple terminal windows, run the consumer:

```bash
npm run consumer
```

The consumers will start processing messages from the queue.

In order to add messages to the queue, run the producer:

```bash
npm run producer Hello....World!
```

Note that each dot represents a second of emulated processing time. Add more dots to simulate longer processing time.

## Conclusion

That's it! You have a working RabbitMQ worker queue using TypeScript.
