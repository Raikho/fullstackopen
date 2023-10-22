# Example Diagram

sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes

```mermaid
sequenceDiagram
    browser->>server: GET https://sutdies.cs.helsinki.fi/exampleapp/notes

graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```