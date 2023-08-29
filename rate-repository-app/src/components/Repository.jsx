import { FlatList, Image, Pressable, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useParams } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import * as Linking from 'expo-linking';

const RepositoryContainer = ({ repository }) => {
  return (
    <View testID="repositoryItem" style={{ backgroundColor: 'white', padding: 10 }}>
      <View style={{ display: "flex", flexDirection: 'row' }}>
        <Image source={{uri: repository.ownerAvatarUrl}} style={{ width: 50, height: 50, borderRadius: 5 }} />
        <View style={{ marginLeft: 10, flexShrink: 1, alignItems: "flex-start" }}>
          <Text style={{ marginBottom: 5 }} fontWeight={'bold'}>{repository.fullName}</Text>
          <Text style={{ marginBottom: 5 }}>{repository.description}</Text>
          <Text style={{ backgroundColor: theme.colors.primary, color: 'white', paddingVertical: 2, paddingHorizontal: 4, borderRadius: 5 }}>{repository.language}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: "space-around" }}>
        <View style={{ alignItems: 'center' }}>
          <Text fontWeight={'bold'}>{repository.stargazersCount >= 1000 ? `${(repository.stargazersCount / 1000).toFixed(1)}k` : repository.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text fontWeight={'bold'}>{repository.forksCount >= 1000 ? `${(repository.forksCount / 1000).toFixed(1)}k` : repository.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text fontWeight={'bold'}>{repository.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text fontWeight={'bold'}>{repository.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      <Pressable onPress={() => Linking.openURL(repository.url)}>
        <Text style={{ backgroundColor: theme.colors.primary, color: 'white', textAlign: 'center', marginTop: 10, paddingVertical: 15, borderRadius: 5, fontWeight: 'bold' }}>Open in Github</Text>
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ review }) => {  
  return (
    <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', width: 40, height: 40, borderWidth: 2, borderColor: theme.colors.primary, borderRadius: 100 }}>
        <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{review.rating}</Text>
      </View>
      <View style={{ marginLeft: 10, flexGrow: 1, flexShrink: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{review.user.username}</Text>
        <Text style={{ color: theme.colors.textSecondary }}>{`${new Date(review.createdAt).getDate()}.${new Date(review.createdAt).getMonth()}.${new Date(review.createdAt).getFullYear()}`}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const Repository = () => {
  const { id } = useParams();
  const { repositories, loading } = useRepositories();

  if (loading) return <Text style={{ position: 'absolute', top: '50%', left: '50%' }}>loading...</Text>;
  
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const repository = repositoryNodes.find((node) => node.id === id );
  const reviewNodes = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryContainer repository={repository} />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default Repository;
