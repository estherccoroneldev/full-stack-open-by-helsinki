sequenceDiagram
    Browser->>+Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of Browser: FORM DATA "New note from Brasil"
    Server-->>-Browser: HTTP 302 https://studies.cs.helsinki.fi/exampleapp/notes
    Note left of Server: Redirect to the notes page location
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>-Browser: Content type text/HTML
    Browser-->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>-Browser: Content Type text/CSS
    Browser-->+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>-Browser: Content Type application/javascript
    Browser-->+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->-Browser: Content Type application/JSON
    Note right of Browser: Browser re-renders the new notes.
