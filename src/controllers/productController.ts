import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/productService';

export class ProductController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductService.getAllProducts();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await ProductService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) throw new Error('Invalid ID'); // Should handle better but validation helps
            const product = await ProductService.updateProduct(id, req.body);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            await ProductService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
