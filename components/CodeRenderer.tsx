import React, { memo, useEffect, useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.min.css";

type Props = {
  code: string;
};

const CodeRenderer = ({ code }: Props) => {
  //first we split the lines, the first line will be reserved for the language definition.
  //the next lines will be reserved for the code itself.
  const [lang, ...body] = code.split("\n");

  //get the language
  const language = lang.slice(1);
  //join the body
  const _body = body.join("\n");

  useEffect(() => {
    //create an async function to load the lanugages using import
    async function highlight() {
      if (typeof window !== "undefined" || !language) {
        //import the language dynamically using import statement
        await import(`prismjs/components/prism-${language}`);
        Prism.highlightAll();
      }
    }
    highlight();
  }, [language, code]);

  return (
    <pre>
      <code className={`language-${language}`}>{_body}</code>
    </pre>
  );
};

export default memo(CodeRenderer);
