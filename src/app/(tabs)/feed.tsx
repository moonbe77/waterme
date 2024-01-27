import { View, StyleSheet, FlatList } from 'react-native'
import { colors } from '../../theme/colors'
import { Link, useNavigation, useFocusEffect, useRouter } from 'expo-router'

import { Box, Text, VStack, Heading } from '@gluestack-ui/themed'
import { usePlants, usePlantsActions } from '@/src/hooks/use-plants-store'
import type { SelectPlants } from '@/db/schema'

import tz from 'moment-timezone'
import { duration } from 'moment'

const zone = 'Australia/Sydney'

function formatDate(date: string) {
  //convert date to locale
  const localDate = new Date(date)
  const local = tz(date).tz(zone).format('YYYY-MM-DD  hh:mm:ssA z')

  console.log('localDate ', {
    date,
    localDate,
    local,
  })

  return `created ${duration(date)} ago`
}

function Feed() {
  // const router = useRouter()
  // const navigation = useNavigation()
  // const [isLoading, setIsLoading] = React.useState(false)
  // const [info, setInfo] = React.useState<IPlant[]>([])
  const plants = usePlants()
  const actions = usePlantsActions()

  console.log('plants ', plants)

  // // const getData = useCallback(() => {
  // //   setIsLoading(true)
  // //   db.transaction(
  // //     (tx) => {
  // //       tx.executeSql(`select * from plants`, [], (_, { rows }) => {
  // //         console.log('rows ', rows)
  // //         setInfo(rows._array)
  // //       })
  // //     },
  // //     null,
  // //     () => {
  // //       setIsLoading(false)
  // //     },
  // //   )
  // // }, [])

  // const useData = (rows) => {
  //   console.log('rows ', rows)
  //   setInfo(rows)
  //   setIsLoading(false)
  // }
  // const error = (error) => {
  //   console.log('error ', error)
  // }
  // const success = () => {
  //   console.log('success')
  //   setIsLoading(false)
  // }

  // useFocusEffect(
  //   useCallback(() => {
  //     getPlants(useData, error, success)
  //   }, []),
  // )

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => `${item.id}`}
        //  refreshing={isLoading}
        // onRefresh={() => {
        //   actions.refetch()
        // }}
      />
    </View>
  )
}

export default Feed

const Item = ({ item }: { item: SelectPlants }) => (
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
          <Text>{formatDate(item.createdAt)}</Text>
        </View>
        <VStack px="$2" pt="$2" pb="$2">
          <Text>Next Fertilizing: {item.nextFertilizing}</Text>
          <Text>Next watering: {item.nextWatering}</Text>
          <Text>NotificationId: {item.id}</Text>
          {/* <Text>notif time: {item.notificationTime.toString()}</Text> */}
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
