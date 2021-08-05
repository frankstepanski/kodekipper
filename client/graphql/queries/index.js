import { gql } from 'apollo-boost';

const queryEverySnippets = gql`
  {
    everySnippets {
      id
      code
      name
      user_id
      folder_id
    }
  }
`

const querySnippetsById = gql`
  query($id: ID!) {
    snippets(id: $id) {
      id
      code
      name
      user_id
      folder_id
    }
  }
`

const queryEveryFolder = gql`
  {
    everyFolder {
      id
      name
      user_id
      language_id
    }
  }
`

const queryFolderById = gql`
  query($id: ID!) {
    folder(id: $id) {
      id
      name
      user_id
      language_id
    }
  }
`

const queryEveryUser = gql`
  {
    everyUser {
      id
      user_name
      password
    }
  }
`

const queryUserById = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      user_name
      password
    }
  }
`

const queryEveryLanguages = gql`
  {
    everyLanguages {
      id
      name
    }
  }
`

const queryLanguagesById = gql`
  query($id: ID!) {
    languages(id: $id) {
      id
      name
    }
  }
`

export { queryEverySnippets, querySnippetsById , queryEveryFolder, queryFolderById , queryEveryUser, queryUserById , queryEveryLanguages, queryLanguagesById };