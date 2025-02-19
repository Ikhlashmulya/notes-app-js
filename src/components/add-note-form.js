import Notes from "../data/note.js";
import { RENDER_EVENT } from "../util/constants.js";

class AddNoteForm extends HTMLElement {
  /** @type {ShadowRoot} */
  _shadowRoot = null;

  /** @type {HTMLStyleElement} */
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      :host form {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      :host form label {
        font-size: larger;
      }

      :host form input {
        width: 100%;
        padding: 10px 10px;
        margin: 8px 0;
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid black;
      }

      :host form textarea {
        resize: vertical;
        height: 100px;
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid black;
        padding: 10px;
      }

      :host form button {
        background-color: #405cf5;
        border: 1px solid #5f5f5f;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();

    const form = this._shadowRoot.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = this._shadowRoot.getElementById("title").value;
      const body = this._shadowRoot.getElementById("body").value;

      Notes.insert({ title, body });
    });
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <form>
        <label for="title">Judul</label>
        <input type="text" name="title" id="title" required>
        <label for="body">Isi</label>
        <textarea name="body" id="body"></textarea>
        <button type="submit">Simpan</button>
      </form>
    `;
  }
}

customElements.define("add-note-form", AddNoteForm);
