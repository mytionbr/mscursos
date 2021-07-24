import dotenv from 'dotenv'

dotenv.config()

const dbDetails = ()=> {
    if(process.env.DATABASE_URL) {
        return {
            connectionString: process.env.DATABASE_URL,
            ssl: {  rejectUnauthorized: false },
        }
    } else{
        return {
                    host: LOCAL_HOST,
                    user: USER,
                    database: DATABASE,
                    password: PASSWORD,
                    port: DATABASE_PORT,
                }
    }
}

const config = {
    PORT: process.env.PORT,
    dbDetails: dbDetails(),
    JWT_SECRET: process.env.JWT_SECRET
}

export default config