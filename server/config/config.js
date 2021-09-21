import dotenv from 'dotenv'

dotenv.config()

const dbDetails ={
                    host: process.env.LOCAL_HOST,
                    user: process.env.USER,
                    database: process.env.DATABASE,
                    password: process.env.PASSWORD,
                    port: process.env.DATABASE_PORT,
}
console.log(dbDetails)
const config = {
    PORT: process.env.PORT,
    dbDetails: dbDetails,
    JWT_SECRET: process.env.JWT_SECRET
}


export default config