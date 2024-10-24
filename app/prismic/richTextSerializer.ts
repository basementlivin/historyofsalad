import { type HTMLRichTextMapSerializer } from '@prismicio/client';

const serializer: HTMLRichTextMapSerializer = {
  heading1: ({ children }) =>
    /* html */ `<h1 class="h1">${children}</h1>`,
  heading2: ({ children }) =>
    /* html */ `<h2 class="h2">${children}</h2>`,
  heading3: ({ children }) =>
    /* html */ `<h3 class="h2">${children}</h3>`,
  paragraph: ({ children }) =>
    /* html */ `<p class="body">${children}</p>`,
  oList: ({ children }) =>
    /* html */ `<ol class="list">${children}</ol>`,
  oListItem: ({ children }) =>
    /* html */ `<li class="item">${children}</li>`,
  list: ({ children }) =>
    /* html */ `<ul class="list">${children}</ul>`,
  listItem: ({ children }) =>
    /* html */ `<li class="item">${children}</li>`,
  preformatted: ({ children }) =>
    /* html */ `<pre class=""><code>${children}</code></pre>`,
  strong: ({ children }) =>
    /* html */ `<strong class="body--bold">${children}</strong>`,
  hyperlink: ({ children, node }) =>
    /* html */`<a href="${node.data.url}" class="link--copy">${children}</a>`
}

export default serializer;