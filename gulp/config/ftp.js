import dotEnv from 'dotenv';

// получаем переменные из окружения
dotEnv.config();

export const configFTP = {
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    parrallel: process.env.FTP_PARRALLEL
}

