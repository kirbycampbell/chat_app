// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
    id
    body
    createdBy {
      id
      name
      password
      createdAt
      friends {
        id
        name
        password
        createdAt
      }
      conversations {
        nextToken
      }
    }
    createdAt
  }
}
`;
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
    id
    body
    createdBy {
      id
      name
      password
      createdAt
      friends {
        id
        name
        password
        createdAt
      }
      conversations {
        nextToken
      }
    }
    createdAt
  }
}
`;
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
    id
    body
    createdBy {
      id
      name
      password
      createdAt
      friends {
        id
        name
        password
        createdAt
      }
      conversations {
        nextToken
      }
    }
    createdAt
  }
}
`;
export const onCreateConversation = `subscription OnCreateConversation {
  onCreateConversation {
    id
    contents {
      items {
        id
        body
        createdAt
      }
      nextToken
    }
    users {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onUpdateConversation = `subscription OnUpdateConversation {
  onUpdateConversation {
    id
    contents {
      items {
        id
        body
        createdAt
      }
      nextToken
    }
    users {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onDeleteConversation = `subscription OnDeleteConversation {
  onDeleteConversation {
    id
    contents {
      items {
        id
        body
        createdAt
      }
      nextToken
    }
    users {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onCreateUserConvo = `subscription OnCreateUserConvo {
  onCreateUserConvo {
    id
    conversation {
      id
      contents {
        nextToken
      }
      users {
        nextToken
      }
    }
    users {
      id
      name
      password
      createdAt
      friends {
        id
        name
        password
        createdAt
      }
      conversations {
        nextToken
      }
    }
  }
}
`;
export const onUpdateUserConvo = `subscription OnUpdateUserConvo {
  onUpdateUserConvo {
    id
    conversation {
      id
      contents {
        nextToken
      }
      users {
        nextToken
      }
    }
    users {
      id
      name
      password
      createdAt
      friends {
        id
        name
        password
        createdAt
      }
      conversations {
        nextToken
      }
    }
  }
}
`;
export const onDeleteUserConvo = `subscription OnDeleteUserConvo {
  onDeleteUserConvo {
    id
    conversation {
      id
      contents {
        nextToken
      }
      users {
        nextToken
      }
    }
    users {
      id
      name
      password
      createdAt
      friends {
        id
        name
        password
        createdAt
      }
      conversations {
        nextToken
      }
    }
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    name
    password
    createdAt
    friends {
      id
      name
      password
      createdAt
      friends {
        id
        name
        password
        createdAt
      }
      conversations {
        nextToken
      }
    }
    conversations {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    name
    password
    createdAt
    friends {
      id
      name
      password
      createdAt
      friends {
        id
        name
        password
        createdAt
      }
      conversations {
        nextToken
      }
    }
    conversations {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    name
    password
    createdAt
    friends {
      id
      name
      password
      createdAt
      friends {
        id
        name
        password
        createdAt
      }
      conversations {
        nextToken
      }
    }
    conversations {
      items {
        id
      }
      nextToken
    }
  }
}
`;
