# Lecture

- https://egghead.io/courses/manage-application-state-with-jotai-atoms-2c3a29f0

# Atoms

- Container for state
- Can inherit from other atoms
```javascript
dotsAtom = useAtom(0);
numDotsAtom = useAtom(
    (get) => get(dotsAtom).length
)
```
- numDotsAtom works as an atom that updates state on change

# Types of Atoms

- Write only atoms
- Can compose atoms out of other atoms (e.g. list of atoms)

# Deleting Atoms:

- Stored in weakMap data structure
- Setting an atom to null functionally deletes it, and it will be eventually garbage collected

# Undo actions on state by implementing undoHistory

- ^ EXACTLY the same as a primitive atom, but it saves history before update:
  - Create immutable history list of atoms creating the history (atoms must be the same type)
  - On action, add atom to the list atom and replace changed atom (now in history) with updated atom
  - Add undo button by popping off the most recent element in the history list atom of atoms
