const path = require('node:path')
const fs = require('node:fs')

const filePath = path.join(__dirname, 'folder')
fs.mkdir(filePath,(err) =>{

})


for (let i = 1; i <= 5; i++) {
    const filePath = path.join(__dirname, 'folder', `text${i}.txt` )
    fs.writeFile(filePath, '' ,(err)=>{

    })
}

for (let i = 1; i <= 5; i++) {
    const filePath = path.join(__dirname, 'folder', `file${i}.txt` )
    fs.mkdir(filePath,(err) =>{

    })
}

fs.readdir(filePath, (err, files) =>{
    files.forEach((file) => {

        const fullPath = path.join(filePath, file);

        fs.lstat(fullPath, (err,stats)=>{
            const name = path.basename(fullPath);
            if (stats.isFile()) {
                console.log(`FILE: ${name} `)
            } else {
                console.log(`FOLDER: ${name}`)
            }
        })
    });
})
