export function hasAnnotation(text) {
  return (
    text.annotations.bold ||
    text.annotations.code ||
    text.annotations.color !== "default" ||
    text.annotations.italic ||
    text.annotations.strikethrough ||
    text.annotations.underline
  );
}

export function hasLink(text) {
  return !!text.href;
}

export function getTableOfContent(blocks) {
  const headings = blocks
    .filter(
      (block) =>
        block.type === "heading_1" ||
        block.type === "heading_2" ||
        block.type === "heading_3"
    )
    .map((block) => block?.[block.type]?.text?.[0]?.text?.content);

  return headings;
}
