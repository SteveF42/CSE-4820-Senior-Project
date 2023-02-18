module.exports = swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'DYSH API',
        description: 'API documentation for dysh',
        contact: {
            name: 'Steve Flores',
            email: 'stevewflores43@gmail.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:5000/api/v1',
            description: 'development environment'
        },
        {
            url: 'some-production-link.com',
            description: 'live build'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        responses: {
            unauthorizedError: {
                description: "Access token is missing or invalid"
            }
        }
    },
    // endpoints
    paths: {
        "/auth/login": {
            post: {
                tags: ["Authentication"],
                summary: "Login to existing user",
                description: "Log in using an existing user",
                responses: {
                    '404': {
                        description: "User already exists",
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string'
                                        }
                                    }
                                },
                            }
                        }
                    },
                    '200': {
                        description: "Successful login",
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        accessToken: {
                                            type: 'string'
                                        },
                                        refreshToken: {
                                            type: 'string'
                                        }
                                    }
                                },
                            }
                        },
                    },
                },
                requestBody: {
                    description: "body example",
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: "string"
                                    },
                                    password: {
                                        type: "string"
                                    },
                                }
                            },
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
        },
        "/auth/register": {
            post: {
                tags: ["Authentication"],
                summary: "Create a new user",
                description: "Registers a new user into the database",
                responses: {
                    '201': {
                        description: "Valid user was created",
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        accessToken: {
                                            type: 'string'
                                        },
                                        refreshToken: {
                                            type: 'string'
                                        }
                                    }
                                },
                            }
                        },
                    },
                    '409': {
                        description: "User already exists",
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string'
                                        }
                                    }
                                },
                            }
                        }
                    },
                },
                requestBody: {
                    description: "body example",
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: "string"
                                    },
                                    password: {
                                        type: "string"
                                    },
                                }
                            },
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
        },
        "/auth/logout": {
            post: {
                tags: ["Authentication"],
                security: [
                    {
                        bearerAuth:[]
                    }
                ],
                summary: "Logout of existing user",
                description: "Clears existing active and refresh tokens from mongodb",
                responses: {
                    '404': {
                        description: "Token not found",
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string'
                                        }
                                    }
                                },
                            }
                        }
                    },
                },
                requestBody: {
                    description: "body example",
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    refreshToken: {
                                        type: "string"
                                    },
                                }
                            }
                        }
                    }
                }
            },
        },
        "/auth/refresh": {
            post: {
                tags: ["Authentication"],
                summary: "Refresh access token",
                description: "Generate a new access and refresh token using the refresh token",
                responses: {
                    '401': {
                        description: "Unathorized access",
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string'
                                        }
                                    }
                                },
                            }
                        }
                    },
                    '200': {
                        description: "OK",
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        accessToken: {
                                            type: 'string'
                                        },
                                        refreshToken: {
                                            type: 'string'
                                        }
                                    }
                                },
                            }
                        }
                    },
                },
                requestBody: {
                    description: "body example",
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    refreshToken: {
                                        type: "string"
                                    },
                                }
                            }
                        }
                    }
                }
            },
        },
        "/auth/valid": {
            post: {
                tags: ["Authentication"],
                security: [{
                    bearerAuth:[]
                }],
                summary: "Check a current access token",
                description: "Test if your current access token is still valid",
                responses: {
                    '401': {
                        $ref: '#/components/responses/unauthorizedError'
                    },
                    '200': {
                        description: "OK",
                    },
                },
                requestBody: {
                    description: "body example",
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    refreshToken: {
                                        type: "string"
                                    },
                                }
                            }
                        }
                    }
                }
            },
        },

        "/recipe/search":{
            get: {
                tags: ["recipe"],
                summary: "Get a recipe",
                description: "get a list of recipes from the database",
                responses: {
                    '200': {
                        description: "OK",
                    },
                },
                requestBody: {
                    description: "query parameters for a recipe",
                    required: false,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    ingredients: {
                                        type: "string"
                                    },
                                    categories:{
                                        type: "string"
                                    },
                                    count :{
                                        type: "integer"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    }
}