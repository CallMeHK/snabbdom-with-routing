import Navigo from "navigo";
import { init, h } from "snabbdom";
import App from "./App";

const patch = init([
  require("snabbdom/modules/class").default, // makes it easy to toggle classes
  require("snabbdom/modules/props").default, // for setting properties on DOM elements
  require("snabbdom/modules/style").default, // handles styling on elements with support for animations
  require("snabbdom/modules/eventlisteners").default // attaches event listeners
]);

let currentNode = null

const patchIt = (newNode) => {
  if (currentNode == null){
    currentNode = document.querySelector("#app");
  }
  patch(currentNode,newNode)
  currentNode = newNode
}

var root = null;
var useHash = true; // Defaults to: false
var hash = "#!"; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

const Home = () => h("div", ["Welcome home!"]);
const About = () => h("div", ["This is an about page!"]);

const getApp = () => {
  document.querySelector("#root").innerHTML = `<div id='app'></div>`;
  return document.querySelector("#app");
};


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
        { title: "snabbdom", input: "nothing", list: [] },
        patchIt
      );
      patchIt(newVnode);
    }
  })
  .resolve();
