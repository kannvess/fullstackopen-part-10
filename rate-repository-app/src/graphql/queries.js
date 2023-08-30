import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String) {
    repositories(first: 2, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after) {
      totalCount
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          createdAt
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          url
          reviews {
            edges {
              node {
                id
                text
                rating
                createdAt
                user {
                  id
                  username
                }
              }
              cursor
            }
            pageInfo {
              endCursor
              startCursor
              hasNextPage
            }
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const POST_AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const GET_ME = gql`
  query($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repository {
              fullName
            }
            repositoryId
          }
        }
      }
    }
  }
`;

export const POST_REVIEW = gql`
  mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const POST_USER = gql`
  mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;

export const GET_REPOSITORY = gql`
  query($repositoryId: ID!, $after: String) {
    repository(id: $repositoryId) {
      id
      ownerAvatarUrl
      fullName
      createdAt
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews(first: 1, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
