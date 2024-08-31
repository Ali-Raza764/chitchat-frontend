export function createConsistentChatId(id1, id2) {
  return [id1, id2]
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    )
    .join("_");
}
