import { StatusBar } from 'expo-status-bar'
import { Alert, Platform, StyleSheet } from 'react-native'
import { schedulePushNotification } from '../service/pushNotifications'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import {
  Pressable,
  Input,
  Box,
  VStack,
  Text,
  Button,
  Heading,
  useToast,
  ButtonText,
  InputField,
} from '@gluestack-ui/themed'
import { View } from '../components/Themed'
import { useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { openDatabase } from '../service/sqlite'
import type { IPlant } from '../models/plantsModel'
import { calculateNotificationInterval } from '../service/helpers'
import { useEditPlantActions } from '../hooks/use-plants-store'

const db = openDatabase()

export default function ModalScreen() {
  const [info, setInfo] = useState<Partial<IPlant> | null>(null)
  const navigation = useNavigation()
  const toast = useToast()
  const add = useEditPlantActions()

  const addPlant = () => {
    add.onChangeName(info?.name || '')
    add.onChangeDescription(info?.description || '')
    add.onChangeNextWatering(info?.nextWatering || '')
    add.onChangeNextFertilizing(info?.nextFertilizing || '')
    add.onChangeNotificationTime(info?.notificationTime || new Date())

    // create unique id
    const id = Math.random().toString(36).substr(2, 9)

    add.savePlant(id)
  }

  const handleChange = (name: string, value: string | number | Date) => {
    console.log({ name, value })
    setInfo((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View>
        <Box alignItems="center" mb={4}>
          <Heading size="xl">Set New Remainder</Heading>
        </Box>
        <VStack
          space="md"
          // overflow="hidden"
          // borderColor="$amber700"
          // background="gray.700"
          // h="full"
          // w="full"
          px="$10"
          // alignItems="center"
        >
          <Box>
            <Input
              id="name"
              size="md"
              isFullWidth={true}
              // color={'white'}
            >
              <InputField
                placeholder="Name / Title"
                onChangeText={(value) => handleChange('name', value)}
                value={info?.name || ''}
              />
            </Input>
          </Box>
          <Box>
            <Input
              id="description"
              size="md"
              isFullWidth={true}
              // color={'white'}
            >
              <InputField
                placeholder="Description"
                onChangeText={(value) => handleChange('description', value)}
                value={info?.description || ''}
              />
            </Input>
          </Box>
          <Box>
            <Input
              // w="1/2"
              id="waterInterval"
              size="md"
            >
              <InputField
                placeholder="Watering interval in days"
                type="text"
                inputMode="numeric"
                value={info?.nextWatering || ''}
                onChangeText={(value) => handleChange('nextWatering', value)}
              />
            </Input>
          </Box>
          <Box>
            <Input id="fertilizingInterval" size="md">
              <InputField
                placeholder="Fertilizing interval in days"
                onChangeText={(value) => handleChange('nextFertilizing', value)}
                inputMode="numeric"
              />
            </Input>
          </Box>

          <Box>
            <Text color="amber.100">Notification Time</Text>
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
          </Box>
          <Box alignItems="center">
            <Button onPress={addPlant} size="lg">
              <ButtonText>Set Reminder</ButtonText>
            </Button>
          </Box>
          {/* <Pressable onPress={dropDb}>
            <Text color={'red.100'}>DROP TABLE DANGER</Text>
          </Pressable> */}
        </VStack>
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
