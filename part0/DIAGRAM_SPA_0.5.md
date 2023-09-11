sequenceDiagram
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>-Browser: Content type text/HTML
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>-Browser: Content Type text/CSS
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->>-Browser: Content Type application/javascript
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->-Browser: Content Type application/JSON
    Note right of Browser: Browser renders the notes to display.
    