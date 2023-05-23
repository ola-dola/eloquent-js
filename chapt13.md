# DOM

## Attributes

> HTML allows settting any attribute you want on nodes. This can be useful in storing extra information in a document.

- If you make up your own attribute names, though, such attributes will not be present as properties on the element’s node. Instead, you have to use the getAttribute and setAttribute methods to work with them.

```javascript
<p data-classified="secret">The launch code is 00000000.</p>
<p data-classified="unclassified">I have two feet.</p>

<script>
  let paras = document.body.getElementsByTagName("p");
  for (let para of Array.from(paras)) {
    if (para.getAttribute("data-classified") == "secret") {
      para.remove();
    }
  }
</script>
```

> It is recommended to prefix the names of such made-up attributes with data- to ensure they do not conflict with any other attributes.

## Layout

> `offsetWidth`and `offsetHeight` properties give you the space the element takes up in pixels.
> `clientWidth` and `clientHeight` give you the size of the space inside the element, ignoring border width.

```javascript
<p style="border: 3px solid red">
  I'm boxed in
</p>

<script>
  let para = document.body.getElementsByTagName("p")[0];
  console.log("clientHeight:", para.clientHeight);
  console.log("offsetHeight:", para.offsetHeight);
</script>

// clientHeight: 19
// offsetHeight: 25
```

`getBoundingClientRect` is the most effective way to find the precise position of an element on the screen. It returns an object with top, bottom, left, and right properties, indicating the pixel positions of the sides of the element relative to the top left of the screen.

> Reading DOM layout information and changing the DOM forces a lot of layout computations to happen and programs alternating between both will consequently run very slowly. It's important to optimize the code as much as possible to reduce the computations that need to happen.

```javascript
<p><span id="one"></span></p>
<p><span id="two"></span></p>

<script>
  function time(name, action) {
    let start = Date.now(); // Current time in milliseconds
    action();
    console.log(name, "took", Date.now() - start, "ms");
  }

  time("naive", () => {
    let target = document.getElementById("one");
    while (target.offsetWidth < 2000) {
      target.appendChild(document.createTextNode("X"));
    }
  });
  // → naive took 32 ms

  time("clever", function() {
    let target = document.getElementById("two");
    target.appendChild(document.createTextNode("XX"));

    // We calculate how much 'X' is needed to reach our target width of 2000
    // then we generate the string with that much 'X' and append once.
    let total = Math.ceil(2000 / (target.offsetWidth / 2));
    target.firstChild.nodeValue = "X".repeat(total);
  });
  // → clever took 1 ms
</script>
```

Unlike methods such as `getElementsByTagName`, the object returned by `querySelectorAll` is not live. It won’t change when you change the document. It is **still not a real array**, though, so you still need to call Array.from if you want to treat it like one. `querySelector` works the same way.

```javascript
/*
1: Build a Table
Given a data set of mountains, an array of objects with name, height, and place properties, generate the DOM structure for a table that enumerates the objects. It should have one column per key and one row per object, plus a header row with <th> elements at the top, listing the column names.

Write this so that the columns are automatically derived from the objects, by taking the property names of the first object in the data.

Add the resulting table to the element with an id attribute of "mountains" so that it becomes visible in the document.

Once you have this working, right-align cells that contain number values by setting their style.textAlign property to "right".

More details: https://eloquentjavascript.net/14_dom.html#i_g/5UC3zznV
*/

<h1>Mountains</h1>

<div id="mountains"></div>

<script>
  const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
  ];

  function buildTable(data) {
    let table = document.createElement("table");

    let headRow = document.createElement("tr");
    Object.keys(data[0]).forEach(heading => {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(heading))
        headRow.appendChild(th)
    })
    table.appendChild(headRow);

    data.forEach(({name, height, place}) => {
        let tr = document.createElement("tr");

        [name, height, place].forEach(value => {
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(value));

            if (!isNaN(value)) {
                td.style.textAlign = "right"
            }
            tr.appendChild(td)
        });

        table.appendChild(tr)
    });

    return table;
  }

  document.querySelector("#mountains").appendChild(buildTable(MOUNTAINS))
</script>
```

```javascript
/*
2: Elements by Tag Name
The document.getElementsByTagName method returns all child elements with a given tag name. Implement your own version of this as a function that takes a node and a string (the tag name) as arguments and returns an array containing all descendant element nodes with the given tag name.

To find the tag name of an element, use its nodeName property. But note that this will return the tag name in all uppercase. Use the toLowerCase or toUpperCase string methods to compensate for this.
​
*/

<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
  function byTagName(node, tagName) {
    // Your code here.
    let result = [];

    function findTags(node) {
      for(const child of node.children) {
       if (child.tagName.toLowerCase() == tagName) {
       	result.push(child)
       }
       else {
       	findTags(child);
       }
      }
    }

	findTags(node);

    return result

  }

  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  let para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>


```
