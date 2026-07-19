import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CollectionProvider } from './context/CollectionContext';
import { CommunityProvider } from './context/CommunityContext';
import Navbar from './components/Navbar/Navbar';
import ToastViewport from './components/Toast/ToastViewport';
import ScrollToTop from './components/ScrollToTop';
import Marketplace from './pages/Marketplace/Marketplace';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import CommunityFeed from './pages/CommunityFeed/CommunityFeed';
import PostDetail from './pages/PostDetail/PostDetail';
import MyCollection from './pages/MyCollection/MyCollection';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      
      <ToastProvider>
        <CollectionProvider>
          <CommunityProvider>
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/marketplace" replace />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/:id" element={<ProductDetail />} />
              <Route path="/community" element={<CommunityFeed />} />
              <Route path="/community/:id" element={<PostDetail />} />
              <Route path="/collection" element={<MyCollection />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastViewport />
          </CommunityProvider>
        </CollectionProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
