import React from 'react'
import ReactDOM from 'react-dom/client'
import PaletteBuilder from './PaletteBuilder'
import './index.css'  // your Tailwind imports

ReactDOM.createRoot(document.getElementById('color-palette-builder')).render(
  <React.StrictMode>
    <PaletteBuilder />
  </React.StrictMode>
)

// import r2wc from "@r2wc/react-to-web-component"
// import TodoList from './TodoList'
// import './index.css'

// // We are ditching ReactDOM.createRoot because r2wc handles the mounting now.
// // The 'shadow: "open"' is the secret sauce that keeps your Tailwind styles 
// // from clashing with your website's styles.
// const WebTodo = r2wc(TodoList, {
//   shadow: "open"
// });

// // This registers the custom HTML tag. 
// // You can now use <richard-todo></richard-todo> anywhere.
// if (!customElements.get("richard-todo")) {
//   customElements.define("richard-todo", WebTodo);
// }