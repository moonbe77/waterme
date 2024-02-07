import { StyleSheet, FlatList } from 'react-native'
import { colors } from '../../theme/colors'
import { Link, useNavigation, useFocusEffect, useRouter } from 'expo-router'
import {
  View,
  Text,
  YStack,
  Heading,
  XStack,
  Card,
  styled,
  Image,
  type CardProps,
} from 'tamagui'
import { usePlants, usePlantsActions } from '@/src/hooks/use-plants-store'
import type { Plant } from '@/db/schema'
import tz from 'moment-timezone'
import { useEffect, useState } from 'react'
import {
  getNextTriggerDate,
  getNotificationById,
} from '@/src/service/notifications'
import type { NotificationRequest } from 'expo-notifications'
import moment from 'moment'

const zone = 'Australia/Sydney'

function UTCtoSyd(date: Date) {
  //convert date to locale
  const local = tz(date).tz(zone).format('YYYY-MM-DD  hh:mm:ssA z')

  return local
}

const parseDate = (date: Date) => {
  //convert date to locale
  const parsed = moment(date).format('YYYY-MM-DD  hh:mm:ssA z')

  return parsed
}

const getCreatedTime = (date: string) => {
  const local = tz(date).tz(zone)
  const now = tz().tz(zone)
  const diff = now.diff(local, 'days')

  return `Created ${diff} days ago`
}

function Feed() {
  const navigation = useNavigation()
  // const [isLoading, setIsLoading] = React.useState(false)
  // const [info, setInfo] = React.useState<IPlant[]>([])

  const plants = usePlants()
  const actions = usePlantsActions()

  // console.log('router ', { navigation })
  console.log('plants ', plants)

  useEffect(() => {
    // refetch if navigating to this screen
    navigation.addListener('focus', () => {
      actions.refetch()
    })

    // cleanup
    return () => {
      navigation.removeListener('focus', () => {
        actions.refetch()
      })
    }
  }, [navigation, actions])

  const handlePress = (id: string) => {
    // navigation.navigate('details', { slug: id })

    console.log('handlePress TODO: ADD NAVIGATION TO DETAIL SCREENS', id)
  }

  return (
    <Container>
      <FlatList
        data={plants}
        renderItem={({ item }) => <Item item={item} onPress={handlePress} />}
        keyExtractor={(item) => `${item.id}`}

        //  refreshing={isLoading}
        // onRefresh={() => {
        //   actions.refetch()
        // }}
      />
    </Container>
  )
}

export default Feed

const Item = ({
  item,
  // onPress,
}: {
  item: Plant
  onPress: (id: string) => void
}) => {
  const [notification, setNotification] = useState<
    NotificationRequest | undefined
  >()
  const [next, setNext] = useState<Date | undefined>()
  useEffect(() => {
    getNotificationById(item.id).then((res) => {
      setNotification(res)
    })
  }, [item.id])

  useEffect(() => {
    if (!notification) return
    getNextTriggerDate(notification)
      .then((res) => {
        setNext(res)
      })
      .catch((error) => {
        alert('Error getting next date')
        setNext(undefined)
      })
  }, [notification])

  const onPress = async (id: string) => {
    if (!notification) return
    const test = await getNextTriggerDate(notification)
    console.log('test', test?.toISOString())
  }

  return (
    <Card
      elevate
      bordered
      size="$4"
      width="100%"
      height={250}
      marginBottom="$4"
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.975 }}
      onPress={() => {
        onPress(item.id)
      }}
    >
      <Card.Header
        padded
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Heading>{item.name}</Heading>
        <View>
          <Text>{getCreatedTime(item.createdAt)}</Text>
        </View>
      </Card.Header>

      <View>
        <YStack px="$2" pt="$2" pb="$2">
          <Text fontSize="$6">Id: {item.id}</Text>
          <Text fontSize="$6">Type: {notification?.trigger.type}</Text>
          <View my="$3">
            {next && <Text>UTC: {UTCtoSyd(next)}</Text>}
            {next && <Text>UTC: {parseDate(next)}</Text>}
          </View>
          {/* <Text fontSize="$6">Next Fertilizing: {item.nextFertilizing}</Text>
        <Text fontSize="$6">Next watering: {item.nextWatering}</Text> */}
          {/* <Text>notif syd: {UTCtoSyd(item.notificationTime ?? '')}</Text> */}
        </YStack>
      </View>
      <Card.Footer padded>
        <Text fontSize="$6">NotificationId: {item.notificationId}</Text>
      </Card.Footer>
      <Card.Background>
        {/* <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            uri: '',
          }}
        /> */}
      </Card.Background>
      {/* </Link> */}
    </Card>
  )
}

// const getFormattedDate = (value: Date) => {
//   if (!value) return ''
//   const date = new Date(value)
//   return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
// }
// const getFormattedTime = (value: Date) => {
//   if (!value) return ''
//   const date = new Date(value)
//   return `${date.getHours()}:${date.getMinutes()}`
// }

export const Container = styled(View, {
  name: 'cards-container', // useful for debugging, and Component themes
  // borderRadius: 100_000_000,
  padding: 10,
  backgroundColor: '$blue1',
  flex: 1,
})
