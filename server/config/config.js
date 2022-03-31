import dotenv from 'dotenv'

dotenv.config()

const dbDetails ={
                    host: process.env.HOST,
                    user: process.env.DATABASE_USER,
                    database: process.env.DATABASE,
                    password: process.env.PASSWORD,
                    port: process.env.DATABASE_PORT,
                    ssl: {
                        rejectUnauthorized: false
                      }
}

const config = {
    PORT: process.env.PORT,
    dbDetails: dbDetails,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL
}


export default config