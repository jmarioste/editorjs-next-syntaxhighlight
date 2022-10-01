//index.tsx
import { OutputData } from "@editorjs/editorjs";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import EditorJsRenderer from "../components/EditorJsRenderer";

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const EditorBlock = dynamic(() => import("../components/Editor"), {
  ssr: false,
});
const initialData: OutputData = {
  time: 1664631046512,
  blocks: [
    {
      id: "i1HDCAxqng",
      type: "code",
      data: {
        code: "#python\n\n# This program prints Hello, world!\nprint('Hello, world!')\n",
      },
    },
    {
      id: "S_oEvbfKfl",
      type: "code",
      data: {
        code: "#css\n\nhtml,\nbody {\n  padding: 0;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,\n    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n}\n\n",
      },
    },
  ],
  version: "2.25.0",
};
const Home: NextPage = () => {
  //state to hold output data. we'll use this for rendering later
  const [data, setData] = useState<OutputData>(initialData);
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-1 ">
        <h1>Editor</h1>
        <div className="border rounded-md">
          <EditorBlock
            data={data}
            onChange={setData}
            holder="editorjs-container"
          />
        </div>
      </div>
      <div className="col-span-1 ">
        <h1>Preview</h1>
        <div className="border rounded-md">
          <div className="p-16">{data && <EditorJsRenderer data={data} />}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
