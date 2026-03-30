import {AnsiUp} from "ansi_up";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
import stylesheet from './stylesheet.css';
// ---------------------------------------------------------------------------
// Language registry
// ---------------------------------------------------------------------------

/**
 * @typedef {{ language: string, version: string, aliases: string[], runtime?: string }} LangEntry
 * @type {LangEntry[]}
 */
const PISTON_LANGUAGES = [
  { language: 'matl',         version: '22.5.0',   aliases: [] },
  { language: 'bash',         version: '5.2.0',    aliases: ['sh'] },
  { language: 'befunge93',    version: '0.2.0',    aliases: ['b93'] },
  { language: 'bqn',          version: '1.0.0',    aliases: [] },
  { language: 'brachylog',    version: '1.0.0',    aliases: [] },
  { language: 'brainfuck',    version: '2.7.3',    aliases: ['bf'] },
  { language: 'cjam',         version: '0.6.5',    aliases: [] },
  { language: 'clojure',      version: '1.10.3',   aliases: ['clojure', 'clj'] },
  { language: 'cobol',        version: '3.1.2',    aliases: ['cob'] },
  { language: 'coffeescript', version: '2.5.1',    aliases: ['coffeescript', 'coffee'] },
  { language: 'cow',          version: '1.0.0',    aliases: ['cow'] },
  { language: 'crystal',      version: '0.36.1',   aliases: ['crystal', 'cr'] },
  { language: 'dart',         version: '2.19.6',   aliases: [] },
  { language: 'dash',         version: '0.5.11',   aliases: ['dash'] },
  { language: 'typescript',   version: '1.32.3',   aliases: ['deno', 'deno-ts'],  runtime: 'deno' },
  { language: 'javascript',   version: '1.32.3',   aliases: ['deno-js'],          runtime: 'deno' },
  { language: 'basic.net',    version: '5.0.201',  aliases: ['basic','visual-basic','visual-basic.net','vb','vb.net','vb-dotnet','dotnet-vb','basic-dotnet','dotnet-basic'], runtime: 'dotnet' },
  { language: 'fsharp.net',   version: '5.0.201',  aliases: ['fsharp','fs','f#','fs.net','f#.net','fsharp-dotnet','fs-dotnet','f#-dotnet','dotnet-fsharp','dotnet-fs'], runtime: 'dotnet' },
  { language: 'csharp.net',   version: '5.0.201',  aliases: ['csharp','c#','cs','c#.net','cs.net','c#-dotnet','cs-dotnet','csharp-dotnet','dotnet-c#','dotnet-cs','dotnet-csharp'], runtime: 'dotnet' },
  { language: 'fsi',          version: '5.0.201',  aliases: ['fsx','fsharp-interactive','f#-interactive','dotnet-fsi','fsi-dotnet','fsi.net'], runtime: 'dotnet' },
  { language: 'dragon',       version: '1.9.8',    aliases: [] },
  { language: 'elixir',       version: '1.11.3',   aliases: ['elixir', 'exs'] },
  { language: 'emacs',        version: '27.1.0',   aliases: ['emacs', 'el', 'elisp'] },
  { language: 'emojicode',    version: '1.0.2',    aliases: ['emojic'] },
  { language: 'erlang',       version: '23.0.0',   aliases: ['erlang', 'erl', 'escript'] },
  { language: 'file',         version: '0.0.1',    aliases: ['executable', 'elf', 'binary'] },
  { language: 'forte',        version: '1.0.0',    aliases: ['forter'] },
  { language: 'forth',        version: '0.7.3',    aliases: ['gforth'] },
  { language: 'freebasic',    version: '1.9.0',    aliases: ['bas','fbc','basic','qbasic','quickbasic'] },
  { language: 'awk',          version: '5.1.0',    aliases: ['gawk'],             runtime: 'gawk' },
  { language: 'c',            version: '10.2.0',   aliases: ['gcc'],              runtime: 'gcc' },
  { language: 'c++',          version: '10.2.0',   aliases: ['cpp', 'g++'],       runtime: 'gcc' },
  { language: 'd',            version: '10.2.0',   aliases: ['gdc'],              runtime: 'gcc' },
  { language: 'fortran',      version: '10.2.0',   aliases: ['fortran', 'f90'],   runtime: 'gcc' },
  { language: 'go',           version: '1.16.2',   aliases: ['go', 'golang'] },
  { language: 'golfscript',   version: '1.0.0',    aliases: ['golfscript'] },
  { language: 'groovy',       version: '3.0.7',    aliases: ['groovy', 'gvy'] },
  { language: 'haskell',      version: '9.0.1',    aliases: ['haskell', 'hs'] },
  { language: 'husk',         version: '1.0.0',    aliases: [] },
  { language: 'iverilog',     version: '11.0.0',   aliases: ['verilog', 'vvp'] },
  { language: 'japt',         version: '2.0.0',    aliases: ['japt'] },
  { language: 'java',         version: '15.0.2',   aliases: [] },
  { language: 'jelly',        version: '0.1.31',   aliases: [] },
  { language: 'julia',        version: '1.8.5',    aliases: ['jl'] },
  { language: 'kotlin',       version: '1.8.20',   aliases: ['kt'] },
  { language: 'lisp',         version: '2.1.2',    aliases: ['lisp','cl','sbcl','commonlisp'] },
  { language: 'llvm_ir',      version: '12.0.1',   aliases: ['llvm','llvm-ir','ll'] },
  { language: 'lolcode',      version: '0.11.2',   aliases: ['lol', 'lci'] },
  { language: 'lua',          version: '5.4.4',    aliases: [] },
  { language: 'csharp',       version: '6.12.0',   aliases: ['mono','mono-csharp','mono-c#','mono-cs','c#','cs'], runtime: 'mono' },
  { language: 'basic',        version: '6.12.0',   aliases: ['vb','mono-vb','mono-basic','visual-basic','visual basic'], runtime: 'mono' },
  { language: 'nasm',         version: '2.15.5',   aliases: ['asm', 'nasm32'],    runtime: 'nasm' },
  { language: 'nasm64',       version: '2.15.5',   aliases: ['asm64'],            runtime: 'nasm' },
  { language: 'nim',          version: '1.6.2',    aliases: [] },
  { language: 'javascript',   version: '18.15.0',  aliases: ['node-javascript','node-js','node.js','javascript','js'], runtime: 'node' },
  { language: 'ocaml',        version: '4.12.0',   aliases: ['ocaml', 'ml'] },
  { language: 'octave',       version: '8.1.0',    aliases: ['matlab', 'm'] },
  { language: 'osabie',       version: '1.0.1',    aliases: ['osabie','05AB1E','usable'] },
  { language: 'paradoc',      version: '0.6.0',    aliases: ['paradoc'] },
  { language: 'pascal',       version: '3.2.2',    aliases: ['freepascal','pp','pas'] },
  { language: 'perl',         version: '5.36.0',   aliases: ['pl'] },
  { language: 'php',          version: '8.2.3',    aliases: [] },
  { language: 'ponylang',     version: '0.39.0',   aliases: ['pony', 'ponyc'] },
  { language: 'prolog',       version: '8.2.4',    aliases: ['prolog', 'plg'] },
  { language: 'pure',         version: '0.68.0',   aliases: [] },
  { language: 'powershell',   version: '7.1.4',    aliases: ['ps','pwsh','ps1'],  runtime: 'pwsh' },
  { language: 'pyth',         version: '1.0.0',    aliases: ['pyth'] },
  { language: 'python2',      version: '2.7.18',   aliases: ['py2', 'python2'] },
  { language: 'python',       version: '3.10.0',   aliases: ['py','py3','python3','python3.10'] },
  { language: 'racket',       version: '8.3.0',    aliases: ['rkt'] },
  { language: 'raku',         version: '6.100.0',  aliases: ['raku','rakudo','perl6','p6','pl6'] },
  { language: 'retina',       version: '1.2.0',    aliases: ['ret'] },
  { language: 'rockstar',     version: '1.0.0',    aliases: ['rock', 'rocky'] },
  { language: 'rscript',      version: '4.1.1',    aliases: ['r'] },
  { language: 'ruby',         version: '3.0.1',    aliases: ['ruby3', 'rb'] },
  { language: 'rust',         version: '1.68.2',   aliases: ['rs'] },
  { language: 'samarium',     version: '0.3.1',    aliases: ['sm'] },
  { language: 'scala',        version: '3.2.2',    aliases: ['sc'] },
  { language: 'smalltalk',    version: '3.2.3',    aliases: ['st'] },
  { language: 'sqlite3',      version: '3.36.0',   aliases: ['sqlite', 'sql'] },
  { language: 'swift',        version: '5.3.3',    aliases: ['swift'] },
  { language: 'typescript',   version: '5.0.3',    aliases: ['ts','node-ts','tsc','typescript5','ts5'] },
  { language: 'vlang',        version: '0.3.3',    aliases: ['v'] },
  { language: 'vyxal',        version: '2.4.1',    aliases: [] },
  { language: 'yeethon',      version: '3.10.0',   aliases: ['yeethon3'] },
  { language: 'zig',          version: '0.9.1',    aliases: ['zig'] },
];

/**
 * Resolve a language name or alias to its registry entry.
 * @param {string} input
 * @returns {LangEntry | undefined}
 */
function resolveLang(input) {
  const key = input.toLowerCase();
  return PISTON_LANGUAGES.find(e => e.language === key || e.aliases.includes(key));
}

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

/**
 * Create an element with optional properties and children.
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tag
 * @param {Partial<HTMLElementTagNameMap[K]> & { class?: string, dataset?: Record<string,string> }} [props]
 * @param {...(Node|string)} children
 * @returns {HTMLElementTagNameMap[K]}
 */
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  const { class: cls, dataset, style: styleObj, ...rest } = props;
  if (cls) node.className = cls;
  if (dataset) Object.assign(node.dataset, dataset);
  if (styleObj) Object.assign(node.style, styleObj);
  for (const [k, v] of Object.entries(rest)) {
    if (v !== undefined) node[k] = v;
  }
  for (const child of children) {
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

/**
 * Sanitise curly-quote / dash artefacts from rich-text paste.
 * @param {string} s
 * @returns {string}
 */
function sanitise(s) {
  return s
    .replaceAll('\u2013', '--')
    .replaceAll('\u2014', '--')
    .replaceAll('\u2018', "'")
    .replaceAll('\u2019', "'")
    .replaceAll('\u201C', '"')
    .replaceAll('\u201D', '"');
}

// ---------------------------------------------------------------------------
// Styles (injected once into the document)
// ---------------------------------------------------------------------------

const STYLES =  stylesheet;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const sheet = el('style');
  sheet.textContent = STYLES;
  document.head.appendChild(sheet);
}

// ---------------------------------------------------------------------------
// Colour mode
// ---------------------------------------------------------------------------

/** @returns {'light'|'dark'} */
function colourMode() {
  return window.CodeRunner_LightOrDarkMode === 'dark' ? 'dark' : 'light';
}

const COLOUR_TOKENS = {
  light: {
    '--code': 'black', '--code-bg': 'white',
    '--border': 'rgb(201,201,201)', '--text': 'black',
    '--title': 'black', '--button-text': 'black',
    '--button-border': 'rgba(0,0,0,0.18)', '--bg': '#edebeb',
  },
  dark: {
    '--code': 'white', '--code-bg': 'rgba(39,40,35,1)',
    '--border': 'rgba(0,0,0,0.3)', '--text': 'white',
    '--title': 'white', '--button-text': 'wheat',
    '--button-border': 'rgba(0,0,0,0.18)', '--bg': '#3a3636',
  },
};

const OUTPUT_BG = {
  error: { light: '#eb9898', dark: '#753131' },
  ok:    { light: '#edebeb', dark: '#3a3636' },
};

/** @param {HTMLElement} wrap  @param {'light'|'dark'} mode */
function applyColourTokens(wrap, mode) {
  for (const [k, v] of Object.entries(COLOUR_TOKENS[mode])) {
    wrap.style.setProperty(k, v);
  }
}

// ---------------------------------------------------------------------------
// Ace theme
// ---------------------------------------------------------------------------

const ACE_THEME = {
  light: 'ace/theme/tomorrow',
  dark:  'ace/theme/monokai',
};

function resolveAceTheme() {
  const custom = window.CodeRunner_AceEditor_Theme?.toLowerCase();
  if (custom) return `ace/theme/${custom}`;
  return ACE_THEME[colourMode()];
}

// ---------------------------------------------------------------------------
// Icon URLs
// ---------------------------------------------------------------------------

const ICON_PLAY = 'https://lyricat.github.io/code-knack/demo/lib/code-knack/images/icon-play-dark.svg';
const ICON_COPY = 'https://lyricat.github.io/code-knack/demo/lib/code-knack/images/icon-copy-dark.svg';

// ---------------------------------------------------------------------------
// Sub-components (pure DOM builders, no innerHTML)
// ---------------------------------------------------------------------------

/** @returns {{ root: HTMLElement, mask: HTMLElement }} */
function buildPane(langLabel) {
  const title = el('div', { class: 'ck-title' }, langLabel);

  const mask = el('div', { class: 'ck-mask' }, 'Copied to the clipboard.');

  const runBtn = el('button', { class: 'ck-button', dataset: { action: 'run' }, type: 'button' },
    el('img', { src: ICON_PLAY, alt: '' }),
    el('span', {}, 'run'),
  );
  const copyBtn = el('button', { class: 'ck-button', dataset: { action: 'copy' }, type: 'button' },
    el('img', { src: ICON_COPY, alt: '' }),
    el('span', {}, 'copy'),
  );
  const ctrl = el('div', { class: 'ck-ctrl' }, runBtn, copyBtn);

  const root = el('div', { class: 'ck-pane' }, title, mask, ctrl);
  return { root, mask };
}

/** @returns {{ root: HTMLElement, textarea: HTMLTextAreaElement }} */
function buildInputPane(initialValue) {
  const label    = el('div', { class: 'ck-pane-label' }, 'Input');
  const textarea = el('textarea', { class: 'ck-input-area', rows: 10, spellcheck: false });
  textarea.value = initialValue;
  const root = el('div', { class: 'ck-input-pane' }, label, textarea);
  return { root, textarea };
}

/** @returns {{ root: HTMLElement, label: HTMLElement, content: HTMLElement }} */
function buildOutputPane() {
  const label   = el('div', { class: 'ck-pane-label' }, 'Output');
  const content = el('pre', { class: 'ck-output-content' });
  const root    = el('div', { class: 'ck-output-pane' }, label, content);
  return { root, label, content };
}

/** @returns {{ root: HTMLElement, editorTarget: HTMLDivElement }} */
function buildEditorPane() {
  const editorTarget = el('div', { class: 'ck-editor' });
  return { root: editorTarget, editorTarget };
}

// ---------------------------------------------------------------------------
// Web Component
// ---------------------------------------------------------------------------

export class CodeRunner extends HTMLElement {
  /** @type {import("https://esm.sh/ace-builds").Ace.Editor | null} */
  #ace = null;
  /** @type {HTMLTextAreaElement} */
  #inputArea;
  /** @type {HTMLElement} */
  #outputLabel;
  /** @type {HTMLElement} */
  #outputContent;
  /** @type {HTMLElement} */
  #outputPane;
  /** @type {HTMLElement} */
  #mask;
  /** @type {number | null} */
  #maskTimer = null;

  connectedCallback() {
    injectStyles();

    const lang = this.getAttribute('language');

    if (!lang) {
      this.#renderError('Error: the <code>language</code> attribute is required.');
      return;
    }

    const entry = resolveLang(lang);
    if (!entry) {
      this.#renderError(`Error: "${lang}" is not a supported language.`);
      return;
    }

    // Capture source before we clear the element.
    const initialCode  = sanitise(this.textContent?.trim() ?? '');
    const initialInput = this.getAttribute('input') ?? '';
    const exampleOut   = this.getAttribute('output') ?? null;
    const highlightLines = (this.getAttribute('highlight-lines') ?? '')
      .split(' ').filter(Boolean).map(Number);

    this.spellcheck = false;
    // Clear declarative slot content — we're taking over from here.
    this.textContent = '';

    // Build DOM.
    const { root: pane, mask } = buildPane(lang);
    const { root: editorRoot, editorTarget } = buildEditorPane();
    const { root: inputRoot, textarea } = buildInputPane(initialInput);
    const { root: outputRoot, label: outLabel, content: outContent } = buildOutputPane();

    this.#mask          = mask;
    this.#inputArea     = textarea;
    this.#outputLabel   = outLabel;
    this.#outputContent = outContent;
    this.#outputPane    = outputRoot;

    const ioRow = el('div', { class: 'ck-io' }, inputRoot, outputRoot);
    const wrap  = el('div', { class: 'ck-wrap' }, pane, editorRoot, ioRow);

    applyColourTokens(wrap, colourMode());

    if (exampleOut !== null) {
      outLabel.textContent   = 'Output (example input)';
      outContent.textContent = exampleOut;
      outContent.style.opacity = '0.5';
    }

    this.appendChild(wrap);

    // Event delegation on the toolbar.
    pane.addEventListener('click', e => {
      const btn = /** @type {HTMLElement} */ (e.target)?.closest('[data-action]');
      if (btn?.dataset.action === 'run')  this.#run(entry);
      if (btn?.dataset.action === 'copy') this.#copy();
    });

    // Boot Ace.
    this.#initAce(editorTarget, initialCode, entry.language, highlightLines);
  }

  disconnectedCallback() {
    this.#ace?.destroy();
    this.#ace = null;
    if (this.#maskTimer !== null) clearTimeout(this.#maskTimer);
  }

  // -------------------------------------------------------------------------
  // Ace Editor
  // -------------------------------------------------------------------------

  /** @param {HTMLElement} target  @param {string} initialCode  @param {string} language  @param {number[]} highlightLines */
  #initAce(target, initialCode, language, highlightLines) {
    const editor = ace.edit(target);
    editor.$blockScrolling = Infinity;
    editor.setTheme(resolveAceTheme());
    editor.setShowPrintMargin(false);
    editor.setOptions({ maxLines: Infinity });

    const session = editor.getSession();
    session.setMode('ace/mode/c_cpp');
    session.setTabSize(2);
    session.setUseWrapMode(true);

    // setValue is the sole source of truth — do not pre-seed the DOM node,
    // as ace.edit() reads textContent itself and would double-apply it.
    editor.setValue(initialCode, -1);

    for (const line of highlightLines) {
      if (!Number.isNaN(line)) session.highlightLines(line - 1, line - 1);
    }

    this.#ace = editor;
  }

  // -------------------------------------------------------------------------
  // Run
  // -------------------------------------------------------------------------

  /** @param {LangEntry} entry */
  async #run(entry) {
    this.#outputLabel.textContent      = 'Output';
    this.#outputContent.textContent    = 'Loading…';
    this.#outputContent.style.opacity  = '1';
    this.#inputArea.readOnly = true;

    if (!navigator.onLine) {
      this.#outputContent.textContent = 'Error: you must be connected to the internet to run code.';
      return;
    }

    const source = this.#ace?.getValue() ?? this.#inputArea.value;
    const ansiUp = new AnsiUp();

    try {
      const t0  = Date.now();
      const res = await fetch('/.netlify/functions/run-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: entry.language,
          version:  entry.version,
          files:    [{ content: source }],
          stdin:    this.#inputArea.value,
        }),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}: ${res.statusText}`);

      const json = await res.json();
      this.#outputLabel.textContent = `Output (ran in ${Date.now() - t0} ms)`;

      const compileErr = json.compile?.output?.replace(
        /chmod: cannot access 'a\.out': No such file or directory\s*$/gm, ''
      );

      if (compileErr) {
        this.#setOutput(`Error: ${compileErr}`, { isError: true, isHtml: false });
      } else if (json.run?.signal) {
        this.#setOutput(
          `Error: process killed with signal ${json.run.signal}\n\n(Tip: do you have an infinite loop?)`,
          { isError: true, isHtml: false },
        );
      } else if (json.run?.output?.includes('Segmentation fault')) {
        this.#setOutput(
          `Error: ${json.run.output}\n\n(Tip: check for stray pointers, null dereference, double free…)`,
          { isError: true, isHtml: false },
        );
      } else {
        const html = ansiUp.ansi_to_html(json.run.output)
          .replace(/(Enter.*?):/gi, '$1:\n');
        this.#setOutput(html, { isError: false, isHtml: true });
      }
    } catch (err) {
      this.#setOutput(err instanceof Error ? err.message : String(err), { isError: true, isHtml: false });
    }
  }

  /**
   * @param {string} text
   * @param {{ isError: boolean, isHtml: boolean }} opts
   */
  #setOutput(text, { isError, isHtml }) {
    const bg = OUTPUT_BG[isError ? 'error' : 'ok'][colourMode()];
    this.#outputPane.style.setProperty('--bg', bg);
    if (isHtml) {
      this.#outputContent.innerHTML = text;    // only path where innerHTML is used — ANSI→HTML from our own API
    } else {
      this.#outputContent.textContent = text;
    }
  }

  // -------------------------------------------------------------------------
  // Copy
  // -------------------------------------------------------------------------

  async #copy() {
    const source = this.#ace?.getValue()
      ?? this.#inputArea.value;

    try {
      await navigator.clipboard.writeText(source);
    } catch (err) {
      console.warn('[CodeRunner] clipboard write failed:', err);
    }

    this.#mask.classList.add('visible');
    if (this.#maskTimer !== null) clearTimeout(this.#maskTimer);
    this.#maskTimer = window.setTimeout(() => {
      this.#mask.classList.remove('visible');
      this.#maskTimer = null;
    }, 3000);
  }

  // -------------------------------------------------------------------------
  // Error state (pre-mount)
  // -------------------------------------------------------------------------

  /** @param {string} message */
  #renderError(message) {
    const wrap = el('div', { class: 'ck-wrap' },
      el('div', { class: 'ck-pane' },
        el('div', { class: 'ck-title' }, 'Error'),
      ),
      el('pre', { class: 'ck-editor', style: { padding: '12px 20px', color: 'crimson' } }, message),
    );
    this.appendChild(wrap);
  }
}

if (!customElements.get('code-runner')) {
  customElements.define('code-runner', CodeRunner);
}
