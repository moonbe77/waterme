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
import { IPlant } from '../models/plantsModel'
import { calculateNotificationInterval } from '../service/helpers'

const db = openDatabase()

export default function ModalScreen() {
  const [info, setInfo] = useState<IPlant | null>(null)
  const navigation = useNavigation()
  const toast = useToast()

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `create table if not exists plants (
            id integer primary key not null,
            name text,
            type text,
            image text,
            notificationId text,
            lastWatered text,
            nextWatering text,
            lastFertilized text,
            nextFertilizing text,
            notificationTime text,
            createdOn date,
            createdBy text,
            editedOn date,
            editedBy text,
            notes text)`,
        )
      },
      (error) => {
        console.log('error creating table ', error)
      },
      () => {
        console.log('Table created successfully')
      },
    )
  }, [])

  const dropDb = () => {
    db.transaction(
      (tx) => {
        tx.executeSql('DROP TABLE IF EXISTS plants')
      },
      (error) => {
        console.log('error ERROR', error)
      },
      () => {
        console.log('success')
      },
    )
  }

  const addPlant = () => {
    if (!info?.name) {
      Alert.alert('Please fill info')
      return
    }

    // if nextWatering is  set, set remainder to nextWatering
    if (info?.nextWatering) {
      // convert interval in days to seconds
      const remainder = calculateNotificationInterval(
        Number(info.nextWatering),
        info.notificationTime,
      )

      schedulePushNotification({
        content: {
          title: 'Watering reminder',
          body: `Don't forget to water ${info.name}`,
          data: { data: 'goes here data prop', url: '/details/1' },
        },
        trigger: { seconds: Number(remainder), repeats: true },
      }).then((res) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              'insert into plants (name, type, image, notificationId, nextWatering, nextFertilizing, notificationTime, createdOn) values (?, ?, ?, ?,?,?,?,?)',
              [
                info.name,
                info.type,
                info.image,
                res,
                remainder,
                info.nextFertilizing,
                info?.notificationTime
                  ? info.notificationTime.toISOString()
                  : '',
                new Date().toISOString(),
              ],
            )
          },
          (error) => {
            console.log('error', error)
            Alert.alert('Error', 'Error adding plant')
          },
          () => {
            toast.show({
              title: 'Remainder successfully set',
              variant: 'top-accent',
              duration: 3000,
              placement: 'top',
            })
            //close modal
            navigation.goBack()
          },
        )
      })
    }
  }

  const handleChange = (name, value) => {
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
                console.log({ event, selectedDate })
                handleChange('notificationTime', selectedDate)
              }}
            />
          </Box>
          <Box alignItems="center">
            <Button onPress={addPlant} size="lg">
              <ButtonText>Set Reminder</ButtonText>
            </Button>
          </Box>
          <Pressable onPress={dropDb}>
            <Text color={'red.100'}>DROP TABLE DANGER</Text>
          </Pressable>
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
