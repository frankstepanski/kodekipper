import { gql } from 'apollo-boost';

const addSnippetsMutation = gql`
  mutation($code: String!, $name: String!, $user_id: ID, $folder_id: ID) {
    addSnippets(code: $code, name: $name, user_id: $user_id, folder_id: $folder_id) {
      id
      code
      name
      user_id
      folder_id
    }
  }
`

const updateSnippetsMutation = gql`
  mutation($id: ID!, $code: String!, $name: String!, $user_id: ID, $folder_id: ID) {
    updateSnippets(id: $id, code: $code, name: $name, user_id: $user_id, folder_id: $folder_id) {
      id
      code
      name
      user_id
      folder_id
    }
  }
`

const deleteSnippetsMutation = gql`
  mutation($id: ID!){
    deleteSnippets(id: $id){
      id
      code
      name
      user_id
      folder_id
    }
  }
`

const addFolderMutation = gql`
  mutation($name: String, $user_id: ID, $language_id: Int) {
    addFolder(name: $name, user_id: $user_id, language_id: $language_id) {
      id
      name
      user_id
      language_id
    }
  }
`

const updateFolderMutation = gql`
  mutation($id: ID!, $name: String, $user_id: ID, $language_id: Int) {
    updateFolder(id: $id, name: $name, user_id: $user_id, language_id: $language_id) {
      id
      name
      user_id
      language_id
    }
  }
`

const deleteFolderMutation = gql`
  mutation($id: ID!){
    deleteFolder(id: $id){
      id
      name
      user_id
      language_id
    }
  }
`

const addUserMutation = gql`
  mutation($user_name: String, $password: String) {
    addUser(user_name: $user_name, password: $password) {
      id
      user_name
      password
    }
  }
`

const updateUserMutation = gql`
  mutation($id: ID!, $user_name: String, $password: String) {
    updateUser(id: $id, user_name: $user_name, password: $password) {
      id
      user_name
      password
    }
  }
`

const deleteUserMutation = gql`
  mutation($id: ID!){
    deleteUser(id: $id){
      id
      user_name
      password
    }
  }
`

const addLanguagesMutation = gql`
  mutation($name: String) {
    addLanguages(name: $name) {
      id
      name
    }
  }
`

const updateLanguagesMutation = gql`
  mutation($id: ID!, $name: String) {
    updateLanguages(id: $id, name: $name) {
      id
      name
    }
  }
`

const deleteLanguagesMutation = gql`
  mutation($id: ID!){
    deleteLanguages(id: $id){
      id
      name
    }
  }
`

export {
  addSnippetsMutation,
  updateSnippetsMutation,
  deleteSnippetsMutation,
  addFolderMutation,
  updateFolderMutation,
  deleteFolderMutation,
  addUserMutation,
  updateUserMutation,
  deleteUserMutation,
  addLanguagesMutation,
  updateLanguagesMutation,
  deleteLanguagesMutation,
};