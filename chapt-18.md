# HTTP And Forms

> Note that the promise returned by fetch resolves successfully even if the server responded with an error code. It might also be rejected if there is a network error or if the server that the request is addressed to can’t be found.

## Exercises

```javascript
/*
1: Content Negotiation
One of the things HTTP can do is called content negotiation. The Accept request header is used to tell the server what type of document the client would like to get. Many servers ignore this header, but when a server knows of various ways to encode a resource, it can look at this header and send the one that the client prefers.

The URL https://eloquentjavascript.net/author is configured to respond with either plaintext, HTML, or JSON, depending on what the client asks for. These formats are identified by the standardized media types text/plain, text/html, and application/json.

Send requests to fetch all three formats of this resource. Use the headers property in the options object passed to fetch to set the header named Accept to the desired media type.

Finally, try asking for the media type application/rainbows+unicorns and see which status code that produces.
*/

async function showTypes() {
  let url = "https://eloquentjavascript.net/author";
  const types = [
    "text/plain",
    "text/html",
    "application/json",
    "application/rainbows+unicorns",
  ];

  for (const type of types) {
    let res = await fetch(url, { headers: { Accept: type } });
    let text = await res.text();
    console.log(`${type}: ${text}\n`);
  }
}

showTypes();
```

```javascript
/* 2: A JavaScript Workbench
Build an interface that allows people to type and run pieces of JavaScript code.

Put a button next to a <textarea> field that, when pressed, uses the Function constructor we saw in Chapter 10 to wrap the text in a function and call it. Convert the return value of the function, or any error it raises, to a string and display it below the text field.
*/
//  Run in the sandbox: https://eloquentjavascript.net/18_http.html#i_wTXvIH5Wds

<textarea id="code">return "hi";</textarea>
<button id="button">Run</button>
<pre id="output"></pre>

<script>
  function runCode(code) {
  	return Function(code)();
  }

  document.querySelector("#button").addEventListener("click", () => {
   	let editor = document.querySelector("#code");
  	let output = document.querySelector("#output");

	let returnVal = runCode(editor.value);
    output.textContent = returnVal;
})
</script>
```
