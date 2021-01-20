import { login, fetchUserProfile, signUp, resetCredential } from './db-middleware/auth'
import { logout } from './db-middleware/logout'
import { fetchPosts, fetchPostSnapshot, fetchImageAssets } from './db-middleware/fetch'
import { mapRes } from './db-middleware/mapRes'
import { createPost } from './db-middleware/createPost'
import { readPost } from './db-middleware/readPost'
import { updatePost } from './db-middleware/updatePost'
import { deletePost } from './db-middleware/deletePost'
import { createComment } from './db-middleware/createComment'
import { deleteComment } from './db-middleware/deleteComment'
import { createLink } from './db-middleware/createLink'
import { deleteLink } from './db-middleware/deleteLink'
import { togglePostComponents } from './db-middleware/togglePostComponents'

export default {
  // MESSAGE BOARD FUNCTIONALITY
  signUp, // SIGNS USER UP
  login, // LOGS USER IN
  resetCredential, // RESETS USER CRED in DB
  fetchUserProfile, // FETCH USER OBJECT FROM DB
  logout, // LOGOUT
  fetchPosts, // FETCH POSTS FROM DB
  fetchPostSnapshot, // FETCH POST SNAPSHOT FOR MAPPING OVER
  fetchImageAssets, // RETRIEVE IMAGES FROM DB
  mapRes, // RETRIEVE POST
  createPost, // CREATE POST
  readPost, // READ POST
  updatePost, // UPDATE POST
  deletePost, // DELETE POST
  createComment, // CREATE COMMENT
  deleteComment, // DELETE COMMENT
  createLink, // CREATE LINK
  deleteLink, // DELETE LINK
  togglePostComponents // COMPONENT STATE TOGGLING
}
