# Events

The `removeEventListener` method, called with arguments similar to `addEventListener`, removes a handler.

- The **function given to removeEventListener has to be the same function value that was given to addEventListener.** So, to unregister a handler, you’ll want to give the function a name (once, in the example) to be able to pass the same function value to both methods.

```javascript
<button>Act-once button</button>
<script>
  let button = document.querySelector("button");
  function once() {
    console.log("Done.");
    button.removeEventListener("click", once);
  }
  button.addEventListener("click", once);
</script>
```

## Propagation

For most event types, handlers registered on nodes with children will also receive events that happen in the children. That is events that happen in the children nodes will be seen by handlers on the parent node(s) up till the root of the document. The event is said to **propagate outwards**.

- `stopPropagation` can be used to stop propagation of the event at any point.

```javascript
<p>A paragraph with a <button>button</button>.</p>
<script>
  let para = document.querySelector("p");
  let button = document.querySelector("button");

  para.addEventListener("mousedown", () => {
    console.log("Handler for paragraph.");
  });
  button.addEventListener("mousedown", event => {
    console.log("Handler for button.");
    if (event.button == 2) event.stopPropagation();
  });
</script>
```

> Most event objects have a `target` property that refers to the node where they originated.

## Scroll Events

Calling preventDefault on a scroll event does not prevent the scrolling from happening. In fact, the event handler is called only after the scrolling takes place.

## Load Event

When a page finishes loading, the "load" event fires on the window and the document body objects. This is often used to schedule initialization actions that require the whole document to have been built.

> Elements like script and img tags that load external files also have a `load` event that indicates that the resources have been loaded.

> Like the focus-related events, loading events do not propagate.

## Exercises

```javascript
/*
1: Balloon
Write a page that displays a balloon (using the balloon emoji, 🎈). When you press the up arrow, it should inflate (grow) 10 percent, and when you press the down arrow, it should deflate (shrink) 10 percent.

You can control the size of text (emoji are text) by setting the font-size CSS property (style.fontSize) on its parent element. Remember to include a unit in the value—for example, pixels (10px).

The key names of the arrow keys are "ArrowUp" and "ArrowDown". Make sure the keys change only the balloon, without scrolling the page.

When that works, add a feature where, if you blow up the balloon past a certain size, it explodes. In this case, exploding means that it is replaced with an 💥 emoji, and the event handler is removed (so that you can’t inflate or deflate the explosion).
*/

<p>🎈</p>

<script>
  // Your code here
  let balloon = document.querySelector("p");
  let fontSize;

  function setSize(newSize) {
  	fontSize = newSize;
    balloon.style.fontSize = fontSize + "px";
  }

  setSize(14);

  function inflateBalloon(event) {
    event.preventDefault();

    if (fontSize > 32) {
		balloon.textContent = "💥";
      	document.body.removeEventListener("keydown", inflateBalloon)
    }

  	if (event.key == "ArrowUp") {
      	setSize(fontSize * 1.1);
    } else if (event.key == "ArrowDown") {
		setSize(fontSize * 0.9);
    }
  }

  document.body.addEventListener("keydown", inflateBalloon);
</script>
```

```javascript
/*
1: Tabs
Tabbed panels are widely used in user interfaces. They allow you to select an interface panel by choosing from a number of tabs “sticking out” above an element.

In this exercise you must implement a simple tabbed interface. Write a function, asTabs, that takes a DOM node and creates a tabbed interface showing the child elements of that node. It should insert a list of <button> elements at the top of the node, one for each child element, containing text retrieved from the data-tabname attribute of the child. All but one of the original children should be hidden (given a display style of none). The currently visible node can be selected by clicking the buttons.

When that works, extend it to style the button for the currently selected tab differently so that it is obvious which tab is selected.
*/

<tab-panel>
  <div data-tabname="one">Tab one</div>
  <div data-tabname="two">Tab two</div>
  <div data-tabname="three">Tab three</div>
</tab-panel>
<script>
  function asTabs(node) {
    // Your code here.
    const tabs = Array.from(node.children);

    function setActiveTab(tabName) {
      tabs.forEach((tab) => {
   		tab.style.display = tabName == tab.getAttribute("data-tabname") ? "block" : "none"
      })
    }

    for (let i = tabs.length - 1; i >=0; i--) {
     let button = document.createElement("button");
     tabName = tabs[i].getAttribute("data-tabname");

     button.textContent = tabName;"cmmdments", 0
     button.addEventListener("click", (event) => {
       setActiveTab(event.target.textContent);
     })

     node.prepend(button);
    }

    setActiveTab(tabs[0].getAttribute("data-tabname"))
  }

  asTabs(document.querySelector("tab-panel"));
</script>
```
