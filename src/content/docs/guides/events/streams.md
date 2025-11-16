---
title: Event Streams
---

```ts
import { on } from "@loopui/events";

for await (let event of on(target).eventname) {
    // ...
}
```
