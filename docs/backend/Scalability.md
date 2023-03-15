

# Why is my Cache Inconsistent (synchronize geographically distributed caches)
- Meta: https://engineering.fb.com/2022/06/08/core-data/cache-made-consistent/
  - Related: https://news.ycombinator.com/item?id=31671252
  - Cache Invalidation: Invalidate caches when the source of truth (db) or client changes
  - Dynamic Caching:
  - Entry versioning:
  - Reliable Cache Consistency Observability:
    - Measuring cache performance: Polaris by Meta
      - Samples cache invalidation events
      - Verifies if all cache replicas are consistent
      - Deployed separately so scales independently from caches
    - Cache inconsistency:
      - Can only be introduced after in a short time window after a write, when racing cache mutations can take place
      - ^ This is the window where should log cache state changes
        - Build stateful tracing library embeded in cache services
        - Log client write, trace invalidations, buffers index of recently modified data for a few minutes to see if subsequent cache state changes of the same entry should be traced
- (old) Instagram: pgQ --> Regional caches visit database to invalidate cache and
  - https://wiki.postgresql.org/wiki/SkyTools

# Example implementation of Polaris with postgres:

- tails your database's binlog so it knows when e.g. "friendship" data is mutated - it can then perform the computation to figure out which cache entries "should have been" updated
- https://news.ycombinator.com/item?id=31672433

# When to invalidate caches

- https://blog.the-pans.com/when-and-how-to-invalidate-cache/
-
# Denormalization:

- Happens when our app becomes popular?
  - Posts become popular
  - Users become popular
- What access patterns should we expect?
  - Main feed becomes really popular
  - User's feed / profile becomes really popular
