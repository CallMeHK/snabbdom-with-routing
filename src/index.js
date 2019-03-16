import Navigo from "navigo";
import { init, h } from "snabbdom";

// import a component
import App from "./App";

// patch functoin settings
const patch = init([
  require("snabbdom/modules/class").default, // makes it easy to toggle classes
  require("snabbdom/modules/props").default, // for setting properties on DOM elements
  require("snabbdom/modules/style").default, // handles styling on elements with support for animations
  require("snabbdom/modules/eventlisteners").default // attaches event listeners
]);
// currentNode var to pass to patchIt to use as prevVnode
let currentNode = null
// custom patch function to pass to components
const patchIt = (newNode) => {
  if (currentNode == null){
    currentNode = document.querySelector("#app");
  }
  patch(currentNode,newNode)
  currentNode = newNode
}

// router config
var root = null;
var useHash = true; // Defaults to: false
var hash = "#!"; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

// simple routes
const Home = () => h("div", ["Welcome home!"]);
const About = () => h("div", ["This is an about page!"]);

// set up router
router
  .on({
    '/': function() {
      patchIt(Home());
    },
    about: function() {
      patchIt( About());
    },
    app: function() {
      const newVnode = App(
        { title: "snabbdom", input: "nothing", list: [], show:false },
        patchIt
      );
      patchIt(newVnode);
    }
  })
  .resolve();
