---
sidebar_position: 1
sidebar_label: 'What is Teaser?'
---

# What is Teaser?

I want to reverse engineer TikTok, so I made Teaser.

# What is the vision?

### Teaser as of 18/06/2023:
![Teaser Mind Map SVG](/docs/img/teasermindmap.svg)

- Video editor
  - Video filters
  - Cutting and splicing video together
  - Adding music from youtube clips
  - **TODO:** In app browser like HN Harmonic & video download
- **TODO:** Recommendation algorithm
- User profiles
  - Profile photos
  - **TODO:** Follow other users
  - **TODO:** Save posts to view later
- Tagging system
  - Teasers are searchable by tags
  - Robust tagging system
  - **TODO:** Link tags when clicked to search results
- Teaser video viewer
  - Likes, profile view, share, comments, etc
  - **TODO:** Nested comments
- **TODO:** XMPP Chat client
  - Prosody Server + Converse.js headless client
  - Message encryption
  - Group chat, 1:1 chat with subscribers
- **TODO:** Content moderation
  - NO illegal content! (See our terms of use)
- **TODO:** Payments
  - Stripe API

# What is NOT in scope?

- Signal Protocol / Custom encryption
- Rewriting the backend (subject to change if I start learning Rust)

# Who are our neighbours?

| Neighbour | Positive:                                                                                                                            | Negative:                                                                                                             |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| TikTok    | Presents content in a format that is easily consumable, i.e. average length of a vid is 10-15 seconds, Content covers the entire human experience | Censorship, content format lacks substance                                                                            |
| OnlyFans  | Ownership over your own content, Creators set their own hours, Interaction between creator and consumer                               | Lack of built-in advertising and support to creators, i.e. creators need to advertise themselves on Reddit and TikTok |

# What's our solution

I'm recreating TikTok using Django and React Native.
