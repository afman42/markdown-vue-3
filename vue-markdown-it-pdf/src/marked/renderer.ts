const renderer = {
  heading(text: string, level: number) {
    return `
        <h${level}>
              ${text}
        </h${level}>`;
  },
  link(href: string, title: string, text: string) {
    return `
      <a href="${href.replace(/["']/g, "")}">${text}</a>
    `;
  },
  codespan(code: string) {
    return (
      '<span><span class="preview-backtick">`</span>' +
      code +
      "<span class='preview-backtick'>`</span></span>"
    );
  },
  hr() {
    return `<hr />`;
  },
};

export default renderer;
