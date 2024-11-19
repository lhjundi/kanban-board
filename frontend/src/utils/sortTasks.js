export const extractNumber = (text) => {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0]) : null;
};

export const sortTasks = (tasks) => {
  return [...tasks].sort((a, b) => {
    const textA = a.text.toLowerCase();
    const textB = b.text.toLowerCase();

    const numA = extractNumber(textA);
    const numB = extractNumber(textB);

    if (numA !== null && numB !== null) {
      if (numA !== numB) {
        return numA - numB;
      }
    }
    return textA.localeCompare(textB, "pt-BR");
  });
};
