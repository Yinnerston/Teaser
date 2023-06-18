---
sidebar_position: 1
sidebar_label: "Scalability Strategy"
---

# Scalability Strategy

**In-Depth strategy:** https://docs.google.com/document/d/1RnDb1ep0ZLi6Y_Ep7Bzz1ufI4fIPGH7e9RaIzvJu0kg/edit?usp=sharing

![System Design Primer](/docs/img/systemdesignprimer.png)

:::tip Low hanging fruits
Exhaust the low-hanging fruits of vertical scaling before attempting a horizontal scaling strategy
:::

Indexes, algorithmic improvements, caching, CDN / geographical replication, etc.

### Nginx

Reverse proxy, serving static files, load balancing


### Message Queue

Not implemented yet. Using AWS SQS or RabbitMQ to handle expected growth (KISS).

### Redis

K/V store for caching database queries, HTTP API response.
Considered varnish for storing HTTP responses.
Planning on using Redis Sentinel before Redis Cluster.

### Django replication

- Pool of gunicorn workers load balanced by nginx.


### Postgres Replication

Master slave replication.
Denormalize first based on `EXPLAIN ANALYZE` on indexes and queries.
Implement sharding, federation later.

### Content Distribution Networks (CDNs)

Push CDN: Receives new content whenever changes occur onto the server
Pull CDN:  Grabs new content from the server when the first user requests content


### Microservices architecture

Current best practice is to implement code as “monolithic modules” which can be easily converted to microservices later ONLY IF REQUIRED. Avoiding HTTP overhead.
