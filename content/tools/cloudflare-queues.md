---
slug: cloudflare-queues
title: "Cloudflare Queues - Durable Message Queue Without the Complexity"
description: Managed message queue service with at-least-once delivery guarantees, zero egress fees, and SQS-compatible semantics for distributed systems.
category: Cloudflare
tags: [cloudflare, cloudflare-queues, message-queue, sqs-alternative, rabbitmq-alternative, durable-queue, zero-egress]
website: https://developers.cloudflare.com/queues/
pricing: free
logo: /images/tools/cloudflare-queues.png
features:
  - "100K operations/day free"
  - "Zero egress fees"
  - "At-least-once delivery"
  - "Built into Workers"
  - "HTTP pull/push consumers"
  - "Automatic retries"
pros:
  - "No infrastructure to manage"
  - "Scales to zero automatically"
  - "Works with Workers natively"
  - "Cheaper than SQS"
  - "No egress surprise bills"
cons:
  - "Newer product (less mature)"
  - "No FIFO (yet)"
  - "30-day max retention"
alternatives:
  - AWS SQS
  - RabbitMQ
  - Apache Kafka
  - Google Pub/Sub
  - Azure Service Bus
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
---

# Cloudflare Queues

## SQS Without the AWS Tax

AWS SQS: $0.40/million operations. Plus egress. Plus API calls.

Cloudflare Queues: $0.40/million operations. **No egress.** No API call charges.

That's 10x cheaper at scale.

## Queues vs SQS vs RabbitMQ

| Feature | Cloudflare Queues | AWS SQS | RabbitMQ |
|---------|-------------------|---------|----------|
| Price | **$0.40/M** | $0.40/M + egress | Self-managed |
| Egress | **$0** | $0.09/GB | Self-managed |
| Setup | **5 minutes** | Hours | Days |
| Infra | **Serverless** | Serverless | Self-hosted |
| Scale | **Automatic** | Automatic | Manual |

## When to Use Queues

### Background Jobs
```javascript
// Producer (in your API)
await env.QUEUE.send({
  type: 'SEND_WELCOME_EMAIL',
  userId: user.id,
  email: user.email
})

// Consumer (separate Worker)
export default {
  async queue(batch, env) {
    for (const msg of batch.messages) {
      await sendWelcomeEmail(msg.body)
      msg.ack()
    }
  }
}
```

### Webhook Retries
```javascript
// Failed webhook? Queue it for retry
await env.RETRY_QUEUE.send({ url, payload, attempts: 0 })
```

### Fan-out Processing
```javascript
// Notify multiple services
await Promise.all([
  env.NOTIFY_ANALYTICS.send(event),
  env.NOTIFY_EMAIL.send(event),
  env.NOTIFY_SLACK.send(event)
])
```

## The Verdict

Queues are the last piece of the serverless puzzle. Now you can build fully serverless workflows without ever touching AWS.

**Stop managing RabbitMQ. Use Queues.**
