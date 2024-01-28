import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import { schedulePushNotification } from '../service/pushNotifications'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { Input, XStack, Text, Button, Heading, ButtonText } from 'tamagui'
import { View } from '../components/Themed'
import { useNavigation } from 'expo-router'
import { useState } from 'react'

import type { IPlant } from '../models/plantsModel'

import { useEditPlantActions } from '../hooks/use-plants-store'

export default function ModalScreen() {
  const [info, setInfo] = useState<Partial<IPlant> | null>(null)
  const navigation = useNavigation()

  const { actions, plant } = useEditPlantActions()

  const addPlant = () => {
    actions.onChangeName(info?.name || '')
    actions.onChangeDescription(info?.description || '')
    actions.onChangeNextWatering(info?.nextWatering || '')
    actions.onChangeNextFertilizing(info?.nextFertilizing || '')
    actions.onChangeNotificationTime(info?.notificationTime || new Date())

    schedulePushNotification({
      content: {
        title: 'Watering time!',
        body: `Don't forget to water your ${plant?.name}`,
        data: { data: plant },
      },
      trigger: {
        repeats: true,
      },
    }).then((res) => {
      console.log('schedulePushNotification ', res)

      actions.savePlant(res)
    })
    // create unique id
  }

  const handleChange = (name: string, value: string | number | Date) => {
    console.log({ name, value })
    setInfo((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View>
        <View>
          <Heading size="$10">Set New Remainder</Heading>
        </View>
        <XStack alignItems="center" gap="$2">
          <View>
            <Input
              id="name"
              size="$6"
              placeholder="Name / Title"
              onChangeText={(value) => handleChange('name', value)}
              value={info?.name || ''}
            />
          </View>
          <View>
            <Input
              id="description"
              size="$6"
              placeholder="Description"
              onChangeText={(value) => handleChange('description', value)}
              value={info?.description || ''}
            />
          </View>
          <View>
            <Input
              // w="1/2"
              id="waterInterval"
              size="$6"
              placeholder="Watering interval in days"
              // type="text"
              // inputMode="numeric"
              value={info?.nextWatering || ''}
              onChangeText={(value) => handleChange('nextWatering', value)}
            />
          </View>
          <View>
            <Input
              id="fertilizingInterval"
              size="$6"
              placeholder="Fertilizing interval in days"
              onChangeText={(value) => handleChange('nextFertilizing', value)}
              inputMode="numeric"
            />
          </View>

          <View>
            <Text color="red">Notification Time</Text>
            <RNDateTimePicker
              style={{ backgroundColor: 'white' }}
              themeVariant="light"
              display="spinner"
              mode="time"
              value={info?.notificationTime || new Date()}
              onChange={(event, selectedDate) => {
                if (!selectedDate) return
                handleChange('notificationTime', selectedDate)
              }}
            />
          </View>
          <View>
            <Button onPress={addPlant} size="$6">
              <ButtonText>Set Reminder</ButtonText>
            </Button>
          </View>
          {/* <Pressable onPress={dropDb}>
            <Text color={'red.100'}>DROP TABLE DANGER</Text>
          </Pressable> */}
        </XStack>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  line: {
    borderColor: '#eee',
    borderWidth: 1,
    marginVertical: 15,
    width: 60,
    height: 10,
    marginLeft: '50%',
    transform: [{ translateX: -30 }],
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  contentWrapper: {
    backgroundColor: '#ff5',
    flex: 1,
    width: '100%',
    height: '100%',
  },
})
