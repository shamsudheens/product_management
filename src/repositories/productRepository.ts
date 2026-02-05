import pool from '../config/db';
import { Product } from '../types/productType';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class ProductRepository {
    static async findAll(): Promise<Product[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products');
        return rows as Product[];
    }

    static async create(product: Product): Promise<number> {
        const { name, price, quantity } = product;
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
            [name, price, quantity]
        );
        return result.insertId;
    }

    static async update(id: number, product: Partial<Product>): Promise<boolean> {
        const { name, price, quantity } = product;
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
            [name, price, quantity, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    static async getTotalCount(): Promise<number> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM products');
        return rows[0].count;
    }

    static async getTotalQuantity(): Promise<number> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT SUM(quantity) as quantity FROM products');
        return rows[0].quantity || 0;
    }

    static async getTotalValue(): Promise<number> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT SUM(price * quantity) as value FROM products');
        return rows[0].value || 0;
    }
}
