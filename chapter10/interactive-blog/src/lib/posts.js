import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.txt$/, '')
            }
        };
    });
}

export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.txt`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Split the file contents by line breaks
    const lines = fileContents.split('\n');

    // The first line is the title, the rest is the content
    const title = lines[0];
    const content = lines.slice(1).join('\n').trim();

    return {
        id,
        title,
        content
    };
}
