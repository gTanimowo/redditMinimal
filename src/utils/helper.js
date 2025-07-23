import avatar from "../assets/avatar.png";

export function getValidThumbnail(post) {
  const thumb = post.data.thumbnail;
  if (
    thumb &&
    thumb.startsWith("http") &&
    !thumb.includes("external-preview")
  ) {
    return thumb;
  }
  return avatar;
}



// Round rating to Reddit style (1.2K, 2.5M, etc.)
export function roundRating(rating) {
  if (rating < 1000) {
    return rating;
  } else if (rating < 10000) {
    return (rating / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (rating < 1000000) {
    return Math.floor(rating / 1000) + "K";
  } else {
    return (rating / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
}

