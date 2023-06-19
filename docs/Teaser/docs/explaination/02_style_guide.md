---
sidebar_position: 2
sidebar_label: "Style Guide"
---

# Style Guide

### Backend

- `snake_case`
- **BACKEND API DESIGN DOCUMENT:** I'm following these design guidelines as a rule of thumb. Use your best judgement when applying these to the revelant problems!
  - https://docs.google.com/document/d/1guS4SQ_60Ul50NjvXW7nv-FSR--LWcENV7zyKlMOTsg/edit?usp=sharing includes sources and discussion on where the design guidelines should apply
  - **Predictability**
    - Rule #1: Every endpoint should tell a story
    - Rule #2: Keep business logic in services
    - Rule #3: Make services the locus of reusability
    - Rule #4: Always sanitize user input, sometimes save raw input, always escape output
    - Rule #5: Don't split files by default & never split your URLs file
  - **Readability**
    - Rule #6: Each variable's type or kind should be obvious from its name
    - Rule #7: Assign unique names to files, classes, and functions
    - Rule #8: Avoid *args and **kwargs in user code
    - Rule #9: Use functions, not classes
    - Rule #10: There are exactly 4 types of errors that a REST API can return
  - **Simplicity**
    - Rule #11: URL parameters are a scam
    - Rule #12: Write tests. Not too many. Mostly integration.
    - Rule #13: Treat unit tests as a specialist tool
    - Rule #14: Use serializers responsibly, or not at all
    - Rule #15: Write admin functionality as API endpoints
  - **Upgradability**
  - Rule #16: Your app lives until your dependencies die
  - Rule #17: Keep logic out of the front end
  - Rule #18: Don't break core dependencies1
- **Hungarian notation**
- Foreign Key fields either are the name of the model they reference or have an `_id` suffix
- Using Python Black

### Frontend

- `camelCase`
- Prettier
- Atomic Design (React Native)
