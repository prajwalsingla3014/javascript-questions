/*
    How does the renderDom function append and create
    DOM elements basesd on the DOM structure
*/

const dom = {
  type: "section",
  props: {
    id: "section-1",
    class: "main-section",
    style: "background-color: lightblue; padding: 20px; border-radius: 5px",
  },
  children: [
    {
      type: "header",
      children: "Welcome to Javascript",
      props: {
        style: "font-size: 24px; color: darkblue, text-align: center",
      },
    },
    {
      type: "article",
      children: [
        {
          type: "h2",
          children: "Render DOM",
          props: {
            style: "color: darkgreen",
          },
        },
        {
          type: "p",
          children: "Try yourself first",
          props: {
            style: "font-size: 16px color: grey",
          },
        },
      ],
    },
    {
      type: "footer",
      children: "Thank you",
      props: {
        style: "text-align: center;font-size: 14px; color: black",
      },
    },
  ],
};

const rootElement = document.getElementById(root);

const renderDom = ({ children, props, type }) => {
  if (!type) return null;
  const element = document.createElement(type);
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key === "style") {
        element.style.cssText = value;
      } else {
        element.setAttribute(key, value);
      }
    });
  }
  if (Array.isArray(children)) {
    children.forEach((child) => element.appendChild(renderDom(child)));
  } else if (typeof children === "string") {
    element.textContent = children;
  }
  return element;
};

if (rootElement) {
  rootElement.appendChild(renderDom(dom));
}
