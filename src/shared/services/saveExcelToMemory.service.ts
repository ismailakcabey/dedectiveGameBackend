import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as PATH from 'path'
import * as fs from 'fs';

@Injectable()
export class SaveExcelMemoryService {

    constructor(
    ){}

    async excelExport(data:any,fileName:string){

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'fileName');
        const currentDate = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
        const filePath = PATH.join('assets', `${fileName}${currentDate}.xlsx`);
    
        if (!fs.existsSync('assets')) {
            fs.mkdirSync('assets');
        }
    
        XLSX.writeFile(wb, filePath);
        return filePath;
    }

}