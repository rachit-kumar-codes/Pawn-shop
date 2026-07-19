import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';


const CommunityContext = createContext(null);

export function CommunityProvider({ children }) {
  const [likedIds, setLikedIds] = useLocalStorage('collectors-hub:liked-posts', []);

  const isLiked = (postId) => likedIds.includes(postId);

  const toggleLike = (postId) => {
    setLikedIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId],
    );
  };

  return (
    <CommunityContext.Provider value={{ likedIds, toggleLike, isLiked }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error('useCommunity must be used within CommunityProvider');
  return ctx;
}
