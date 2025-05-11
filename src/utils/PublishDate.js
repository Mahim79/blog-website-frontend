
export const publishDate = (time)=>{
    const createdAt = new Date(time);
    const now = new Date();

    const diffMs = now - createdAt; // difference in milliseconds

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let publishedAgo;

    if (days > 0) {
        publishedAgo = `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        publishedAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        publishedAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        publishedAgo = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
      }

    return publishedAgo
}