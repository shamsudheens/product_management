import { ProductRepository } from '../repositories/productRepository';

export class ReportService {
    static async getReports(): Promise<{ totalProducts: number; totalQuantity: number; totalValue: number }> {
        const [totalProducts, totalQuantity, totalValue] = await Promise.all([
            ProductRepository.getTotalCount(),
            ProductRepository.getTotalQuantity(),
            ProductRepository.getTotalValue()
        ]);

        return {
            totalProducts,
            totalQuantity,
            totalValue
        };
    }
}
