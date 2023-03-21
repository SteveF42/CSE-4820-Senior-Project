module.exports = swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'DYSH API',
        description: 'API documentation for dysh. To access locked endpoints make sure to login or register and place the authorization token in auth section of swagger docs',
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
            url: 'http://fresh-dysh.com/api/v1',
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
        // authorization
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
                        bearerAuth: []
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
                    bearerAuth: []
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
        // history
        "/history": {
            get: {
                tags: ["history"],
                security: [{
                    bearerAuth: []
                }],
                summary: "Gets user history",
                description: "Gets a number of recipes from users history search",
                responses: {
                    '200': {
                        description: "OK",
                    },
                },
                parameters: [
                    {
                        in: "query",
                        name: "count",
                        schema: {
                            type: "number"
                        },
                        description: "Number of items to querry"
                    },
                    {
                        in: "query",
                        name: "skip",
                        schema: {
                            type: "number"
                        },
                        description: "Number of items to skip"
                    }
                ]
            },
            post: {
                tags: ["history"],
                security: [{
                    bearerAuth: []
                }],
                summary: "Add item to user history",
                description: "Updates the the user with a history of past recipes they have viewed",
                responses: {
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
                                description: 'ID of the recipe to be added',
                                properties: {
                                    recipeID: {
                                        type: "string"
                                    },
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["history"],
                security: [{
                    bearerAuth: []
                }],
                summary: "Remove recipe from user history",
                description: "Updates user recipes by removing a single entry",
                responses: {
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
                                description: 'ID of the recipe to be added',
                                properties: {
                                    recipeID: {
                                        type: "string"
                                    },
                                }
                            }
                        }
                    }
                }

            }
        },
        // favorites
        "/favorite": {
            get: {
                tags: ["favorite"],
                security: [{
                    bearerAuth: []
                }],
                summary: "Gets user favorites",
                description: "Finds all recipes that the user has added to their favorite list",
                responses: {
                    '200': {
                        description: "OK",
                    },
                },
                parameters: [
                    {
                        in: "query",
                        name: "count",
                        schema: {
                            type: "number"
                        },
                        description: "Number of items to querry"
                    },
                    {
                        in: "query",
                        name: "skip",
                        schema: {
                            type: "number"
                        },
                        description: "Number of items to skip"
                    }
                ]
            },
            post: {
                tags: ["favorite"],
                security: [{
                    bearerAuth: []
                }],
                summary: "Add item to user favorites",
                description: "Adds a recipe to a user favorites list",
                responses: {
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
                                description: 'ID of the recipe to be added',
                                properties: {
                                    recipeID: {
                                        type: "string"
                                    },
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["favorite"],
                security: [{
                    bearerAuth: []
                }],
                summary: "Remove recipe from user history",
                description: "Updates user recipes by removing a single entry",
                responses: {
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
                                description: 'ID of the recipe to be added',
                                properties: {
                                    recipeID: {
                                        type: "string"
                                    },
                                }
                            }
                        }
                    }
                }

            }
        },
        // recipe
        "/recipe/search": {
            get: {
                tags: ["recipe"],
                summary: "Get a recipe",
                description: "find a recipe from the database",
                responses: {
                    '200': {
                        description: "OK",
                    },
                },
                parameters: [
                    {
                        in: "query",
                        name: "ingredients",
                        schema: {
                            type: "string"
                        },
                        description: "Ingredients separated by commas. Lettuce, tomateo, bread"
                    },
                    {
                        in: "query",
                        name: "category",
                        schema: {
                            type: "string"
                        },
                        description: "category separated by comas. Dessert, cookie, chocolate"
                    },
                    {
                        in: "query",
                        name: "count",
                        schema: {
                            type: "number"
                        },
                        description: "number of quarries to be returned (max 100, min 15)"
                    },
                    {
                        in: "query",
                        name: "skip",
                        schema: {
                            type: "number"
                        },
                        description: "number of quarries to be skipped (default 0)"
                    },
                    {
                        in: "query",
                        name: "cookTime",
                        schema: {
                            type: "number"
                        },
                        description: "how long a recipe will take to make"
                    },
                    {
                        in: "query",
                        name: "recipeID",
                        schema: {
                            type: "string"
                        },
                        description: "direct recipeID to pass through"
                    }
                ]
            },
            post: {
                security: [{
                    bearerAuth: []
                }],
                tags: ["recipe"],
                summary: "Create a recipe",
                description: "Create a new recipe generated by the user (Note, will implement these later since I need to figure out how associativity is going to work between recipe and user)",
                responses: {
                    '200': {
                        description: "OK",
                    },
                },
            },
            delete:{
                security: [{
                    bearerAuth: []
                }],
                tags: ["recipe"],
                summary: "Delete a recipe",
                description: "Deletes a user created recipe",
                responses: {
                    '200': {
                        description: "OK",
                    },
                },
            },
            put:{
                security: [{
                    bearerAuth: []
                }],
                tags: ["recipe"],
                summary: "Update a recipe",
                description: "Update a user created recipe",
                responses: {
                    '200': {
                        description: "OK",
                    },
                },
            },
        }
    }
}