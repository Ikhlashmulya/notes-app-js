import Notes from "../data/note.js";
import { RENDER_EVENT } from "../util/constants.js";
import Utils from "../util/utils.js";

class NoteList extends HTMLElement {
  /** @type {ShadowRoot} */
  _shadowRoot = null;

  /** @type {HTMLStyleElement} */
  _style = null;

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
        overflow: hidden;
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

    document.addEventListener(RENDER_EVENT, () => {
      this.render();
    });
  }

  /**
   *
   * @param {import("../data/note.js").Note[]} notes
   */
  _renderNotes(notes) {
    const noteCards = notes.map((note) => {
      /** @type {NoteCard} */
      const noteCardElement = document.createElement("note-card");
      noteCardElement.setNote(note);
      return noteCardElement;
    });

    this._shadowRoot.append(...noteCards);
  }

  async render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);

    Utils.showLoading(document.querySelector("#loading"));

    const notes = await Notes.getAll();
    this._renderNotes(notes);

    Utils.hideLoading(document.querySelector("#loading"));
  }
}

customElements.define("note-list", NoteList);
