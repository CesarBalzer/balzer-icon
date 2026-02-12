import { useEffect, useState } from "react";
import Icon from "../lib/Icon";
import icons from "../lib/svg";
import "./App.css";

const iconList = Object.keys(icons).sort();

function App() {
  const [list, setList] = useState(iconList);
  const [term, setTerm] = useState<string>();
  const [copied, setCopied] = useState<string>();
  const [color, setColor] = useState("#000");

  function copyToClipboard(text: string) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopied(text);

    setTimeout(() => {
      setCopied(undefined);
    }, 500);
  }

  useEffect(() => {
    handleTermChange(term);
  }, [term]);

  function handleTermChange(value?: string) {
    if (!value) {
      return setList(iconList);
    }

    const filter = iconList.filter((name) =>
      name.includes(value.toLowerCase())
    );

    setList(filter);
  }

  return (
    <div className="page">
      <header>
        <div className="search">
          <Icon name="search" />
          <input
            placeholder="Search Icon"
            onChange={({ target }) => setTerm(target.value)}
          />
        </div>

        <div className="pick-color">
          <input
            type="color"
            onChange={({ target: { value } }) => setColor(value)}
          />
        </div>
      </header>

      <div className="container" style={{ color }}>
        {list.map((name, i) => (
          <div
            key={i}
            className="icon"
            onClick={() => copyToClipboard(name)}
            data-copy={String(copied === name)}
          >
            <Icon name={name as any} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
