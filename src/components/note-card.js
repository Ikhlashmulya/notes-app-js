import Notes from "../data/note.js";
import { RENDER_EVENT } from "../util/constants.js";

class NoteCard extends HTMLElement {
  /** @type {ShadowRoot} */
  _shadowRoot = null;

  /** @type {HTMLStyleElement} */
  _style = null;

  /** @type {import("../data/note").Note} */
  _note = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  /**
   * @param {import("../data/note").Note} value
   */
  setNote(value) {
    this._note = value;
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        border: 1px solid black;
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

    const deleteBtn = this._shadowRoot.getElementById("deleteBtn");
    deleteBtn.addEventListener("click", () => {
      if (confirm("anda yakin?")) {
        Notes.delete(this._note.id);
      }
    });
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div noteId="${this._note.id}">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <button id="deleteBtn">Hapus</button>
      </div> 
    `;
  }
}

customElements.define("note-card", NoteCard);
