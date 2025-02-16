import { notesData } from "../data/note.js";

class NoteList extends HTMLElement {
  /** @type {ShadowRoot} */
  _shadowRoot = null;

  /** @type {HTMLStyleElement} */
  _style = null;

  /** @type {import("../data/note").Note[]} */
  _notes = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        margin-top: 15px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 5px;
      }
      @media screen and (max-width: 720px) {
        :host {
          grid-template-columns: 1fr;
        }
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  /** @param {import("../data/note").Note[]} */
  setNotes(value) {
    this._notes = value;

    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);

    const noteCards = notesData.map((item) => {
      /** @type {NoteCard} */
      const noteCard = document.createElement("note-card");

      noteCard.setNote(item);

      return noteCard;
    });

    this._shadowRoot.append(this._style, ...noteCards);
  }
}

customElements.define("note-list", NoteList);
