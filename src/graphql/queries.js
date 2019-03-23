// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    body
    createdAt
  }
}
`;
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      body
      createdAt
    }
    nextToken
  }
}
`;
export const getConversation = `query GetConversation($id: ID!) {
  getConversation(id: $id) {
    id
    users {
      id
      name
      password
      createdAt
      conversations {
        id
      }
    }
    content {
      id
      title
      body
      createdAt
    }
    createdBy {
      id
      name
      password
      createdAt
      conversations {
        id
      }
    }
  }
}
`;
export const listConversations = `query ListConversations(
  $filter: ModelConversationFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      users {
        id
        name
        password
        createdAt
      }
      content {
        id
        title
        body
        createdAt
      }
      createdBy {
        id
        name
        password
        createdAt
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    password
    createdAt
    conversations {
      id
      users {
        id
        name
        password
        createdAt
      }
      content {
        id
        title
        body
        createdAt
      }
      createdBy {
        id
        name
        password
        createdAt
      }
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      password
      createdAt
      conversations {
        id
      }
    }
    nextToken
  }
}
`;
