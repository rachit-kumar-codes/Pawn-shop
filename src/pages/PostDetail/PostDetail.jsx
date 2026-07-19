import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPostById } from '../../utils/mockApi';
import { useCommunity } from '../../context/CommunityContext';
import { useCollection } from '../../context/CollectionContext';
import SmartImage from '../../components/SmartImage/SmartImage';
import Badge from '../../components/Badge/Badge';
import { Spinner } from '../../components/Loader/Loader';
import ErrorState from '../../components/ErrorState/ErrorState';
import './PostDetail.css';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState('loading');
  const { isLiked, toggleLike } = useCommunity();
  const { addToCollection, isInCollection } = useCollection();

  const load = () => {
    if (!id) return;
    setStatus('loading');
    fetchPostById(id)
      .then((data) => {
        if (!data) {
          setStatus('not-found');
          return;
        }
        setPost(data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(load, [id]);

  if (status === 'loading') {
    return (
      <div className="page container">
        <Spinner label="Loading post" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="page container">
        <ErrorState message="We couldn't load this post." onRetry={load} />
      </div>
    );
  }

  if (status === 'not-found' || !post) {
    return (
      <div className="page container">
        <ErrorState message="This post no longer exists or the link is incorrect." />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/community" className="btn btn-outline btn-sm">
            Back to community
          </Link>
        </div>
      </div>
    );
  }

  const liked = isLiked(post.id);
  const saved = isInCollection(post.id, 'wishlist');
  const displayedLikes = post.likes + (liked ? 1 : 0);

  return (
    <div className="page container">
      <Link to="/community" className="detail-back">
        &larr; Back to community
      </Link>

      <div className="post-detail">
        <div className="post-detail__image">
          <SmartImage src={post.image} alt={post.caption} />
        </div>

        <div className="post-detail__info">
          <div className="post-detail__user">
            <SmartImage src={post.user.avatar} alt={post.user.name} className="post-detail__avatar" />
            <div>
              <p className="post-detail__name">{post.user.name}</p>
              <p className="post-detail__date">{formatDate(post.createdAt)}</p>
            </div>
          </div>

          <Badge tone="teal">{post.category}</Badge>
          <p className="post-detail__caption">{post.caption}</p>

          <div className="post-detail__stats">
            <span>💬 {post.comments} comments</span>
            <span>{displayedLikes} likes</span>
          </div>

          <div className="post-detail__actions">
            <button
              className={`btn btn-outline btn-block ${liked ? 'is-active' : ''}`}
              onClick={() => toggleLike(post.id)}
            >
              {liked ? '♥ Liked' : '♡ Like this post'}
            </button>
            <button
              className={`btn btn-primary btn-block ${saved ? 'is-active' : ''}`}
              disabled={saved}
              onClick={() =>
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
                )
              }
            >
              {saved ? 'Saved to wishlist' : 'Save to wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
