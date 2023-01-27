import renderer from "./renderer";
import markedLinkifyIt from "marked-linkify-it";
import * as marked from "marked";
marked.use(markedLinkifyIt({}, {}));
marked.use({ renderer });

export { marked };
