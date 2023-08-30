import { useMutation, useQuery } from "@apollo/client";
import Text from "./Text";
import { DELETE_REVIEW, GET_ME } from "../graphql/queries";
import { Alert, FlatList, Pressable, View } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const MyReviews = () => {
  const navigate = useNavigate();

  const [deleteReview] = useMutation(DELETE_REVIEW);
  
  const result = useQuery(GET_ME, {
    variables: {
      includeReviews: true,
    },
  });

  if (result.loading) return <Text style={{ position: 'absolute', top: '50%', left: '50%' }}>loading...</Text>;

  const reviewNodes = result.data
    ? result.data.me.reviews.edges.map((edge) => edge.node)
    : [];
  
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem refetch={result.refetch} navigate={navigate} review={item} deleteReview={deleteReview} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

const ReviewItem = ({ review, navigate, deleteReview, refetch }) => {
  return (
    <View style={{ padding: 10, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', width: 40, height: 40, borderWidth: 2, borderColor: theme.colors.primary, borderRadius: 100 }}>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{review.rating}</Text>
        </View>
        <View style={{ marginLeft: 10, flexGrow: 1, flexShrink: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>{review.repository.fullName}</Text>
          <Text style={{ color: theme.colors.textSecondary }}>{`${new Date(review.createdAt).getDate()}.${new Date(review.createdAt).getMonth()}.${new Date(review.createdAt).getFullYear()}`}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around'}}>
        <Pressable
          style={{ flexGrow: 1, backgroundColor: theme.colors.primary, marginRight: 10, borderRadius: 5 }}
          onPress={() => {
            navigate(`/repositories/${review.repositoryId}`);
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', paddingVertical: 15 }}>View repository</Text>
        </Pressable>
        <Pressable
          style={{ flexGrow: 1, backgroundColor: 'red', marginLeft: 10, borderRadius: 5 }}
          onPress={() => {
            Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
              {
                text: 'CANCEL',
                style: 'cancel',
              },
              {
                cancelable: true,
                text: 'DELETE',
                onPress: () => {
                  deleteReview({
                    variables: {
                      deleteReviewId: review.id,
                    },
                  });
                  refetch();
                },
              },
            ]);
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', paddingVertical: 15 }}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyReviews;
