// eslint-disable
// this is an auto generated file. This will be overwritten

export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    body
    createdAt
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    title
    body
    createdAt
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    title
    body
    createdAt
  }
}
`;
export const createConversation = `mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
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
export const updateConversation = `mutation UpdateConversation($input: UpdateConversationInput!) {
  updateConversation(input: $input) {
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
export const deleteConversation = `mutation DeleteConversation($input: DeleteConversationInput!) {
  deleteConversation(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
