import { m as current_component, o as rest_props, q as fallback, t as ensure_array_like, v as spread_attributes, w as element, h as slot, x as bind_props, f as pop, y as sanitize_props, p as push, z as spread_props, k as escape_html } from "../../chunks/index.js";
import { d as default_slot } from "../../chunks/misc.js";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
/**
 * @license lucide-svelte v0.428.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name = fallback($$props["name"], void 0);
  let color = fallback($$props["color"], "currentColor");
  let size = fallback($$props["size"], 24);
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
  let iconNode = fallback($$props["iconNode"], () => [], true);
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...$$restProps,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class)
    },
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const $$item = each_array[$$index];
    const [tag, attrs] = $$item;
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]--><!---->`;
  slot($$payload, default_slot($$props), {});
  $$payload.out += `<!----></svg>`;
  bind_props($$props, {
    name,
    color,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode
  });
  pop();
}
function Clipboard($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "width": "8",
        "height": "4",
        "x": "8",
        "y": "2",
        "rx": "1",
        "ry": "1"
      }
    ],
    [
      "path",
      {
        "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "clipboard" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Copy($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "width": "14",
        "height": "14",
        "x": "8",
        "y": "8",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "path",
      {
        "d": "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "copy" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Download($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      }
    ],
    [
      "polyline",
      { "points": "7 10 12 15 17 10" }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "15",
        "y2": "3"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "download" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Paperclip($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "paperclip" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Send($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m22 2-7 20-4-9-9-4Z" }],
    ["path", { "d": "M22 2 11 13" }]
  ];
  Icon($$payload, spread_props([
    { name: "send" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$payload, $$props) {
  push();
  let items = [];
  let text = "";
  let interval;
  onDestroy(() => {
    clearInterval(interval);
  });
  const each_array = ensure_array_like(items);
  $$payload.out += `<div id="app" class="w-full p-4"><h2 class="text-2xl font-semibold mb-4 text-light">Send Stuff</h2> <div class="upload-container flex items-start gap-2 mb-5 w-full"><input id="file-upload" type="file" class="hidden"> <button type="button" class="w-12 h-12 rounded-lg border border-secondary bg-secondary text-light flex items-center justify-center text-xl transition duration-300 ease-in-out hover:bg-accent">`;
  Paperclip($$payload, {});
  $$payload.out += `<!----></button> <button type="button" class="w-12 h-12 rounded-lg border border-secondary bg-secondary text-light flex items-center justify-center text-xl transition duration-300 ease-in-out hover:bg-accent">`;
  Clipboard($$payload, {});
  $$payload.out += `<!----></button> <textarea placeholder="Enter your text here" required class="flex-grow p-2 border border-secondary bg-secondary text-light rounded-lg text-base resize-none overflow-hidden h-12 min-h-12 box-border">`;
  const $$body = escape_html(text);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> <button type="button" class="w-12 h-12 rounded-lg border border-secondary bg-secondary text-light flex items-center justify-center text-xl transition duration-300 ease-in-out hover:bg-accent">`;
  Send($$payload, {});
  $$payload.out += `<!----></button></div> <ul class="list-none p-0 m-0"><!--[-->`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const item = each_array[$$index];
    $$payload.out += `<li class="bg-secondary mb-2 p-4 rounded-lg flex justify-between items-center border-l-4 border-accent"><div class="file-info flex flex-col items-center"><div class="text-light">${escape_html(item.original_name)}</div> <span class="text-sm text-light text-center">${escape_html(item.expiry_text)}</span></div> <div class="file-actions flex gap-2">`;
    if (item.file_type === "text") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button type="button" class="w-10 h-10 rounded-lg bg-secondary text-light flex items-center justify-center text-lg transition duration-300 ease-in-out hover:bg-accent">`;
      Copy($$payload, {});
      $$payload.out += `<!----></button>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<button type="button" class="w-10 h-10 rounded-lg bg-secondary text-light flex items-center justify-center text-lg transition duration-300 ease-in-out hover:bg-accent">`;
      Download($$payload, {});
      $$payload.out += `<!----></button>`;
    }
    $$payload.out += `<!--]--></div></li>`;
  }
  $$payload.out += `<!--]--></ul></div>`;
  pop();
}
export {
  _page as default
};
