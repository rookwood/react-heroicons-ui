const path = require("path");
const fs = require("fs").promises;
const glob = require("glob-promise");
const svgr = require("@svgr/core").default;

const pascalize = str =>
  (" " + str)
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());

const getOriginalSvgs = async () => {
  const svgGlob = path.join(__dirname, "heroicons-ui", "svg", "*.svg");

  const paths = await glob(svgGlob, {});

  return await Promise.all(
    paths.map(async svgPath => {
      const svgFileName = path.parse(svgPath).name;
      const componentName = pascalize(svgFileName);
      const svgFileContents = await fs.readFile(svgPath, { encoding: "utf-8" });

      return { componentName, svgFileName, svgFileContents };
    })
  );
};

const typescriptTemplate = ({ template }, _, { componentName, jsx }) => {
  const typeScriptTpl = template.smart({ plugins: ["typescript"] });
  return typeScriptTpl.ast`
    const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
  `;
};

const svgrOptions = {
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  template: typescriptTemplate,
  svgoConfig: { plugins: [{ prefixIds: false }] }
};

const compileReactComponent = async ({ componentName, svgFileContents }) => {
  const compiled = await svgr(svgFileContents, svgrOptions, { componentName });

  return compiled;
};

const main = async () => {
  const originals = await getOriginalSvgs();
  const componentNames = originals.map(({ componentName }) => componentName);

  const compiledComponents = await Promise.all(
    originals.map(compileReactComponent)
  );

  const fileContents = [
    `import * as React from "react";`,
    compiledComponents.join("\n"),
    `export {\n${componentNames.join(",\n  ")}\n};\n`
  ].join("\n\n");

  const outFilePath = path.join(__dirname, "index.tsx");

  await fs.writeFile(outFilePath, fileContents);
};

main();
