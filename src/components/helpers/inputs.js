export const checkInput = (event) => {
  if (event.target.value.length > 0) {
    event.target.classList.add("active-input");
  } else {
    event.target.classList.remove("active-input");
    if (event.target.type === "date" || event.target.type === "time")
      event.target.type = "text";
  }
};
export const changeTypeToDate = (event) => {
  event.target.type = "date";
};
export const changeTypeToTime = (event) => {
  event.target.type = "time";
};
export const expandTextareaByTyping = (event) => {
  if (event.target.tagName.toLowerCase() !== "textarea") return;

  // Reset field height
  event.target.style.height = "inherit";

  // Get the computed styles for the element
  const computed = window.getComputedStyle(event.target);

  // Calculate the height
  const height =
    parseInt(computed.getPropertyValue("border-top-width"), 10) +
    parseInt(computed.getPropertyValue("padding-top"), 10) +
    event.target.scrollHeight +
    parseInt(computed.getPropertyValue("padding-bottom"), 10) +
    parseInt(computed.getPropertyValue("border-bottom-width"), 10);

  event.target.style.height = height + "px";
};
