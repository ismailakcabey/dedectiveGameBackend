import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SaveImageMemoryService {
    async imageSaver(base64Data: string, imageName: string): Promise<string> {
        try {
            imageName = imageName.replace(" ","+")
        } catch (error) {
            
        }
        const base64Image = base64Data.split(';base64,').pop();
        const assetsPath = path.resolve(__dirname, '..', 'assets');
        const date = new Date
        const date2 = date.toISOString();
        const replaceDate = date2.replace(" ","+")
        const imagePath = path.resolve(assetsPath, `${imageName}${replaceDate}.png`);

        if (!fs.existsSync(assetsPath)) {
            fs.mkdirSync(assetsPath);
        }

        return new Promise((resolve, reject) => {
            fs.writeFile(imagePath, base64Image, { encoding: 'base64' }, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(imagePath);
                }
            });
        });
    }
}
