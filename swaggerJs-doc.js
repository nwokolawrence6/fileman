const swaggerJsdoc = require( 'swagger-jsdoc' );

const options = {
  swaggerDefinition: {
    info: {
      title: 'File Management API',
      version: '1.0.0',
      description: 'Test Our File Manager API with this docs',
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc( options );