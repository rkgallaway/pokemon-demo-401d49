import { StyleSheet, Text, View } from 'react-native';
import useGetAxios from './hooks/getAxios';
import { Box, Button, Center, NativeBaseProvider, Pressable, VStack } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import ScrollTileList from './Components/ScrollableTileList';
import * as Haptics from 'expo-haptics';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function App() {
  const { results, getNext, next } = useGetAxios('https://pokeapi.co/api/v2/pokemon');

  return (
    <NativeBaseProvider config={config}>
      <Box safeArea>
        <Box
          bg={'primary.800'}
          p="5" 
          rounded="xl"
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            textAlign: 'center'
          }}>
          Pokemon List
        </Box>

        <VStack mt="3" space={3} alignItems="center">

          <ScrollTileList
            data={results}
            renderItem={(item) => (
              <Pressable w="40%" onPress={() => Haptics.selectionAsync()}>
                <Center
                  key={item.url}

                  rounded="xl"
                  bg={{
                    linearGradient: {
                      colors: ['amber.700', 'primary.600'],
                      start: [0, 0],
                      end: [1, 0]
                    }
                  }}
                  p="3"
                  m="1"
                  _text={{
                    fontSize: 'md',
                    fontWeight: 'medium',
                    color: 'warmGray.50',
                    textAlign: 'center'
                  }}

                >
                  {item.name}
                </Center>
              </Pressable>
            )}
          />
        </VStack>
        <Button mt="5" onPress={() => getNext(next)} >Next</Button>
      </Box>

    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
