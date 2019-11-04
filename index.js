const b64Strings = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+=".split(
  ""
);

const classSafeStrings = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
  ""
);

const randomString = count => {
  return [...Array(count)]
    .map(() => b64Strings[Math.floor(Math.random() * b64Strings.length)])
    .join("");
};

const randomStringClassSafe = count => {
  return [...Array(count)]
    .map(
      () =>
        classSafeStrings[Math.floor(Math.random() * classSafeStrings.length)]
    )
    .join("");
};

const makeStyle = className => {
  return `.${className}::before { content: "${randomString(
    Math.floor(Math.random() * b64Strings.length * 10)
  )}"; }
.${className}::after { content: "${randomString(
    Math.floor(Math.random() * b64Strings.length * 10)
  )}"; } `;
};

const makeBody = text => {
  const texts = text.split("");
  const classes = texts.map(() =>
    randomStringClassSafe(
      Math.floor(Math.random() * classSafeStrings.length * 10)
    )
  );
  const html = `
  <!DOCTYPE html>
  <html lang="js">
    <head>
      <meta charset="utf-8">
      <style>@font-face {
          font-family: "Space Grotesk Light";
          font-weight: 400;
          font-style: normal;
          src: url(https://fonts.floriankarsten.com/assets/fonts/SpaceGrotesk-Light.woff2) format("woff2");
        }
        body {
        background-color: #000;
        color: #fff;
        word-break: break-all;
        font-family: 'Space Grotesk Light',sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 0.8;
      }
      ${classes.map(cl => makeStyle(cl)).join("")}</style>
    </head>
    <body>
      ${texts.map((c, i) => `<span class="${classes[i]}">${c}</span>`).join("")}
    </body>
  </html>
  `;
  return html;
};

module.exports = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(makeBody("naari3"));
};
