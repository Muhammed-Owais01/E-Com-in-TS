import fs from 'fs';
import path from 'path';

const deleteFile = (filePath: string | null): void => {
    if (!filePath) return;

    const fullPath = path.join(__dirname, '../../../uploads', filePath);
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${fullPath}`, err);
        } else {
            console.log(`Deleted file`);
        }
    });
}

export default deleteFile;
