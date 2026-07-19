import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CollectionContext = createContext(null);

const LABELS = {
  owned: 'Owned',
  wishlist: 'Wishlist',
  selling: 'Selling',
};

export function CollectionProvider({ children }) {
  const [items, setItems] = useLocalStorage('collectors-hub:collection', []);
  const { showToast } = useToast();


  const isInCollection = (sourceId, collection) =>
    items.some((item) => item.sourceId === sourceId && item.collection === collection);

  
  const addToCollection = (payload, collection) => {
    if (isInCollection(payload.sourceId, collection)) {
      showToast(`Already in your ${LABELS[collection]} collection`, 'info');
      return;
    }
    const newItem = {
      collectionId: `${payload.sourceId}-${collection}-${Date.now()}`,
      sourceId: payload.sourceId,
      sourceType: payload.sourceType,
      title: payload.title,
      category: payload.category,
      image: payload.image,
      dateAdded: new Date().toISOString(),
      estimatedValue: payload.estimatedValue,
      collection,
    };
    setItems((prev) => [newItem, ...prev]);
    showToast(`Added to ${LABELS[collection]}`, 'success');
  };

  const removeItem = (collectionId) => {
    setItems((prev) => prev.filter((item) => item.collectionId !== collectionId));
    showToast('Removed from collection', 'info');
  };

  const moveItem = (collectionId, target) => {
    setItems((prev) => {
      const current = prev.find((item) => item.collectionId === collectionId);
      if (!current) return prev;
      if (current.collection === target) {
        showToast(`Already in ${LABELS[target]}`, 'info');
        return prev;
      }
      const duplicate = prev.some(
        (item) => item.sourceId === current.sourceId && item.collection === target,
      );
      if (duplicate) {
        showToast(`This item already exists in ${LABELS[target]}`, 'error');
        return prev;
      }
      showToast(`Moved to ${LABELS[target]}`, 'success');
      return prev.map((item) =>
        item.collectionId === collectionId ? { ...item, collection: target } : item,
      );
    });
  };

  const countFor = (collection) => items.filter((item) => item.collection === collection).length;

  const value = useMemo(
    () => ({ items, addToCollection, removeItem, moveItem, isInCollection, countFor }),
    [items],
  );

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection() {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error('useCollection must be used within CollectionProvider');
  return ctx;
}
