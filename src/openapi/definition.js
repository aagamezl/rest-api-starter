import config from '../../config/index.js'

const definition = {
  openapi: {
    openapi: '3.1.0',
    info: {
      title: config.application.name,
      description: config.application.description,
      version: config.application.version
    },
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    tags: [
      { name: 'Users', description: 'Users related end-points' }
      // {
      //   name: 'Posts',
      //   description: 'Posts related end-points'
      // }
    ]
  }
}

export default definition
