import renderer from "./renderer";
import markedLinkifyIt from "marked-linkify-it";
import * as marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
marked.use(markedLinkifyIt({}, {}));
marked.use({ renderer });
marked.setOptions({
  highlight: function (code, lang) {
    if (["js", "javascript"].includes(lang)) {
      if (lang === "nohighlight") {
        return code;
      } else {
        return hljs.highlight(code, { language: lang }).value;
      }
    }
    console.log(lang);
  },
});

export { marked };
