const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mongoDB = require('./config/mongoose')
const fs = require('fs');
const csv = require('csv-parser');

const fileModel = require('./models/fileModel');
const { error } = require('console');

//Middleware
app.use(express.static('./assets'));
app.use(express.urlencoded());
// app.use('/uploads', express.static(__dirname + '/uploads'))

app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname,'views'));


app.get('/', async function(req, res){
    const allFiles = await fileModel.find();
        // console.log(allFile);
    return res.render('index', { files: allFiles });
});

app.post('/uploadsCSV', function(req, res){
    
    fileModel.uploadAvatar(req, res, async function(error){
        if(error){
            console.log('Error in uploading file', error);
        }
        if(req.file){
            
            // fs.readFile(path.join(__dirname,fileModel.avatarPath + '/' + req.file.filename), 'utf8', (err, data) => {
            //     if (err) {
            //         console.error('Error reading the file:', err);
            //         return;
            //     }
            //     console.log('File content:', data);
            // });

            // This is saving the path in DB model
            const files = fileModel.create({fileName: req.file.originalname ,filePath : fileModel.avatarPath + '/' + req.file.filename});
        }
        return res.redirect('/');
    })
});


app.get('/viewCSV/:id', async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);
        if (!file) {
            return res.status(404).send('File not found');
        }

        const results = [];
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        fs.createReadStream(path.join(__dirname, file.filePath))
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                const paginatedResults = results.slice(startIndex, endIndex);
                const totalPages = Math.ceil(results.length / limit);

                res.render('viewCSV', {
                    file: file,
                    data: paginatedResults,
                    currentPage: page,
                    totalPages: totalPages,
                    allData : results
                });
            });
    } catch (err) {
        console.error('Error reading the file:', err);
        res.status(500).send('Error reading file');
    }
});



app.post('/deleteCSV',async function(req, res){
    const fileID = req.query.id;
    const file = await fileModel.findById(fileID);
    fs.unlink(path.join(__dirname,file.filePath), function(error){
        if(error){
            console.log('Error in deleting file', error);
        }

        fileModel.findByIdAndDelete(fileID)
        .then(function(deletedFile){
            console.log('File deleted successfully');
            return res.redirect('back');
        })
        .catch(function(err){
            console.error('Error deleting file:', err);
            return;
        })  
        
    })
})


app.listen(port, function(error){
    if(error){
        console.log('Error in stating the server', error);
    }

    console.log('Server is up and running on port', port);
})



