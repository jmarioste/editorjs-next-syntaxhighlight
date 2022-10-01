import { OutputBlockData, OutputData } from "@editorjs/editorjs";
import React from "react";
import CodeRenderer from "./CodeRenderer";

const editorJsHtml = require("editorjs-html");

const EditorJsToHtml = editorJsHtml({
  //replace the default code renderer with our custom code renderer
  code: (block: OutputBlockData<string>) => {
    return <CodeRenderer code={block.data.code} />;
  },
});

type Props = {
  data: OutputData;
};
type ParsedContent = string | JSX.Element;

const EditorJsRenderer = ({ data }: Props) => {
  const html = EditorJsToHtml.parse(data) as ParsedContent[];
  return (
    <div className="prose max-w-full ">
      {html.map((item, index) => {
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </div>
  );
};

export default EditorJsRenderer;
