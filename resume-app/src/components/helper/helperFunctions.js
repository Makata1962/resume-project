export const convertToFile = (url, name = "profile") => {
    return fetch(url)
      .then((res) => res.blob())
      .then((blob) => new File([blob], name, { type: "image/jpeg" }));
  };
