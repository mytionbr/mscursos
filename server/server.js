import app from './app'
import config from './config/config'
import pool from './database/pool'

pool
    .connect(config.dbDetails)
    .then(()=> {
        console.log('Postgress connected')

        app.listen(config.PORT, ()=>{
            console.log(`Server is running at ${config.PORT}`)
        })
    })
    .catch((err)=>{
        console.log(err.message)
    })

app.get('/', (req,res)=>{
    res.send('APP OK')
})
