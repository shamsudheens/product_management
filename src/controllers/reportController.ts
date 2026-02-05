import { Request, Response, NextFunction } from 'express';
import { ReportService } from '../services/reportService';

export class ReportController {
    static async getReport(req: Request, res: Response, next: NextFunction) {
        try {
            const report = await ReportService.getReports();
            res.json(report);
        } catch (error) {
            next(error);
        }
    }
}
