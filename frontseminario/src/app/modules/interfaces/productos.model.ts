interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    available_quantity: number;
    status: 'HIDDEN' | 'DELETED' | 'OUT_OF_STOCK' | 'AVAILABLE';
    created_at: string;
    image_url: string;
    supplier_id: number;
  }
  