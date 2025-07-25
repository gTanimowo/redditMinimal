import avatar from "../assets/avatar.png";

export function getValidThumbnail(post) {
  let thumb;
  if (post.data.thumbnail) {
    thumb = post.data.thumbnail;
  } else {
    thumb = post.data.icon_img;
  }
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

//convert utc time to show when posted
export function timeAgo(utcSeconds) {
  const now = Date.now();
  const createdTime = utcSeconds * 1000;
  const diffInSeconds = Math.floor((now - createdTime) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4)
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12)
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
}
