# What is prosody

- XMPP server

# What tools do we use alongside prosody?

- react-native-gifted-chat : chat UI
- converse.js : XMPP client

# Setup

- Add to `.env` file
```
PROSODY_DOMAIN='wocchit.com' OR some other domain?
PROSODY_PASSWORD=???
PROSODY_DOMAIN=wocchit.com
PROSODY_VIRTUAL_HOSTS=wocchit.com
```

# Errors:

These modules need to be loaded by the dockerfile
```
conversejs
invites
smacks
```
Also got an error on these ?
