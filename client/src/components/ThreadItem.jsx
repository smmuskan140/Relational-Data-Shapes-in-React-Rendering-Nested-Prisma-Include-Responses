import PropTypes from "prop-types";

export default function ThreadItem({ thread }) {
  const authorName = thread.author?.name ?? "Unknown";
  const avatarUrl = thread.author?.avatarUrl ?? "/placeholder-avatar.svg";
  const replyCount = thread._count?.comments ?? 0;

  return (
    <li className="thread">
      <div className="thread-top">
        <img
          className="avatar"
          src={avatarUrl}
          alt={thread.author?.name ? `${authorName}'s avatar` : "Placeholder avatar"}
          onError={(event) => {
            if (event.currentTarget.src !== new URL("/placeholder-avatar.svg", window.location.origin).href) {
              event.currentTarget.src = "/placeholder-avatar.svg";
            }
          }}
        />

        <div className="thread-main">
          <h3>{thread.title}</h3>
          <p className="meta">by {authorName}</p>
        </div>

        <span className="badge">
          {replyCount} {replyCount === 1 ? "reply" : "replies"}
        </span>
      </div>

      <p>{thread.body}</p>
    </li>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    authorId: PropTypes.number,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
    _count: PropTypes.shape({
      comments: PropTypes.number,
    }),
  }).isRequired,
};
