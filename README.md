<div align-item="centre">
  LIVE : https://pawn-shop-rk.netlify.app/
</div>

# Collector's Hub

A Custom **Pawn Shop** for collectors to browse a marketplace, explore a community feed, and manage a personal collection of collectibles (coins, stamps, comics, vinyl, trading cards, etc.)

Built with React, Vite, React Router, and plain JavaScript. No TypeScript, no external UI library — vanilla CSS throughout.

## Features

**Marketplace**
- Browse listings with image, title, category, condition, price, seller, and location
- Search by title, filter by category/condition, sort by price or newest
- View full listing details
- Add an item to your Collection or Wishlist

**Community Feed**
- Browse posts with user info, image, caption, likes, and comments
- Search posts, filter by category
- Like a post, save a post to your Wishlist
- Open a post's full details

**My Collection**
- Three lists: Owned, Wishlist, Selling
- Search, filter, and sort items within each list
- Remove an item or move it to a different list
- Duplicate items are blocked with a message instead of being added twice

**Throughout**
- Loading skeletons while data is "fetched"
- Error states with a retry button (the mock API randomly fails ~5% of the time to make this real)
- Empty states for no data / no search results
- Broken or missing images fall back to a placeholder instead of breaking the layout
- Filters, search, sort, and the active collection tab are kept in the URL, so they survive navigation and refresh
- Fully responsive: mobile, tablet, desktop

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/   reusable UI pieces (ProductCard, PostCard, FilterBar, ItemCard, ...)
  pages/        one folder per route (Marketplace, ProductDetail, CommunityFeed, PostDetail, MyCollection)
  context/      shared state via React Context (CollectionContext, CommunityContext, ToastContext)
  data/         mock product and post data
  hooks/        useDebounce, useLocalStorage
  utils/        mockApi.js (simulated fetch calls), constants.js
```

## Notes

- There's no real backend. `src/utils/mockApi.js` wraps the local mock data in a `Promise` with an artificial delay (and occasional failure) so loading/error states have something real to respond to.
- State is kept simple on purpose: React Context + `localStorage`, no Redux or other state library — the app doesn't need it at this size.
- Authentication is not implemented, per the assignment scope.

---

## LAYOUT :
---

### Main page  
<img width="1738" height="970" alt="Screenshot 2026-07-19 220502" src="https://github.com/user-attachments/assets/1492ba2a-ba73-4a00-b897-6f5c83f07a32" />


---

### Orders : 

<img width="1731" height="957" alt="Screenshot 2026-07-19 220525" src="https://github.com/user-attachments/assets/7d4eaac7-604f-4029-a872-fe23ee31de07" />

---


🪪 License

This project is licensed under the MIT License — feel free to use and modify for research and educational purposes.

---

👨‍💻 Author

## ==>> Rachit Kumar <<==
B.Tech – Computer Science & Engineering (CYBER FORENSICS) 
### Send Mail to callmerachit145@gmail.com 📧
