// This file is auto-generated by @hey-api/openapi-ts

export const AuthorSchema = {
  properties: {
    id: {
      type: 'integer',
      title: 'Id',
    },
    name: {
      type: 'string',
      title: 'Name',
    },
  },
  type: 'object',
  required: ['id', 'name'],
  title: 'Author',
} as const;

export const AuthorCreateSchema = {
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
  },
  type: 'object',
  required: ['name'],
  title: 'AuthorCreate',
} as const;

export const Body_upload_file_storage__postSchema = {
  properties: {
    file: {
      type: 'string',
      format: 'binary',
      title: 'File',
    },
  },
  type: 'object',
  required: ['file'],
  title: 'Body_upload_file_storage__post',
} as const;

export const BookSchema = {
  properties: {
    id: {
      type: 'integer',
      title: 'Id',
    },
    title: {
      type: 'string',
      title: 'Title',
    },
    author: {
      type: 'integer',
      title: 'Author',
    },
    genre: {
      anyOf: [
        {
          type: 'integer',
        },
        {
          type: 'null',
        },
      ],
      title: 'Genre',
    },
    publishedDate: {
      anyOf: [
        {
          type: 'string',
          format: 'date',
        },
        {
          type: 'null',
        },
      ],
      title: 'Publisheddate',
    },
    description: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Description',
    },
    imageUrl: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Imageurl',
    },
    pdfUrl: {
      type: 'string',
      title: 'Pdfurl',
    },
  },
  type: 'object',
  required: ['id', 'title', 'author', 'pdfUrl'],
  title: 'Book',
} as const;

export const BookCreateSchema = {
  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
    author: {
      type: 'string',
      title: 'Author',
    },
    genre: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Genre',
    },
    publishedDate: {
      anyOf: [
        {
          type: 'string',
          format: 'date',
        },
        {
          type: 'null',
        },
      ],
      title: 'Publisheddate',
    },
    description: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Description',
    },
    imageUrl: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Imageurl',
    },
    pdfUrl: {
      type: 'string',
      title: 'Pdfurl',
    },
  },
  type: 'object',
  required: ['title', 'author', 'pdfUrl'],
  title: 'BookCreate',
} as const;

export const FileUploadedSchemeSchema = {
  properties: {
    url: {
      type: 'string',
      title: 'Url',
    },
  },
  type: 'object',
  required: ['url'],
  title: 'FileUploadedScheme',
} as const;

export const GenreSchema = {
  properties: {
    id: {
      type: 'integer',
      title: 'Id',
    },
    name: {
      type: 'string',
      title: 'Name',
    },
  },
  type: 'object',
  required: ['id', 'name'],
  title: 'Genre',
} as const;

export const GenreCreateSchema = {
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
  },
  type: 'object',
  required: ['name'],
  title: 'GenreCreate',
} as const;

export const HTTPValidationErrorSchema = {
  properties: {
    detail: {
      items: {
        $ref: '#/components/schemas/ValidationError',
      },
      type: 'array',
      title: 'Detail',
    },
  },
  type: 'object',
  title: 'HTTPValidationError',
} as const;

export const PrivilegesEnumSchema = {
  type: 'string',
  enum: ['basic', 'admin', 'moderator'],
  title: 'PrivilegesEnum',
} as const;

export const UserSchema = {
  properties: {
    id: {
      type: 'integer',
      title: 'Id',
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email',
      description: 'Электронная почта',
    },
    name: {
      type: 'string',
      maxLength: 50,
      minLength: 3,
      title: 'Name',
      description: 'Имя, от 3 до 50 символов',
    },
    privileges: {
      $ref: '#/components/schemas/PrivilegesEnum',
    },
  },
  type: 'object',
  required: ['id', 'email', 'name', 'privileges'],
  title: 'User',
} as const;

export const UserLoginSchema = {
  properties: {
    email: {
      type: 'string',
      format: 'email',
      title: 'Email',
      description: 'Электронная почта',
    },
    password: {
      type: 'string',
      maxLength: 50,
      minLength: 5,
      title: 'Password',
      description: 'Пароль, от 5 до 50 знаков',
    },
  },
  type: 'object',
  required: ['email', 'password'],
  title: 'UserLogin',
} as const;

export const UserLoginedSchema = {
  properties: {
    email: {
      type: 'string',
      format: 'email',
      title: 'Email',
      description: 'Электронная почта',
    },
    name: {
      type: 'string',
      maxLength: 50,
      minLength: 3,
      title: 'Name',
      description: 'Имя, от 3 до 50 символов',
    },
    privileges: {
      $ref: '#/components/schemas/PrivilegesEnum',
    },
  },
  type: 'object',
  required: ['email', 'name', 'privileges'],
  title: 'UserLogined',
} as const;

export const UserRegisterSchema = {
  properties: {
    email: {
      type: 'string',
      format: 'email',
      title: 'Email',
      description: 'Электронная почта',
    },
    password: {
      type: 'string',
      maxLength: 50,
      minLength: 5,
      title: 'Password',
      description: 'Пароль, от 5 до 50 знаков',
    },
    name: {
      type: 'string',
      maxLength: 50,
      minLength: 3,
      title: 'Name',
      description: 'Имя, от 3 до 50 символов',
    },
  },
  type: 'object',
  required: ['email', 'password', 'name'],
  title: 'UserRegister',
} as const;

export const ValidationErrorSchema = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'integer',
          },
        ],
      },
      type: 'array',
      title: 'Location',
    },
    msg: {
      type: 'string',
      title: 'Message',
    },
    type: {
      type: 'string',
      title: 'Error Type',
    },
  },
  type: 'object',
  required: ['loc', 'msg', 'type'],
  title: 'ValidationError',
} as const;
