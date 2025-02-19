export default class Utils {
  /**
   * @param {HTMLElement} element 
   */
  static showLoading(element) {
    element.style.display = "flex";
  }

  /**
   * @param {HTMLElement} element 
   */
  static hideLoading(element) {
    element.style.display = "none";
  }
}