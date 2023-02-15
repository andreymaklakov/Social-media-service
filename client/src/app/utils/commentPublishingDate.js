export const publishedTime = (createdTime) => {
  const dateNow = Date.now();
  const createdDate = new Date(createdTime);

  const commentPostedMSecondsAgo = dateNow - createdDate;

  const mSecsIn1Min = 60000;
  const commentPostedDate = new Date(Number(createdDate));

  const addZeroBefore = (date) => {
    return date.toString().length === 1 ? `0${date}` : date;
  };

  if (commentPostedMSecondsAgo <= mSecsIn1Min) {
    return "1 minute ago";
  } else if (commentPostedMSecondsAgo <= mSecsIn1Min * 5) {
    return "5 minutes ago";
  } else if (commentPostedMSecondsAgo <= mSecsIn1Min * 10) {
    return "10 minutes ago";
  } else if (commentPostedMSecondsAgo <= mSecsIn1Min * 30) {
    return "30 minutes ago";
  } else if (
    commentPostedMSecondsAgo > mSecsIn1Min * 30 &&
    commentPostedMSecondsAgo < mSecsIn1Min * 60 * 24
  ) {
    return `${addZeroBefore(commentPostedDate.getHours())}:${addZeroBefore(
      commentPostedDate.getMinutes()
    )}`;
  } else if (
    commentPostedMSecondsAgo < mSecsIn1Min * 60 * 24 * 365 &&
    commentPostedMSecondsAgo >= mSecsIn1Min * 60 * 24
  ) {
    return `${commentPostedDate.getDate()} ${commentPostedDate.toLocaleString(
      "eng",
      {
        month: "long"
      }
    )}`;
  } else if (commentPostedMSecondsAgo >= mSecsIn1Min * 60 * 24 * 365) {
    return `${commentPostedDate.getDate()} ${commentPostedDate.toLocaleString(
      "eng",
      {
        month: "long"
      }
    )} ${commentPostedDate.getFullYear()}`;
  }
};
