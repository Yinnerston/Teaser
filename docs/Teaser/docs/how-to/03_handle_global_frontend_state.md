---
sidebar_position: 3
sidebar_label: "Handle global state in the frontend"
---

# Handling global frontend state

See [the frontend tutorial](../tutorials/02_new_frontend_app.md) for a high level overview.

### Jotai

**TODO:** Jotai atoms. Why Jotai over Zustand,.

### Managing user auth

### Managing global state and authentication

- Jotai atoms to manage global state. See `src/frontend/teaser/hooks/auth/useUserAuth.js`
```javascript
const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
```

### Other use cases with global state and jotai
