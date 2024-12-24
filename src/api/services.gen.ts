// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
  formDataBodySerializer,
} from '@hey-api/client-fetch';
import type {
  GetBooksBooksGetData,
  GetBooksBooksGetError,
  GetBooksBooksGetResponse,
  GetBookBooksBookIdGetData,
  GetBookBooksBookIdGetError,
  GetBookBooksBookIdGetResponse,
  CreateBookBooksCreatePostData,
  CreateBookBooksCreatePostError,
  CreateBookBooksCreatePostResponse,
  UpdateBookBooksBookIdUpdatePutData,
  UpdateBookBooksBookIdUpdatePutError,
  UpdateBookBooksBookIdUpdatePutResponse,
  DeleteBookBooksBookIdDeleteDeleteData,
  DeleteBookBooksBookIdDeleteDeleteError,
  DeleteBookBooksBookIdDeleteDeleteResponse,
  ContextSearchComplexSearchContextGetData,
  ContextSearchComplexSearchContextGetError,
  ContextSearchComplexSearchContextGetResponse,
  SemanticSearchComplexSearchSemanticGetData,
  SemanticSearchComplexSearchSemanticGetError,
  SemanticSearchComplexSearchSemanticGetResponse,
  GetProfileUsersProfileGetError,
  GetProfileUsersProfileGetResponse,
  LoginUsersLoginPostData,
  LoginUsersLoginPostError,
  LoginUsersLoginPostResponse,
  RegisterUsersRegisterPostData,
  RegisterUsersRegisterPostError,
  RegisterUsersRegisterPostResponse,
  LogoutUserUsersLogoutPostError,
  LogoutUserUsersLogoutPostResponse,
  SetPrivilegeForUserUsersUserIdSetPrivilegePostData,
  SetPrivilegeForUserUsersUserIdSetPrivilegePostError,
  SetPrivilegeForUserUsersUserIdSetPrivilegePostResponse,
  UpdateUserByIdUsersUserIdUpdatePutData,
  UpdateUserByIdUsersUserIdUpdatePutError,
  UpdateUserByIdUsersUserIdUpdatePutResponse,
  DeleteUserByIdUsersUserIdDeleteDeleteData,
  DeleteUserByIdUsersUserIdDeleteDeleteError,
  DeleteUserByIdUsersUserIdDeleteDeleteResponse,
  GetUserByIdUsersUserIdGetData,
  GetUserByIdUsersUserIdGetError,
  GetUserByIdUsersUserIdGetResponse,
  GetUsersUsersGetError,
  GetUsersUsersGetResponse,
  GetAuthorsAuthorsGetData,
  GetAuthorsAuthorsGetError,
  GetAuthorsAuthorsGetResponse,
  GetAuthorAuthorsAuthorIdGetData,
  GetAuthorAuthorsAuthorIdGetError,
  GetAuthorAuthorsAuthorIdGetResponse,
  CreateAuthorAuthorsCreatePostData,
  CreateAuthorAuthorsCreatePostError,
  CreateAuthorAuthorsCreatePostResponse,
  DeleteAuthorAuthorsAuthorIdDeleteDeleteData,
  DeleteAuthorAuthorsAuthorIdDeleteDeleteError,
  DeleteAuthorAuthorsAuthorIdDeleteDeleteResponse,
  UpdateAuthorAuthorsAuthorIdUpdatePutData,
  UpdateAuthorAuthorsAuthorIdUpdatePutError,
  UpdateAuthorAuthorsAuthorIdUpdatePutResponse,
  GetGenresGenresGetData,
  GetGenresGenresGetError,
  GetGenresGenresGetResponse,
  GetGenreGenresGenreIdGetData,
  GetGenreGenresGenreIdGetError,
  GetGenreGenresGenreIdGetResponse,
  CreateGenreGenresCreatePostData,
  CreateGenreGenresCreatePostError,
  CreateGenreGenresCreatePostResponse,
  DeleteGenreGenresGenreIdDeleteDeleteData,
  DeleteGenreGenresGenreIdDeleteDeleteError,
  DeleteGenreGenresGenreIdDeleteDeleteResponse,
  UpdateGenreGenresGenreIdUpdatePutData,
  UpdateGenreGenresGenreIdUpdatePutError,
  UpdateGenreGenresGenreIdUpdatePutResponse,
  UploadFileStoragePostData,
  UploadFileStoragePostError,
  UploadFileStoragePostResponse,
  DownloadFileStorageDownloadFilenameGetData,
  DownloadFileStorageDownloadFilenameGetError,
  DownloadFileStorageDownloadFilenameGetResponse,
  ListFilesStorageListGetError,
  ListFilesStorageListGetResponse,
  DeleteFileStorageFilenameDeleteData,
  DeleteFileStorageFilenameDeleteError,
  DeleteFileStorageFilenameDeleteResponse,
  GetReviewsReviewsGetData,
  GetReviewsReviewsGetError,
  GetReviewsReviewsGetResponse,
  GetReviewReviewsReviewIdGetData,
  GetReviewReviewsReviewIdGetError,
  GetReviewReviewsReviewIdGetResponse,
  GetAverageMarkReviewsAverageBookIdGetData,
  GetAverageMarkReviewsAverageBookIdGetError,
  GetAverageMarkReviewsAverageBookIdGetResponse,
  GetMarksCountReviewsCountBookIdGetData,
  GetMarksCountReviewsCountBookIdGetError,
  GetMarksCountReviewsCountBookIdGetResponse,
  CreateReviewReviewsCreatePostData,
  CreateReviewReviewsCreatePostError,
  CreateReviewReviewsCreatePostResponse,
  UpdateReviewReviewsReviewIdUpdatePutData,
  UpdateReviewReviewsReviewIdUpdatePutError,
  UpdateReviewReviewsReviewIdUpdatePutResponse,
  DeleteReviewReviewsReviewIdDeleteDeleteData,
  DeleteReviewReviewsReviewIdDeleteDeleteError,
  DeleteReviewReviewsReviewIdDeleteDeleteResponse,
} from './types.gen';

export const client = createClient(createConfig());

/**
 * Returns books using search parameters (all of them otherwise)
 */
export const getBooksBooksGet = <ThrowOnError extends boolean = false>(
  options?: Options<GetBooksBooksGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetBooksBooksGetResponse,
    GetBooksBooksGetError,
    ThrowOnError
  >({
    ...options,
    url: '/books/',
  });
};

/**
 * Returns book data
 */
export const getBookBooksBookIdGet = <ThrowOnError extends boolean = false>(
  options: Options<GetBookBooksBookIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetBookBooksBookIdGetResponse,
    GetBookBooksBookIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/books/{book_id}',
  });
};

/**
 * Creates new book. Only for authorized user with moderator privilege
 */
export const createBookBooksCreatePost = <ThrowOnError extends boolean = false>(
  options: Options<CreateBookBooksCreatePostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateBookBooksCreatePostResponse,
    CreateBookBooksCreatePostError,
    ThrowOnError
  >({
    ...options,
    url: '/books/create',
  });
};

/**
 * Updates book data. Only for authorized user with admin privilege
 */
export const updateBookBooksBookIdUpdatePut = <
  ThrowOnError extends boolean = false
>(
  options: Options<UpdateBookBooksBookIdUpdatePutData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateBookBooksBookIdUpdatePutResponse,
    UpdateBookBooksBookIdUpdatePutError,
    ThrowOnError
  >({
    ...options,
    url: '/books/{book_id}/update',
  });
};

/**
 * Deletes book. Only for authorized user with admin privilege
 */
export const deleteBookBooksBookIdDeleteDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<DeleteBookBooksBookIdDeleteDeleteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteBookBooksBookIdDeleteDeleteResponse,
    DeleteBookBooksBookIdDeleteDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/books/{book_id}/delete',
  });
};

/**
 * Context Search
 */
export const contextSearchComplexSearchContextGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<ContextSearchComplexSearchContextGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ContextSearchComplexSearchContextGetResponse,
    ContextSearchComplexSearchContextGetError,
    ThrowOnError
  >({
    ...options,
    url: '/complex_search/context',
  });
};

/**
 * Semantic Search
 */
export const semanticSearchComplexSearchSemanticGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<SemanticSearchComplexSearchSemanticGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    SemanticSearchComplexSearchSemanticGetResponse,
    SemanticSearchComplexSearchSemanticGetError,
    ThrowOnError
  >({
    ...options,
    url: '/complex_search/semantic',
  });
};

/**
 * Returns authorized user
 */
export const getProfileUsersProfileGet = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetProfileUsersProfileGetResponse,
    GetProfileUsersProfileGetError,
    ThrowOnError
  >({
    ...options,
    url: '/users/profile',
  });
};

/**
 * Logs user in
 */
export const loginUsersLoginPost = <ThrowOnError extends boolean = false>(
  options: Options<LoginUsersLoginPostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    LoginUsersLoginPostResponse,
    LoginUsersLoginPostError,
    ThrowOnError
  >({
    ...options,
    url: '/users/login',
  });
};

/**
 * Creates new user
 */
export const registerUsersRegisterPost = <ThrowOnError extends boolean = false>(
  options: Options<RegisterUsersRegisterPostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    RegisterUsersRegisterPostResponse,
    RegisterUsersRegisterPostError,
    ThrowOnError
  >({
    ...options,
    url: '/users/register',
  });
};

/**
 * Log out of system
 */
export const logoutUserUsersLogoutPost = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    LogoutUserUsersLogoutPostResponse,
    LogoutUserUsersLogoutPostError,
    ThrowOnError
  >({
    ...options,
    url: '/users/logout',
  });
};

/**
 * Sets the privilege for user
 */
export const setPrivilegeForUserUsersUserIdSetPrivilegePost = <
  ThrowOnError extends boolean = false
>(
  options: Options<
    SetPrivilegeForUserUsersUserIdSetPrivilegePostData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).post<
    SetPrivilegeForUserUsersUserIdSetPrivilegePostResponse,
    SetPrivilegeForUserUsersUserIdSetPrivilegePostError,
    ThrowOnError
  >({
    ...options,
    url: '/users/{user_id}/set_privilege',
  });
};

/**
 * Updates user by id
 */
export const updateUserByIdUsersUserIdUpdatePut = <
  ThrowOnError extends boolean = false
>(
  options: Options<UpdateUserByIdUsersUserIdUpdatePutData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateUserByIdUsersUserIdUpdatePutResponse,
    UpdateUserByIdUsersUserIdUpdatePutError,
    ThrowOnError
  >({
    ...options,
    url: '/users/{user_id}/update',
  });
};

/**
 * Deletes user by id
 */
export const deleteUserByIdUsersUserIdDeleteDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<DeleteUserByIdUsersUserIdDeleteDeleteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteUserByIdUsersUserIdDeleteDeleteResponse,
    DeleteUserByIdUsersUserIdDeleteDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/users/{user_id}/delete',
  });
};

/**
 * Returns user by id
 */
export const getUserByIdUsersUserIdGet = <ThrowOnError extends boolean = false>(
  options: Options<GetUserByIdUsersUserIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetUserByIdUsersUserIdGetResponse,
    GetUserByIdUsersUserIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/users/{user_id}',
  });
};

/**
 * Returns all users
 */
export const getUsersUsersGet = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetUsersUsersGetResponse,
    GetUsersUsersGetError,
    ThrowOnError
  >({
    ...options,
    url: '/users/',
  });
};

/**
 * Returns authors
 */
export const getAuthorsAuthorsGet = <ThrowOnError extends boolean = false>(
  options?: Options<GetAuthorsAuthorsGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetAuthorsAuthorsGetResponse,
    GetAuthorsAuthorsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/authors/',
  });
};

/**
 * Returns author
 */
export const getAuthorAuthorsAuthorIdGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<GetAuthorAuthorsAuthorIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetAuthorAuthorsAuthorIdGetResponse,
    GetAuthorAuthorsAuthorIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/authors/{author_id}',
  });
};

/**
 * Creates authors
 */
export const createAuthorAuthorsCreatePost = <
  ThrowOnError extends boolean = false
>(
  options: Options<CreateAuthorAuthorsCreatePostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateAuthorAuthorsCreatePostResponse,
    CreateAuthorAuthorsCreatePostError,
    ThrowOnError
  >({
    ...options,
    url: '/authors/create',
  });
};

/**
 * Deletes authors
 */
export const deleteAuthorAuthorsAuthorIdDeleteDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<DeleteAuthorAuthorsAuthorIdDeleteDeleteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteAuthorAuthorsAuthorIdDeleteDeleteResponse,
    DeleteAuthorAuthorsAuthorIdDeleteDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/authors/{author_id}/delete',
  });
};

/**
 * Updates authors
 */
export const updateAuthorAuthorsAuthorIdUpdatePut = <
  ThrowOnError extends boolean = false
>(
  options: Options<UpdateAuthorAuthorsAuthorIdUpdatePutData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateAuthorAuthorsAuthorIdUpdatePutResponse,
    UpdateAuthorAuthorsAuthorIdUpdatePutError,
    ThrowOnError
  >({
    ...options,
    url: '/authors/{author_id}/update',
  });
};

/**
 * Returns genres
 */
export const getGenresGenresGet = <ThrowOnError extends boolean = false>(
  options?: Options<GetGenresGenresGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetGenresGenresGetResponse,
    GetGenresGenresGetError,
    ThrowOnError
  >({
    ...options,
    url: '/genres/',
  });
};

/**
 * Returns genre
 */
export const getGenreGenresGenreIdGet = <ThrowOnError extends boolean = false>(
  options: Options<GetGenreGenresGenreIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetGenreGenresGenreIdGetResponse,
    GetGenreGenresGenreIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/genres/{genre_id}',
  });
};

/**
 * Creates genres
 */
export const createGenreGenresCreatePost = <
  ThrowOnError extends boolean = false
>(
  options: Options<CreateGenreGenresCreatePostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateGenreGenresCreatePostResponse,
    CreateGenreGenresCreatePostError,
    ThrowOnError
  >({
    ...options,
    url: '/genres/create',
  });
};

/**
 * Deletes genres
 */
export const deleteGenreGenresGenreIdDeleteDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<DeleteGenreGenresGenreIdDeleteDeleteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteGenreGenresGenreIdDeleteDeleteResponse,
    DeleteGenreGenresGenreIdDeleteDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/genres/{genre_id}/delete',
  });
};

/**
 * Updates genres
 */
export const updateGenreGenresGenreIdUpdatePut = <
  ThrowOnError extends boolean = false
>(
  options: Options<UpdateGenreGenresGenreIdUpdatePutData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateGenreGenresGenreIdUpdatePutResponse,
    UpdateGenreGenresGenreIdUpdatePutError,
    ThrowOnError
  >({
    ...options,
    url: '/genres/{genre_id}/update',
  });
};

/**
 * Uploads new file. Privileged users only.
 */
export const uploadFileStoragePost = <ThrowOnError extends boolean = false>(
  options: Options<UploadFileStoragePostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    UploadFileStoragePostResponse,
    UploadFileStoragePostError,
    ThrowOnError
  >({
    ...options,
    ...formDataBodySerializer,
    headers: {
      'Content-Type': null,
      ...options?.headers,
    },
    url: '/storage/',
  });
};

/**
 * Download File
 */
export const downloadFileStorageDownloadFilenameGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<DownloadFileStorageDownloadFilenameGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    DownloadFileStorageDownloadFilenameGetResponse,
    DownloadFileStorageDownloadFilenameGetError,
    ThrowOnError
  >({
    ...options,
    url: '/storage/download/{filename}',
  });
};

/**
 * List Files
 */
export const listFilesStorageListGet = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListFilesStorageListGetResponse,
    ListFilesStorageListGetError,
    ThrowOnError
  >({
    ...options,
    url: '/storage/list',
  });
};

/**
 * Deletes file. Privileged users only.
 */
export const deleteFileStorageFilenameDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<DeleteFileStorageFilenameDeleteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteFileStorageFilenameDeleteResponse,
    DeleteFileStorageFilenameDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/storage{filename}',
  });
};

/**
 * Returns reviews's ids maybe filtered by book and user
 */
export const getReviewsReviewsGet = <ThrowOnError extends boolean = false>(
  options?: Options<GetReviewsReviewsGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetReviewsReviewsGetResponse,
    GetReviewsReviewsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/reviews/',
  });
};

/**
 * Returns review
 */
export const getReviewReviewsReviewIdGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<GetReviewReviewsReviewIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetReviewReviewsReviewIdGetResponse,
    GetReviewReviewsReviewIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/reviews/{review_id}',
  });
};

/**
 * Returns average mark for book
 */
export const getAverageMarkReviewsAverageBookIdGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<GetAverageMarkReviewsAverageBookIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetAverageMarkReviewsAverageBookIdGetResponse,
    GetAverageMarkReviewsAverageBookIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/reviews/average/{book_id}',
  });
};

/**
 * Returns marks count for book
 */
export const getMarksCountReviewsCountBookIdGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<GetMarksCountReviewsCountBookIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetMarksCountReviewsCountBookIdGetResponse,
    GetMarksCountReviewsCountBookIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/reviews/count/{book_id}',
  });
};

/**
 * Creates new review. Only for authorized users. One review from one user for one book
 */
export const createReviewReviewsCreatePost = <
  ThrowOnError extends boolean = false
>(
  options: Options<CreateReviewReviewsCreatePostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateReviewReviewsCreatePostResponse,
    CreateReviewReviewsCreatePostError,
    ThrowOnError
  >({
    ...options,
    url: '/reviews/create',
  });
};

/**
 * Updates existing review. Only for reviews' owners
 */
export const updateReviewReviewsReviewIdUpdatePut = <
  ThrowOnError extends boolean = false
>(
  options: Options<UpdateReviewReviewsReviewIdUpdatePutData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateReviewReviewsReviewIdUpdatePutResponse,
    UpdateReviewReviewsReviewIdUpdatePutError,
    ThrowOnError
  >({
    ...options,
    url: '/reviews/{review_id}/update',
  });
};

/**
 * Deletes existing review. Only for reviews' owners
 */
export const deleteReviewReviewsReviewIdDeleteDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<DeleteReviewReviewsReviewIdDeleteDeleteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteReviewReviewsReviewIdDeleteDeleteResponse,
    DeleteReviewReviewsReviewIdDeleteDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/reviews/{review_id}/delete',
  });
};
