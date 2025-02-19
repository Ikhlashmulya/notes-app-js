import { RENDER_EVENT } from "../util/constants.js";

/**
 * @typedef {{id: string, title: string, body: string, createdAt: string, archived: boolean}} Note
 */
export default class Notes {
  /**
   * @returns {Promise<Note[]>}
   */
  static async getAll() {
    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert(error);
      return [];
    }
  }

  /**
   *
   * @param {{title: string, body: string}} note
   */
  static async insert(note) {
    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const responseJson = await response.json();
      alert(responseJson.message);
    } catch (error) {
      alert(error);
    } finally {
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  }

  /**
   *
   * @param {string} noteId
   */
  static async delete(noteId) {
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
      const responseJson = await response.json();
      alert(responseJson.message);
    } catch (error) {
      alert(error);
    } finally {
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  }
}
