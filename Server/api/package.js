const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer')
const db = require('../config/connectDb')

router.get('/get', (req, res) => {
  
  const categories = ['web', 'ecommerce', 'video', 'seo', 'combo'];
  const categoryQueries = categories.map(category => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM fb_content WHERE catogery = ?`;
      db.query(sqlQuery, [category], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ [category]: result });
        }
      });
    });
  });

  Promise.all(categoryQueries)
    .then(results => {
      const responseData = results.reduce((acc, result) => ({ ...acc, ...result }), {});
      res.json(responseData);
    })
    .catch(error => {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// Create multer upload instance
const upload = multer({ storage: storage });

router.post('/Forms', upload.single('image'), (req, res) => {

  const { Name, email, Phonenumber, Buisnessname, websiteURL, description } = req.body;
  const image = req.file ? req.file.path : null
  // console.log(image);
  // return
  const insertQuery = `
    INSERT INTO form_data(name, email, phone, buisnessName, websiteURL, description,image) 
    VALUES (?, ?, ?, ?, ?, ?,?)
`;

  db.query(insertQuery, [Name, email, Phonenumber, Buisnessname, websiteURL, description,image], (err, result) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(200).send(err.message);
    } else {
      console.log('Data inserted into database successfully:', result);
      res.send('Form submitted successfully!');
    }
  });

  router.post('/login', (req,res,next)=>{
    const { email, password } = req.body
    user.find({email: email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(200).json({
                success: false,
                message: "User Not Found."
            })
        }
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result)
            {
                var userUrl = req.protocol + '://' + req.get('host') + '/user/';
                const token = jwt.sign({
                    id:user[0]._id,
                    name:user[0].name,
                    email:user[0].email,
                },
                "bafhsd7asu45TX0dbsa8dy98wsdj98",{
                    // expiresIn:"24h"
                    expiresIn: "365d"
                })
                res.status(200).json({
                    success:true,
                    path: userUrl,
                    data: {
                        id:user[0]._id,
                        name:user[0].name,
                        email:user[0].email,
                        token:token
                    },
                });
            }
            else{
                return res.status(200).json({
                    success: false,
                    message:"Password Doesn't Match."
                })
            }
        })
    })
    .catch(err=>{
        res.status(200).json({
            success:false,
            message: err.message
        })
    })
})

});





module.exports = router;