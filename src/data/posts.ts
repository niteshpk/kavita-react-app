export const postsResponse = {
  success: true,
  data: {
    current_page: 1,
    per_page: 5,
    total: 9,
    list: [
      {
        id: 2,
        author_id: 1,
        title: "Understanding Laravel Framework",
        body: "Laravel is a PHP framework that helps developers build applications faster and more efficiently.",
        photo_id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1735689978278-c3400952ddda?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        options: null,
        status: "published",
        created_at: "2025-01-01T15:41:11.000000Z",
        updated_at: "2025-01-01T16:28:54.000000Z",
        user_has_liked: 0,
        author: {
          id: 1,
          uuid: "b247ea54-8d30-4c9d-823e-fddf9b537bbb",
          username: "admin",
        },
        tags: [
          {
            id: 2,
            name: "Laravel",
            pivot: {
              post_id: 2,
              tag_id: 2,
            },
          },
          {
            id: 3,
            name: "Technology",
            pivot: {
              post_id: 2,
              tag_id: 3,
            },
          },
          {
            id: 4,
            name: "Technology",
            pivot: {
              post_id: 2,
              tag_id: 4,
            },
          },
        ],
      },
      {
        id: 3,
        author_id: 1,
        title: "Post Title 1",
        body: "This is the body of Post Title 1",
        photo_id: null,
        imageUrl:
          "https://media.istockphoto.com/id/1413992340/vector/abstract-connection-network-lines-background.jpg?s=612x612&w=0&k=20&c=Hbq5V7vcv6Yl5JX2dq_Pibu1U417QJz5fm8w9BGD5Z0=",
        options: {
          key: "value",
        },
        status: "published",
        created_at: "2025-01-01T22:52:59.000000Z",
        updated_at: "2025-01-01T22:52:59.000000Z",
        user_has_liked: 0,
        author: {
          id: 1,
          uuid: "b247ea54-8d30-4c9d-823e-fddf9b537bbb",
          username: "admin",
        },
        tags: [
          {
            id: 4,
            name: "Technology",
            pivot: {
              post_id: 3,
              tag_id: 4,
            },
          },
          {
            id: 3,
            name: "Technology",
            pivot: {
              post_id: 3,
              tag_id: 3,
            },
          },
        ],
      },
      {
        id: 4,
        author_id: 1,
        title: "Post Title 2",
        body: "This is the body of Post Title 2",
        photo_id: null,
        imageUrl:
          "https://media.istockphoto.com/id/2185370980/photo/person-holding-digital-tablet.jpg?s=1024x1024&w=is&k=20&c=vjrX96U2ui1WjYRC0x8GUczRG6iost_2JCg-riHyLeo=",
        options: {
          key: "value",
        },
        status: "published",
        created_at: "2025-01-01T22:52:59.000000Z",
        updated_at: "2025-01-01T22:52:59.000000Z",
        user_has_liked: 0,
        author: {
          id: 1,
          uuid: "b247ea54-8d30-4c9d-823e-fddf9b537bbb",
          username: "admin",
        },
        tags: [
          {
            id: 4,
            name: "Technology",
            pivot: {
              post_id: 4,
              tag_id: 4,
            },
          },
          {
            id: 3,
            name: "Technology",
            pivot: {
              post_id: 4,
              tag_id: 3,
            },
          },
        ],
      },
      {
        id: 5,
        author_id: 1,
        title: "Post Title 3",
        body: "This is the body of Post Title 3",
        photo_id: null,
        imageUrl:
          "https://media.istockphoto.com/id/1204439388/vector/bluedata.jpg?s=612x612&w=0&k=20&c=03eg5AfZgHc1dzqVFFVNNUur4UeJSLb36QB-jUE6gOw=",
        options: {
          key: "value",
        },
        status: "published",
        created_at: "2025-01-01T22:52:59.000000Z",
        updated_at: "2025-01-01T22:52:59.000000Z",
        user_has_liked: 0,
        author: {
          id: 1,
          uuid: "b247ea54-8d30-4c9d-823e-fddf9b537bbb",
          username: "admin",
        },
        tags: [
          {
            id: 4,
            name: "Technology",
            pivot: {
              post_id: 5,
              tag_id: 4,
            },
          },
          {
            id: 3,
            name: "Technology",
            pivot: {
              post_id: 5,
              tag_id: 3,
            },
          },
        ],
      },
      {
        id: 6,
        author_id: 1,
        title: "Post Title 4",
        body: "This is the body of Post Title 4",
        photo_id: null,
        imageUrl:
          "https://media.istockphoto.com/id/829422500/photo/businessman-touch-smartphone-and-glowing-blue-tech-world-map-background.jpg?s=1024x1024&w=is&k=20&c=71BKaZUpDF1hq_BD4-HUhp2bmkK2rXodR52eihlBgTc=",
        options: {
          key: "value",
        },
        status: "published",
        created_at: "2025-01-01T22:52:59.000000Z",
        updated_at: "2025-01-01T22:52:59.000000Z",
        user_has_liked: 0,
        author: {
          id: 1,
          uuid: "b247ea54-8d30-4c9d-823e-fddf9b537bbb",
          username: "admin",
        },
        tags: [
          {
            id: 4,
            name: "Technology",
            pivot: {
              post_id: 6,
              tag_id: 4,
            },
          },
          {
            id: 3,
            name: "Technology",
            pivot: {
              post_id: 6,
              tag_id: 3,
            },
          },
        ],
      },
    ],
  },
};

export const singlePostResponse = {
  success: true,
  message: "post.post_fetched",
  post: {
    id: 2,
    author_id: 1,
    title: "Understanding Laravel Framework",
    body: "Laravel is a PHP framework that helps developers build applications faster and more efficiently.",
    photo_id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1735689978278-c3400952ddda?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    options: [],
    status: "published",
    created_at: "2025-01-01T15:41:11.000000Z",
    updated_at: "2025-01-01T16:28:54.000000Z",
    user_has_liked: 0,
    author: {
      id: 1,
      uuid: "b247ea54-8d30-4c9d-823e-fddf9b537bbb",
      username: "admin",
    },
    tags: [
      {
        id: 2,
        name: "Laravel",
        pivot: {
          post_id: 2,
          tag_id: 2,
        },
      },
      {
        id: 3,
        name: "Technology",
        pivot: {
          post_id: 2,
          tag_id: 3,
        },
      },
      {
        id: 4,
        name: "Technology",
        pivot: {
          post_id: 2,
          tag_id: 4,
        },
      },
    ],
  },
};
