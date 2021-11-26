
export const moveText = (text, targetElement) => {
  console.log("in moveText, targetElement: ", targetElement);
  if (targetElement) {
    let count = 0;
    const intervalId = setInterval(() => {
      if (count === text.length) {
        count = -1;
      }

      count++;
      const newText = text.slice(0, count + 1) + '  ' + text.slice(count + 1, text.length + 1);
      targetElement.textContent = newText;
    }, 100);

    return intervalId;
  }
}