import app from './app.js'
import config from './config/config.js'
import pool from './database/pool.js'


pool
    .connect(config.DATABASE_URL)
    .then(()=> {
        console.log('Postgress connected')

        app.listen(config.PORT, ()=>{
            console.log(`Server is running at ${config.PORT}`)
        })
    })
    .catch((err)=>{
        console.log(`Error: ${err.message}`)
    })

// app.get('/', (req,res)=>{
//     res.send('APP OK')
// })
