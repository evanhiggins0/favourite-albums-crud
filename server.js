// server.js
const MongoClient = require('mongodb').MongoClient
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
connectionString = 'mongodb+srv://evan:BXyD2jwSBOE7U8GM@cluster0.usjky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

MongoClient.connect(connectionString, {
	useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('favourite-albums')
    const albumsCollection = db.collection('albums')


    app.set('view engine', 'ejs')
    // use request
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.put('/albums', (req, res) => {
  		albumsCollection.findOneAndUpdate(
  		{ name: 'Evan' },
  		{
  			$set: {
  				name: req.body.name,
  				artist: req.body.artist,
  				album: req.body.album
  			}
  		},
  		{
  			upsert: true
  		}
	)
  		.then(result => {
  			res.json(`Success`)
  		})
  		.catch(error => console.error(error))
})

	// GET request
	app.get('/', (req, res) => {
		db.collection('albums').find().toArray()
		.then(results => {
			res.render('index.ejs', { albums: results })
		})
		.catch(error => console.error(error))

	})	

    	
	// POST request
	app.post('/quotes', (req, res) => {
		albumsCollection.insertOne(req.body)
			.then(result => {
				res.redirect('/')
			})
			.catch(error => console.error(error))
		})
	
	app.delete('/albums', (req, res) => {
      albumsCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No album to delete')
          }
          res.json('Deleted Swifty\'s quote')
        })
        .catch(error => console.error(error))
    })

	// LISTEN


	app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
})

	
  

		





