const { preHandler, preValidation } = require('../hook/entity.js')
const entityController = require('../controller/entity.js')
const { getPageSchema } = require('../swagger.js')
const entitySchema = require('../schema/entity.json')

const { id, includedAt, updatedAt, ...rest } = entitySchema.properties
const idStripedSchema = { ...entitySchema, properties: rest }

const list = {
  preValidation,
  preHandler,
  handler: entityController.list,
  schema: {
    tags: ['Entity'],
    query: {
      type: 'object',
      properties: {
        fields: {
          description:
            'Filter to select fields thar must be returned. Ex.: "?fields=id,name"',
          type: 'string',
          in: 'query',
          default: ''
        },
        fiql: {
          description: `field you can define complex queries to filter objects. 
            __All object and sub-object properties are available to be used in your query__.

#### Example 
Request: '/entites?fiql=active==true;name==CPLV'

#### Combinations
Operator | Description
--- | ---
; | AND
, | OR
()| Parentheses can be used define precedence


#### Logicals
Operator | Description
--- | ---
== | Equal To
!= | Not Equal To
=gt= | Greater Than
=ge= | Greater Than or Equal To 
=lt= | Less Than
=le= | Less Than or Equal To 
=re= | Regular expressions. Available only for 'string' properties. <br /><br />Format: '('<regular expression>','<options: optional>')' <br /><br /> See details in [mongoDb docs](https://docs.mongodb.com/manual/reference/operator/query/regex/).`,
          type: 'string',
          in: 'query',
          default: ''
        },
        offset: {
          description: 'Number of records to be skipped',
          type: 'integer',
          in: 'query',
          default: 0
        },
        limit: {
          description: 'Number of records to be returned',
          type: 'integer',
          in: 'query',
          default: 10
        }
      }
    },
    response: {
      200: getPageSchema('entity')
    }
  }
}
const byId = {
  preValidation,
  preHandler,
  handler: entityController.byId,
  schema: {
    tags: ['Entity'],
    response: {
      200: { $ref: 'entity' }
    },
    params: {
      type: 'object',
      properties: {
        id: {
          ...entitySchema.properties.id,
          description: 'Id',
          in: 'query'
        }
      }
    }
  }
}
const byIdHead = {
  preValidation,
  preHandler,
  handler: entityController.byId,
  schema: {
    tags: ['Entity'],
    response: {
      200: { type: 'null' }
    },
    params: {
      type: 'object',
      properties: {
        id: {
          ...entitySchema.properties.id,
          description: 'Id',
          in: 'query'
        }
      }
    }
  }
}
const create = {
  preValidation,
  preHandler,
  handler: entityController.create,
  schema: {
    tags: ['Entity'],
    body: idStripedSchema,
    response: {
      201: {
        description: 'Successfully created item',
        type: 'null',
        headers: {
          Location: {
            type: 'string',
            description: 'Location of the new Entity'
          }
        }
      }
    }
  }
}
const update = {
  preValidation,
  preHandler,
  handler: entityController.update,
  schema: {
    tags: ['Entity'],
    body: idStripedSchema,
    response: {
      204: {
        description: 'Successfully updated item',
        type: 'null'
      }
    },
    params: {
      type: 'object',
      properties: {
        id: {
          ...entitySchema.properties.id,
          description: 'Id',
          in: 'query'
        }
      }
    }
  }
}
const partialUpdate = {
  preValidation,
  preHandler,
  handler: entityController.partialUpdate,
  schema: {
    tags: ['Entity'],
    body: {
      type: 'object',
      properties: idStripedSchema.properties
    },
    response: {
      204: {
        description: 'Successfully updated item',
        type: 'null'
      }
    },
    params: {
      type: 'object',
      properties: {
        id: {
          ...entitySchema.properties.id,
          description: 'Id',
          in: 'query'
        }
      }
    }
  }
}
const deleteById = {
  preValidation,
  preHandler,
  handler: entityController.deleteById,
  schema: {
    tags: ['Entity'],
    response: {
      200: {
        description: 'Successfully deleted item',
        type: 'null'
      }
    },
    params: {
      type: 'object',
      properties: {
        id: {
          ...entitySchema.properties.id,
          description: 'Id',
          in: 'query'
        }
      }
    }
  }
}

module.exports = {
  list,
  byId,
  byIdHead,
  create,
  update,
  partialUpdate,
  deleteById
}