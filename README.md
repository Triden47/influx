
<h1 align="center" id="title">InFlux</h1>

<p id="description">This library simplifies the process of dynamically replacing placeholder strings or interacting with APIs and forms based on JSON input. It provides robust parsing and execution capabilities to handle a variety of use cases efficiently.</p>

<h2>🚀 Demo</h2>

[https://triden47.github.io/influx/](https://triden47.github.io/influx/)

  
  
<h2>🧐 Features</h2>
    
1. **String Parsing**:  
   - Easily replace placeholders within text strings for dynamic content generation.

2. **JSON Handling**:  
   - **Form Handling**:  
     - Parses the `body` field in the JSON input.  
     - Automatically creates and submits a form using `form.submit()`.  

   - **API Handling**:  
     - Parses `body`, `queryParams`, and `pathParams` from the JSON input.  
     - Creates and executes a `fetch` API promise, where the `action` (URL) and `method` (HTTP method) are mandatory.

<h2>🛠️ Installation Steps:</h2>

<p>CDN</p>

    <script src="https://cdn.jsdelivr.net/gh/Triden47/influx@1.0.0/dist/influx.min.js"/>
   
