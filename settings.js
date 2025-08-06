const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUtET0tUemI1UzFkUWphMDdtVjc2VXBkcW5EQ2t4TFVPVzhuTkdjSDEzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRndlRGRQRHhyY3gzUm5aWGlwcVp1ME1tcDFSQ2Rxc3h1bVVGSDZSMkhRaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTFRIZFRXQTM5UDRBVEQ5b0ZHMGpLdmNrS3RnN0NFNGhoQXk3RWdvSWtVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaVGU2TVJuYkhrbllVUEcvRU5yMS9NYzNmd2RkNGFJbWZBV21VMzlrQ2t3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFBaHlWVnBQaHM3dWtkbngydkFQWjVmNmU4QlhtQW9ZUlZ3ZE96NnA4bWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjUzdk9hR1MvY0VCQUpJcTY0UXorR1N3VVY4SThhdXJWMFk2YnVkaFpnVGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0RhZCt4MWZ0TWFuRnpYQnM2YWF4My9LYjI1bFNFeEhYUmhOa2dKQ3IyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtKRTBIV0pVSnR2OHlQZkJTWXpOTVBTOVA0RTluTm5pRC9vMVg1WDFoMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjR6bWwzM2J6RnBjSGlPU0w0dS9SWW9GamovaGlqdU1Ya21GZ1ZuMy95VWNDTEIwUGVoSnc1eU50ZEo0MTkzS1BweGZuemJnNjdtcnZWWjU3VTBiNmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiJ4bDVrcm1DTFRWSWFOYU8yS1RZRlFsZDlTZDBSTW9mNGZwU3l0S3FvZTFFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNKcUFxTHNHRVAreHpjUUdHQTBnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXNDZhbUxGTzVBcDhFSnJwYUdvZm1rQWthS0svaGpVT0tOYVlqdkxNU21vPSIsImFjY291bnRTaWduYXR1cmUiOiJSV3p2TGo2b1drTGRZNlJVTVZ0QUpTSlBrdFZVQmVFRHVnMTUyYlV4NU00QjVpL3FwbVQ3d01ERzJtR1NyRGExV2JCemx0azROMFJJL3JYbXp1ZTdpZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoicU9pTXcxR1B1ZjFycEYwMGo2aTZPeVFHVVZzSWtYNnYxcE9UbEJNU25LanNhUlUzK0xrYzAwVjBrZ0RiWkNwNCtwZEp5STMwSHNKQUdPVVMvdkJVaFE9PSJ9LCJtZSI6eyJpZCI6IjIzMzU1MDQ0NTczOToyNEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEwNTQzMzQ3Nzk4MDQxNToyNEBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTUwNDQ1NzM5OjI0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZ1T21waXhUdVFLZkJDYTZXaHFINXBBSkdpaXY0WTFEaWpXbUk3eXpFcHEifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU0NDg3MDUyLCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhWQyJ9
',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "DJ Kilosty",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233550445739",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, // ✅
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes', // ✅
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
