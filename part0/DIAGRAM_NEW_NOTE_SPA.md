sequenceDiagram
    Browser->>+Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of Browser: FORM DATA "How do you feel?"
    Server-->>-Browser: Content-Type application/JSON
    Note left of Server: Returns the new JSON file, does not re-render the SPA notes page.
