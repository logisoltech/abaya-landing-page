import { getAllProducts } from '../../../lib/shopify';

export async function GET() {
  try {
    const products = await getAllProducts();
    return Response.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json(
      { error: 'Failed to fetch products', message: error.message },
      { status: 500 }
    );
  }
}

