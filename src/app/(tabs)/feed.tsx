import React, { useCallback } from 'react'
import { View, StyleSheet, Pressable, FlatList } from 'react-native'

import { colors } from '../../theme/colors'
import { Link, useNavigation, useFocusEffect, useRouter } from 'expo-router'
import { openDatabase } from '../../service/sqlite'
import { IPlant } from '../../models/plantsModel'

import { deleteAll, getPlants } from '../../service/db_services'
import { Box, Text, VStack, Heading } from '@gluestack-ui/themed'

const db = openDatabase()
function Feed(props) {
  const router = useRouter()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = React.useState(false)
  const [info, setInfo] = React.useState<IPlant[]>([])

  // const getData = useCallback(() => {
  //   setIsLoading(true)
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(`select * from plants`, [], (_, { rows }) => {
  //         console.log('rows ', rows)
  //         setInfo(rows._array)
  //       })
  //     },
  //     null,
  //     () => {
  //       setIsLoading(false)
  //     },
  //   )
  // }, [])

  const useData = (rows) => {
    console.log('rows ', rows)
    setInfo(rows)
    setIsLoading(false)
  }
  const error = (error) => {
    console.log('error ', error)
  }
  const success = () => {
    console.log('success')
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      getPlants(useData, error, success)
    }, []),
  )

  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={deleteAll}>
          <Text>Delete all</Text>
        </Pressable>
      </View>
      <FlatList
        data={info}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => `${item.id}`}
        refreshing={isLoading}
        onRefresh={() => {
          getPlants(useData, error, success)
        }}
      />
    </View>
  )
}

export default Feed

const Item = ({ item }: { item: IPlant }) => (
  <Box
    maxWidth="$full"
    maxHeight={200}
    borderColor="$borderLight300"
    borderRadius="$lg"
    borderWidth="$1"
    my="$4"
    p="$4"
    overflow="hidden"
    $light-bg="white"
    $base-mx="$5"
    $dark-bg="$backgroundDark800"
    $dark-borderColor="$borderDark800"
    key={item.id}
  >
    <Link href={`/details/${item.id}`}>
      {/* <Image source={item.image} style={styles.image} contentFit="cover" /> */}
      <Box>
        <View>
          <Heading>{item.name}</Heading>
          <Text>
            {`${getFormattedDate(item.createdOn)} - ${getFormattedTime(
              item.createdOn,
            )}`}
          </Text>
        </View>
        <VStack px="$2" pt="$2" pb="$2">
          <Text>Next Fertilizing: {item.nextFertilizing}</Text>
          <Text>Next watering: {item.nextWatering}</Text>
          <Text>NotificationId: {item.notificationId}</Text>
          <Text>notif time: {item.notificationTime.toString()}</Text>
        </VStack>
      </Box>
    </Link>
  </Box>
)

const getFormattedDate = (value: Date) => {
  if (!value) return ''
  const date = new Date(value)
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}
const getFormattedTime = (value: Date) => {
  if (!value) return ''
  const date = new Date(value)
  return `${date.getHours()}:${date.getMinutes()}`
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5,
    height: 200,
    shadowOffset: { width: 0, height: 0 },
  },
  link: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  cardContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
  },
  titleWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'red',
  },
  createdOn: {
    fontSize: 12,
    color: 'red',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: colors.grape,
  },
  type: {
    fontSize: 16,
  },
})

//list of plants
const data = [
  {
    id: 1,
    name: 'Plant 1',
    type: 'type 1',
    image:
      'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget velit vitae libero sodales aliquet. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquam nisl, vitae aliquam nisl nisl vitae nisl. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquam nisl, vitae aliquam nisl nisl vitae nisl.',
    timer: new Date(),
  },
  {
    id: 2,
    name: 'Plant 2',
    type: 'type 2',
    image:
      'https://images.unsplash.com/photo-1555037015-1498966bcd7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    description: 'test',
    timer: new Date(),
  },
]
