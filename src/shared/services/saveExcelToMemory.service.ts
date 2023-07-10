import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as PATH from 'path'
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class SaveExcelMemoryService {

    constructor(
    ){}

    async excelExport(data:any,fileName:string){
        const assetsPath = path.resolve(__dirname, '..', 'assets');
        const date = new Date
        const date2 = date.toISOString();
        const replaceDate = date2.replace(" ","+")
        const excelPatch = path.resolve(assetsPath, `${fileName}${replaceDate}.xlsx`);
        if (!fs.existsSync(assetsPath)) {
            fs.mkdirSync(assetsPath);
        }
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'fileName');
        if (!fs.existsSync('assets')) {
            fs.mkdirSync('assets');
        }
        XLSX.writeFile(wb, excelPatch);
        return excelPatch;
    }

}