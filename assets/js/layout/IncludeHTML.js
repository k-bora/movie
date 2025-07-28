export const IncludeHTML = async (selector, url) => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  } catch (err) {
    console.error(`IncludeHTML 오류: ${selector}`, err);
  }
};