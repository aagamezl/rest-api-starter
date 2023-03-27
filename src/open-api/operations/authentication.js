export const authenticationHeader = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'The Bearer Authorization token'
    }
  }
}
