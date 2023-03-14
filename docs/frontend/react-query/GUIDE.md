# React Query

```javascript
 import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

 const queryClient = new QueryClient()

 export default function App() {
   return (
     <QueryClientProvider client={queryClient}>
       <Example />
     </QueryClientProvider>
   )
 }

 function Example() {
   const { isLoading, error, data } = useQuery('repoData', () =>
     fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
       res.json()
     )
   )

   if (isLoading) return 'Loading...'

   if (error) return 'An error has occurred: ' + error.message


   return (
     <div>
       <h1>{data.name}</h1>
       <p>{data.description}</p>
       <strong>👀 {data.subscribers_count}</strong>{' '}
       <strong>✨ {data.stargazers_count}</strong>{' '}
       <strong>🍴 {data.forks_count}</strong>
     </div>
   )
 }
```

# Main concepts:

- Why react query? Hooks + utilities that aim to solve async server state
  - https://youtu.be/seU46c6Jz7E
- useQuery Hook:
  - Uses unique key + async function to fetch the data
  - Caching on the key
- useMutation hook:
  - Triggers background updates
  - No more refetch code needed on mutation in other components
  - Optimistic updates: Predict the update before the async function returns
    - Modify cache using key
    - Refetch which hits the modified cache
    - If failure (data not synced), rollback()


### States:
- Server state --> Remote persistance, async, shared ownership between different clients
  - We can easily fall out of sync with the server state due to the mutability by different clients and latency
- Client state: Local --> Up to date

### React native:

- Online status --> Auto refetch on reconnect
- Refetch on app focus: Use to reload feed when app is in focus
- Refresh on screen focus: Use to refetch feed on screen reload?
  - Home, profile, comments, etc..

# When does react query refetch?

- Cache data is considered stale/ Automatic background refetch when:
  - New instances of the query mount
  - The window is refocused
  - The network is reconnected.
  - The query is optionally configured with a refetch interval.
- TODO: If this causes too many refetches on infinite scroll, consider changing this

# Queries:

- Declarative depenency on async data tied to a unique key
  - Use mutation if you are modifying data
  - Supply unique key and function that returns a promise
- `result` object:
  - States:
    - isLoading
    - isError
    - isSuccess
    - isIdle
  - other information:
    - error
    - data: available on success sate
    - isFetching
- Sequence:
  - Check isLoading
  - Check isError
  - Assume data is available and render successful state
```javascript
 import { useQuery } from 'react-query'

 function App() {
   const result = useQuery('todos', fetchTodoList)
 }
```
- Query keys:
  - String: converted to array internally with the string as the only item
  - Array: Used to define hierarchies of query keys
  - Include dependent variables of queries in the query key
- You can extract query keys from the query function
```javascript
 function Todos({ status, page }) {
   const result = useQuery(['todos', { status, page }], fetchTodoList)
 }
 // Access the key, status and page variables in your query function!
 function fetchTodoList({ queryKey }) {
   const [_key, { status, page }] = queryKey
   return new Promise()
 }
```
- Parallel queries: When you use useQuery hooks side by side, they are automatically made parallel / concurrent
-
