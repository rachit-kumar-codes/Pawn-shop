import { Link } from 'react-router-dom';
import { useCommunity } from '../../context/CommunityContext';
import { useCollection } from '../../context/CollectionContext';
import SmartImage from '../SmartImage/SmartImage';
import Badge from '../Badge/Badge';
import './PostCard.css';

export default function PostCard({ post }) {
  const { isLiked, toggleLike } = useCommunity();
  const { addToCollection, isInCollection } = useCollection();

  const liked = isLiked(post.id);
  const saved = isInCollection(post.id, 'wishlist');
  const displayedLikes = post.likes + (liked ? 1 : 0);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(post.id);
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCollection(
      {
        sourceId: post.id,
        sourceType: 'post',
        title: post.caption.slice(0, 60),
        category: post.category,
        image: post.image,
        estimatedValue: Math.round(500 + (post.likes % 50) * 120),
      },
      'wishlist',
    );
  };

  return (
    <Link to={`/community/${post.id}`} className="card post-card">
      <div className="post-card__image">
        <SmartImage src={post.image} alt={post.caption} />
      </div>
      <div className="post-card__body">
        <div className="post-card__user">
          <SmartImage src={post.user.avatar} alt={post.user.name} className="post-card__avatar" />
          <div>
            <p className="post-card__name">{post.user.name}</p>
            <Badge tone="teal">{post.category}</Badge>
          </div>
        </div>
        <p className="post-card__caption">{post.caption}</p>
        <div className="post-card__footer">
          <button
            className={`post-card__stat ${liked ? 'is-active' : ''}`}
            onClick={handleLike}
            aria-pressed={liked}
          >
            {liked ? '♥' : '♡'} {displayedLikes}
          </button>
          <span className="post-card__stat post-card__stat--static">💬 {post.comments}</span>
          <button
            className={`btn btn-outline btn-sm post-card__save ${saved ? 'is-active' : ''}`}
            onClick={handleSave}
          >
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </Link>
  );
}
