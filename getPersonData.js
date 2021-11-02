export const getPersonData = (person) => {
  try {
    const details = person.querySelector(".memberMainDetails");

    // Get id
    const id = person.getAttribute("data-item-id");

    // Get name
    const name = details.querySelector(".name").innerText;

    // Get image
    const image = person.querySelector(".gridImg").getAttribute("style");
    // TODO: Get image url from style string
    // TODO: Get image face data

    // Get role
    const role = details.querySelector(".role").innerText;

    // Get quote
    let quote;
    const contentBlocks = person.querySelectorAll(".contentBlock");
    for (const contentBlock of contentBlocks) {
      const title = contentBlock.querySelector("h4")?.innerText;
      if (title === "A quote I like") {
        quote = contentBlock
          .querySelector(".blockContent")
          ?.querySelector("p")?.innerHTML;
      }
    }

    return {
      id,
      name,
      image,
      role,
      quote,
    };
  } catch {
    // Exclude person if html does not match expectations for some reason
    return undefined;
  }
};
