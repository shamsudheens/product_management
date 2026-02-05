import { ProductRepository } from '../repositories/productRepository';
import { Product } from '../types/productType';
import { AppError } from '../utils/AppError';

export class ProductService {
    static async getAllProducts(): Promise<Product[]> {
        return ProductRepository.findAll();
    }

    static async createProduct(product: Product): Promise<Product> {
        if (!product.name || !product.price || product.quantity === undefined) {
            throw new AppError('Missing required fields', 400);
        }
        if (product.price < 0 || product.quantity < 0) {
            throw new AppError('Price and quantity must be non-negative', 400);
        }
        const insertId = await ProductRepository.create(product);
        return { ...product, id: insertId };
    }

    static async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
        if (product.price !== undefined && product.price < 0) throw new AppError('Price cannot be negative', 400);
        if (product.quantity !== undefined && product.quantity < 0) throw new AppError('Quantity cannot be negative', 400);

        const success = await ProductRepository.update(id, product);
        if (!success) {
            throw new AppError('Product not found', 404);
        }
        return { ...product, id } as Product; // Ideally fetch again, but returning update data is okay for now
    }

    static async deleteProduct(id: number): Promise<void> {
        const success = await ProductRepository.delete(id);
        if (!success) {
            throw new AppError('Product not found', 404);
        }
    }
}
