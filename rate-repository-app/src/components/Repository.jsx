import { Image, Pressable, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useParams } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import * as Linking from 'expo-linking';

const RepositoryContainer = ({ item }) => {
  return (
    <View testID="repositoryItem" style={{ backgroundColor: 'white', padding: 10 }}>
      <View style={{ display: "flex", flexDirection: 'row' }}>
        <Image source={{uri: item.ownerAvatarUrl}} style={{ width: 50, height: 50, borderRadius: 5 }} />
        <View style={{ marginLeft: 10, flexShrink: 1, alignItems: "flex-start" }}>
          <Text style={{ marginBottom: 5 }} fontWeight={'bold'}>{item.fullName}</Text>
          <Text style={{ marginBottom: 5 }}>{item.description}</Text>
          <Text style={{ backgroundColor: theme.colors.primary, color: 'white', paddingVertical: 2, paddingHorizontal: 4, borderRadius: 5 }}>{item.language}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: "space-around" }}>
        <View style={{ alignItems: 'center' }}>
          <Text fontWeight={'bold'}>{item.stargazersCount >= 1000 ? `${(item.stargazersCount / 1000).toFixed(1)}k` : item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text fontWeight={'bold'}>{item.forksCount >= 1000 ? `${(item.forksCount / 1000).toFixed(1)}k` : item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text fontWeight={'bold'}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text fontWeight={'bold'}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      <Pressable onPress={() => Linking.openURL(item.url)}>
        <Text style={{ backgroundColor: theme.colors.primary, color: 'white', textAlign: 'center', marginTop: 10, paddingVertical: 15, borderRadius: 5, fontWeight: 'bold' }}>Open in Github</Text>
      </Pressable>
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

  const item = repositoryNodes.find((node) => node.id === id );

  return (
    <RepositoryContainer item={item} />
  );
};

export default Repository;
