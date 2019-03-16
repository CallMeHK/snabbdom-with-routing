import { init, h } from "snabbdom";

const App = (props,patchIt) => {
  function onClick() {
    console.log("clicked");
  }
  const vCurrent = h("div", [
    h("h3", [`${props.title}`]),
    h("div", [
      h("input", {
        props: { value: props.input },
        on: { input: onInput, keydown: onEnter }
      })
    ]),
    h("p", [`Input says: ${props.input}`]),
    h("button", { style: { fontWeight: "bold" }, on: { click: onClick } }, [
      "Click me"
    ]),
    h("ul", props.list.map(elt => h("li", [elt])))
  ]);
  function onInput(e) {
    patchIt(App({ title: "snabbdom", input: e.target.value, list:props.list},patchIt));
  }
  function onEnter(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      patchIt(App({ title: "snabbdom", input: "", list:[...props.list, props.input] },patchIt));
    }
  }
  return vCurrent;
};

export default App;

