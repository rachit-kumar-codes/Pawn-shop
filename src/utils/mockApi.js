import { products } from '../data/products';
import { posts } from '../data/posts';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


async function simulateFetch(payload, failRate = 0.06) {
  await delay(500 + Math.random() * 500);
  if (Math.random() < failRate) {
    throw new Error('Network request failed');
  }
  return payload;
}

export function fetchProducts() {
  return simulateFetch(products);
}

export function fetchPosts() {
  return simulateFetch(posts);
}

export function fetchProductById(id) {
  return simulateFetch(
    products.find((p) => p.id === id),
    0.03,
  );
}

export function fetchPostById(id) {
  return simulateFetch(
    posts.find((p) => p.id === id),
    0.03,
  );
}
