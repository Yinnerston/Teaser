# Two Factor Authentication (2FA)

- Why am I not implementing 2FA right away?
  - If we want to pivot to an anonymous porn, then you don't need phone / email validation
  - I want to implement the other features more right now

# TODO: 2fa Workflow:

- Register
  - On the validate 2fa page:
    - Call validate 2fa endpoint
      - Log 2fa attempt
    - Validate 2fa using TOTP (user uses authenticator app)
    - user registration data is stored in state
  - On 2fa validation success:
    - Call register endpoint
      - Register endpoint checks 2FA success on matching phone number and no duplicate account made
  - On 2fa validation fail:
    - No registered account is created
  - On Registration success:
    - Goto Login page
  - On Registration fail:
    - Show error message

- Login:
  - Check user is registered (implies 2fa authenticated)
  - On login success:
    - Set token + redirect to homepage
  - On login fail:
    - Show error message
    - Counter for login attempts?

# What is the current implementation without 2fa?

- Register:
  - Just send all to register function with no phone number / email validation 2fa
- Login:
  - Just check account is registered^
