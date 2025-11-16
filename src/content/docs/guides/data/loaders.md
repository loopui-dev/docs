---
title: Loaders
---

- Caching
- Keys

### Defining loaders

```ts
import { Loader } from "@loopui/data";

const BASE_URL = "/api/contacts";

export const listContacts = new Loader(async (query?: string) => {
    let url = BASE_URL;
    if (query) {
        url = `${url}?${encodeURIComponent(query)}`;
    }
    await fetch<ContactRecord[]>(url);
});

export const showContact = new Loader((id: number) =>
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

try {
    loading = true;
    contacts = await listContacts.fetch("Mark");
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

const KEY = "Leah";

// use `await` if you want to warm the cache
let preloadPromise = listContacts.fetch(KEY);

on(listContacts, {
    statechange({ input, state: { status, value, error } }) {
        const [name] = input;
        if (name === KEY) {
            // const {
            //     input,
            //     state: { status, value, error },
            // } = loaders.contacts.list.peek(KEY);

            switch (status) {
                case "pending": {
                    loading = true;
                }
                case "success": {
                    contacts = value;
                }
                case "error": {
                    console.error(error);
                }
                case "idle": {
                    loading = false;
                }
            }
        }
    },
});
```
