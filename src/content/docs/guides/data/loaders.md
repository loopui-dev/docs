---
title: Loading Data
---

- Caching

### Defining loaders

```ts
import { Loader } from "@loopui/data";

const BASE_URL = "/api/contacts";

export let listContacts = new Loader(async (query?: string) => {
    let url = BASE_URL;
    if (query) url = `${url}?${encodeURIComponent(query)}`;
    return await fetch<ContactRecord[]>(url);
});

export let showContact = new Loader((id: number) =>
    fetch<ContactRecord>(`${BASE_URL}/${id}`),
);

let contact = await showContact.fetch(123);
let contacts = await listContacts.fetch();
```

### Usage with `async`/`await`

```ts
import { listContacts } from "./loaders.ts";

let contacts;
let loading = false;

const TERM = "Mark";

// use `await` if you want to warm the cache
let preloadPromise = listContacts.fetch(TERM);

try {
    loading = true;
    // Warms the cache if key is invalid, otherwise just reads from the cache
    contacts = await listContacts.fetch(TERM);
} catch (error) {
    console.error(error);
} finally {
    loading = false;
}
```

### Usage with events

```ts
import { on } from "@loopui/events";
import { listContacts } from "./loaders.ts";

let contacts = [];
let loading = false;

const TERM = "Leah";

// use `await` if you want to warm the cache before
// listening to state changes
let preloadPromise = listContacts.fetch(TERM);

let search = listContacts.filter(([name]) => name === TERM);

on(search, {
    statechange(event) {
        // event.input[0] === TERM
        // Get the latest state using `.get()`
        // let { status, value, error } = search.get(TERM);

        // Or read the latest state from the event
        switch (event.state.status) {
            case "pending": {
                loading = true;
            }
            case "success": {
                contacts = event.state.value;
            }
            case "error": {
                console.error(event.state.error);
            }
            case "idle": {
                loading = false;
            }
        }
    },
});
```
