# What is state?

- Any application data that can change
- https://youtu.be/5-1LM2NySR0 Good video on zustand vs jotai vs react query use cases

# Types of state:

- Server state: State of data that lives on the server
  - E.G. useQuery("data", () => await fetch("/").json())
  - Any data where the source of truth is on the server
    - User data, profile data, uploaded videos data, comments, messages
- Application state: Data specific to the application
  - E.G. windowIsOpen

# What tools can we use for local state?

- useState: Not bad
- React context: Passes state to every consuming component --> Only good for prop drilling
- Jotai: useState you can use anywhere
  - I have this data I want to change, the data is updated everywhere else
  - Atoms: Break up big state object into atoms, changes to atoms only rerender what depends on that atom
- Zustand: Create a store instead of a value with defined actions on the store
  - Only components that depend on the store's state rerender
- Redux: Large boilerplate / complexity but does all of the above^^
- XState: Formal State machine diagramming tool

# Use of state management tools in the app

- User auth:
  - Jotai / zustand
- Video feed:
  - jotai / zustand state for user auth
  - React query:
    - Comments: Refetch on window reload
    - Linked widgets like services, q&a --> Potentially refetch? Doesn't really change
    - Post video & post details --> Potentially refetch? Doesn't really change
- Video Editor:
  - jotai: https://github.com/pmndrs/jotai/discussions/826
  - react query: Get list of songs
- User Profile:
  - React query:
    - Just use this to fetch user profile + prop drilling
- Chat Messages:
  - Zustand:
    - Who's connected to a chat?
  - React query:
    - Actually fetch of messages
    - Fetch new followers
    - Fetch activities
    - https://tkdodo.eu/blog/using-web-sockets-with-react-query
- Notifications:
  - Same as chat using react query
- Services:
  - React Query
- Search:
  - jotai for search history
  - react query for refetch
