/**
 *
 * @param {string[]} tags
 * @param {Record<string, object>} config
 * @returns
 */
export const creteDefinition = (tags, { application, server }) => {
  return {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: application.name,
        description: application.description,
        version: application.version
      },
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      servers: [
        {
          url: `http://localhost:${server.port}/`, // Replace with the actual development server URL
          description: 'Development server'
        },
        {
          url: 'https://api.example.com', // Replace with the actual production server URL
          description: 'Production server'
        }
      ],
      components: {
        // securitySchemes: {
        //   BearerAuth: {
        //     type: 'http',
        //     scheme: 'bearer',
        //     bearerFormat: 'JWT' // or other token format you use
        //   }
        // }
        // schemas: {
        //   // Define reusable data models here, e.g., User, Error, etc.
        // },
        // responses: {
        //   NotFound: {
        //     description: 'Entity not found'
        //   },
        //   Unauthorized: {
        //     description: 'Unauthorized request'
        //   }
        // }
      },
      // security: [
      //   { BearerAuth: [] } // Applies to all paths by default; adjust as needed per path
      // ],
      tags: [{ name: 'Users', description: `${'Users'} related end-points` }]
    }
  }
}
