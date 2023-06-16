---
sidebar_position: 2
sidebar_label: 'Adding a frontend app to Teaser'
---

# Adding a frontend app to Teaser

**TODO: Add a relevant example for the tutorial**

### Installing a package

Use `npx expo install PACKAGE_NAME` in the frontend container

### Adding frontend code

- Module breakdown and atomic design

:::tip Atomic Design
How to structure your frontend code:
:::

### Media Queries using React Query

- https://docs.google.com/document/d/1gXa4vBWtwQQoKYCCmfc52D1pwo19XHVTPXh5whN4riw/edit?usp=sharing
- **TODO: Link to backend tutorial**

:::tip React Query
**TODO**
:::

### Managing global state and authentication

- Jotai atoms to manage global state. See `src/frontend/teaser/hooks/auth/useUserAuth.js`
```javascript
const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
```
:::tip Jotai
**TODO**
:::

### Testing your code

- **TODO:**

### Deploying your code

- Create a distribution (development, preview or production)
