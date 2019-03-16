// import helper function for createElement from snabbdom
import { h } from "snabbdom";

// Create component, pass in patch funtion from application
const App = (props,patchIt) => {
  // set up crappy onclick function
  function onClick() {
    console.log("clicked");
    patchIt(App({ ...props, show:!props.show},patchIt))
  }
  // set up actual component here
  const vCurrent = h("div", [
    h("h3", [`${props.title}`]),
      h("div", [
        h("input", {
          props: { value: props.input },
          on: { input: onInput, keydown: onEnter }
        })
      ]),
    h("p", [`Input says: ${props.input}`]),
    h("button", 
      { style: { fontWeight: "bold" }, 
      on: { click: onClick } }, [
      "Click me"
    ]),
    h("div",
      [ props.show ? h('h3',['WHADDUP']):"" ]),
    h("ul", 
      props.list.map(elt => h("li", [elt])))
  ]);
  // change p based on input and patch
  function onInput(e) {
    patchIt(App({ ...props, input: e.target.value},patchIt));
  }
  // add another elt to list and patch, clear input
  function onEnter(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      patchIt(App({...props, input: "", list:[...props.list, props.input] },patchIt));
    }
  }
  // return the component
  return vCurrent;
};

// export the component
export default App;

