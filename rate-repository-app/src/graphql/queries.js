import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
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
            }
          }
        }
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
