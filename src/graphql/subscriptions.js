// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
    id
    title
    body
    createdAt
  }
}
`;
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
    id
    title
    body
    createdAt
  }
}
`;
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
    id
    title
    body
    createdAt
  }
}
`;
export const onCreateConversation = `subscription OnCreateConversation {
  onCreateConversation {
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
export const onUpdateConversation = `subscription OnUpdateConversation {
  onUpdateConversation {
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
export const onDeleteConversation = `subscription OnDeleteConversation {
  onDeleteConversation {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
