import { getFaceData } from "./getFaceData.js";

export const getPersonData = async (person) => {
  try {
    const details = person.querySelector(".memberMainDetails");

    // Get id
    const id = person.getAttribute("data-item-id");

    // Get name
    const name = details.querySelector(".name").innerText;

    // Get image
    const image = person.querySelector(".gridImg").getAttribute("style");
    const imageUrl = image.match(/https[^']*/)[0];
    const faceData = await getFaceData(imageUrl);

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
      image: {
        url: imageUrl,
        faceData,
      },
      role,
      quote,
    };
  } catch {
    // Exclude person if html does not match expectations for some reason
    return undefined;
  }
};
