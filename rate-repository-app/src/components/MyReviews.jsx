import { useQuery } from "@apollo/client";
import Text from "./Text";
import { GET_ME } from "../graphql/queries";
import { FlatList, View } from "react-native";
import theme from "../theme";

const MyReviews = () => {
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
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

const ReviewItem = ({ review }) => {  
  return (
    <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', width: 40, height: 40, borderWidth: 2, borderColor: theme.colors.primary, borderRadius: 100 }}>
        <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{review.rating}</Text>
      </View>
      <View style={{ marginLeft: 10, flexGrow: 1, flexShrink: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{review.repository.fullName}</Text>
        <Text style={{ color: theme.colors.textSecondary }}>{`${new Date(review.createdAt).getDate()}.${new Date(review.createdAt).getMonth()}.${new Date(review.createdAt).getFullYear()}`}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default MyReviews;
