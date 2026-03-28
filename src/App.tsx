import { useEffect, useMemo, useState } from "react";
import Icon from "../lib/Icon";
import icons from "../lib/svg";
import "./App.css";

const iconList = Object.keys(icons).sort();
const lightColor = "#111827";
const darkColor = "#f8fafc";
const themeStorageKey = "balzer-icon-theme";
const colorStorageKey = "balzer-icon-color";

function getInitialTheme() {
  const storedTheme = localStorage.getItem(themeStorageKey);
  return storedTheme === "dark" ? "dark" : "light";
}

function getInitialColor() {
  const storedColor = localStorage.getItem(colorStorageKey);

  if (storedColor) {
    return storedColor;
  }

  return getInitialTheme() === "dark" ? darkColor : lightColor;
}

function App() {
  const [term, setTerm] = useState("");
  const [copied, setCopied] = useState<string>();
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [color, setColor] = useState(getInitialColor);

  const filteredIcons = useMemo(() => {
    const value = term.trim().toLowerCase();

    if (!value) {
      return iconList;
    }

    return iconList.filter((name) => name.toLowerCase().includes(value));
  }, [term]);

  useEffect(() => {
    localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(colorStorageKey, color);
  }, [color]);

  function handleColorChange(value: string) {
    const normalizedValue = value.trim();

    if (/^#[0-9a-fA-F]{6}$/.test(normalizedValue)) {
      setColor(normalizedValue.toLowerCase());
    }
  }

  async function copyToClipboard(text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(text);

      window.setTimeout(() => {
        setCopied(undefined);
      }, 1200);
    } catch {}
  }

  function handleThemeChange(nextTheme: "light" | "dark") {
    setTheme(nextTheme);
  }

  return (
    <div
      className="page"
      data-theme={theme}
      style={{ ["--icon-color" as any]: color }}
    >
      <div className="hero">
        <div className="hero__content">
          <div className="hero__eyebrow">BALZER ICON</div>
          <h1>Icon gallery</h1>
          <p>
            Navegue, filtre e copie rapidamente o nome de qualquer ícone da
            biblioteca.
          </p>
        </div>
      </div>

      <section className="toolbar">
        <div className="search">
          <span className="search__icon">
            <Icon name="search" />
          </span>

          <input
            value={term}
            placeholder="Buscar ícone"
            onChange={({ target }) => setTerm(target.value)}
          />
        </div>

        <div className="toolbar__actions">
          <div className="theme-switch" aria-label="Selecionar tema">
            <button
              type="button"
              className={theme === "light" ? "is-active" : ""}
              onClick={() => handleThemeChange("light")}
            >
              Light
            </button>

            <button
              type="button"
              className={theme === "dark" ? "is-active" : ""}
              onClick={() => handleThemeChange("dark")}
            >
              Dark
            </button>
          </div>

          <label className="pick-color">
            <span>Cor</span>
            <input
              type="color"
              value={color}
              onChange={({ target }) => handleColorChange(target.value)}
            />
          </label>

          <div className="color-field" data-copy={String(copied === color)}>
            <input
              type="text"
              value={color}
              spellCheck={false}
              maxLength={7}
              aria-label="Hexadecimal da cor"
              onChange={({ target }) => handleColorChange(target.value)}
            />

            <button
              type="button"
              className="copy-color"
              onClick={() => copyToClipboard(color)}
            >
              {copied === color ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>
      </section>

      <section className="results-bar">
        <div className="results-bar__count">
          <strong>{filteredIcons.length}</strong>
          <span>
            {filteredIcons.length === 1 ? "ícone encontrado" : "ícones encontrados"}
          </span>
        </div>

        {term ? (
          <button type="button" className="clear-button" onClick={() => setTerm("")}>
            Limpar busca
          </button>
        ) : null}
      </section>

      <div className="container">
        {filteredIcons.map((name) => (
          <button
            key={name}
            type="button"
            className="icon-card"
            onClick={() => copyToClipboard(name)}
            data-copy={String(copied === name)}
            title={`Copiar "${name}"`}
          >
            <div className="icon-card__preview">
              <span className="icon-card__icon">
                <Icon name={name as any} />
              </span>
            </div>

            <div className="icon-card__meta">
              <span className="icon-card__name">{name}</span>
              <span className="icon-card__hint">
                {copied === name ? "Copiado" : "Clique para copiar"}
              </span>
            </div>
          </button>
        ))}
      </div>

      {!filteredIcons.length ? (
        <div className="empty-state">
          <div className="empty-state__icon">
            <Icon name="search" />
          </div>
          <strong>Nenhum ícone encontrado</strong>
          <span>Tente outro termo de busca.</span>
        </div>
      ) : null}
    </div>
  );
}

export default App;
