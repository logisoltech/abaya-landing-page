// Shopify Storefront API utility functions

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !storefrontAccessToken) {
  console.warn('Shopify environment variables are not set');
}

const endpoint = domain ? `https://${domain}/api/2024-01/graphql.json` : null;

async function ShopifyData(query) {
  if (!endpoint || !storefrontAccessToken) {
    throw new Error('Shopify credentials are not configured');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query }),
    cache: 'no-store', // Ensure fresh data on each request
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    console.error('Shopify API Errors:', data.errors);
    throw new Error('Failed to fetch data from Shopify');
  }

  return data.data;
}

// Fetch all products
export async function getAllProducts() {
  const query = `
    {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await ShopifyData(query);
  
  return data.products.edges.map((edge) => {
    const product = edge.node;
    const variant = product.variants.edges[0]?.node;
    const image = product.images.edges[0]?.node;
    
    return {
      id: product.id.split('/').pop(),
      handle: product.handle,
      name: product.title,
      description: product.description,
      price: parseFloat(variant?.price?.amount || product.priceRange.minVariantPrice.amount),
      originalPrice: variant?.compareAtPrice?.amount 
        ? parseFloat(variant.compareAtPrice.amount) 
        : null,
      currency: variant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode,
      image: image?.url || null,
      imageAlt: image?.altText || product.title,
    };
  });
}

// Fetch a single product by handle
export async function getProductByHandle(handle) {
  const query = `
    {
      product(handle: "${handle}") {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await ShopifyData(query);
  
  if (!data.product) {
    return null;
  }

  const product = data.product;
  const variant = product.variants.edges[0]?.node;
  
  return {
    id: product.id.split('/').pop(),
    handle: product.handle,
    name: product.title,
    description: product.description,
    price: parseFloat(variant?.price?.amount || product.priceRange.minVariantPrice.amount),
    originalPrice: variant?.compareAtPrice?.amount 
      ? parseFloat(variant.compareAtPrice.amount) 
      : null,
    currency: variant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode,
    images: product.images.edges.map(edge => ({
      url: edge.node.url,
      altText: edge.node.altText || product.title,
    })),
    variants: product.variants.edges.map(edge => ({
      id: edge.node.id.split('/').pop(),
      title: edge.node.title,
      price: parseFloat(edge.node.price.amount),
      originalPrice: edge.node.compareAtPrice?.amount 
        ? parseFloat(edge.node.compareAtPrice.amount) 
        : null,
    })),
  };
}

