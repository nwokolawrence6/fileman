require( 'dotenv' ).config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require( 'swagger-ui-express' );
const { APP_NAME,NODE_ENV, PORT, SSL_PORT, MONGO_URL, AllowLocalOnlineText } = process.env;
const log = require('utils').logger().getLogger(APP_NAME);
const Database = require('./database/Database.mongoose');

const specs = require( './swaggerJs-doc' );
const UploadRoutes = require('./routes/uploads.routes');
const FileTypeRoutes = require('./routes/fileTypes.routes');
const FileRoutes = require('./routes/files.routes');
const allowedOrigins = [ 'https://office.cloudbooks.ng' , 'https://cloudbooks.ng' , 'https://server.cloudbooks.ng' , 'https://adminaccount.cloudbooks.ng' , 'https://auth.cloudbooks.ng' , 'http://auth.cloudbooks.ng' , 'https://account.cloudbooks.ng' , 'http://account.cloudbooks.ng' , 'https://admin.cloudbooks.ng' , 'https://cdn.cloudbooks.ng' , 'https://www.cloudbooks.ng' ];

if ( NODE_ENV === "development" ) {
    const allowedDevOrigins = ['http://192.168.43.65:3003','http://localhost:8881',"http://localhost:4040",'http://localhost:8882','http://localhost:8885'];
    allowedOrigins.push(...allowedDevOrigins);
}
if(AllowLocalOnlineText === "yes") {
    allowedOrigins.push("http://localhost:8882","http://localhost:8885")
}
const cors = require('./utitls/cors');
// Inject CRON jobs
require('./utitls/cron/cronRunner');

const app = express();
app.use( cors( allowedOrigins ) );
// Connect to the Database
new Database().connect(MONGO_URL);

// Connect to routes
app.use(UploadRoutes);

// App configs for use
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(FileRoutes);
app.use(FileTypeRoutes);

// Generate api docs
app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup( specs ) );

// HTTP
app.listen( PORT, () => log.info( `server running on http://localhost:${PORT}` ) ).setTimeout( 2147483647 );

// HTTPS
// https.createServer( {
//   key: fs.readFileSync( path.join( process.cwd(), '/key.pem' ) ),
//   cert: fs.readFileSync( path.join( process.cwd(), '/cert.pem' ) )
// }, app ).listen( SSL_PORT || 4004, () => {
//   log.info( `secure app listening on port ! Go to https://localhost:${SSL_PORT || 4004}/` )
// } ).setTimeout( 2147483647 );
