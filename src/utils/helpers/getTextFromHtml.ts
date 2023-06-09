export const getTextFromHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  return doc.body.textContent;
};
