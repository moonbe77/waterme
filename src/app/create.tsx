import { StatusBar } from 'expo-status-bar'
import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import useSetNotification from '@/src/service/useSetNotification'

import {
  Input,
  Text,
  TextArea,
  Button,
  Label,
  Heading,
  ButtonText,
  YStack,
  ScrollView,
  View,
  XStack,
} from 'tamagui'

import { useNavigation } from 'expo-router'

import {
  useEditPlant,
  useEditPlantActions,
  useEditPlantError,
} from '../hooks/use-plants-store'
import CustomSelect from '../components/CustomSelect'
import ScrollSelect from '../components/ScrollSelect'
import { weekday } from '../config/constants'
import { N_INTERVAL } from '../models/types'

// type CalInterval = {
//   label: string
//   value: N_INTERVAL
// }

// const calendarInterval: CalInterval[] = [
//   { label: 'Daily', value: N_INTERVAL.daily },
//   { label: 'Weekly', value: N_INTERVAL.weekly },
//   { label: 'Monthly', value: N_INTERVAL.monthly },
//   { label: 'Yearly', value: N_INTERVAL.yearly },
// ]

export default function ModalScreen() {
  const navigation = useNavigation()
  const plant = useEditPlant()
  const actions = useEditPlantActions()
  // const error = useEditPlantError()
  const { mutate, error } = useSetNotification()

  const addPlant = () => {
    // TODO: create unique id ATM USING THE NOTIFICATION ID
    // const id = Math.random().toString(36).substr(2, 9)

    mutate(
      {
        days: Number(plant.notificationInterval),
        time: {
          hours: Number(plant.notificationTime),
          minutes: Number(plant.notificationMinutes),
        },
        title: plant.name,
        body: plant.description ?? 'Here is the notification body ',
        subtitle: 'subtitle TEST ',
        data: { data: 'goes here', url: '/feed' },
      },
      {
        onSuccess: (data) => {
          // IF SUCCESS SAVE TO DB
          console.log('notification created', data)
          actions.savePlant(data)
          navigation.goBack()
        },
      },
    )
  }

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <View backgroundColor="$green2" padding="$4" width="100%" height="100%">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View>{error && <Text color="$red10">{error.message}</Text>}</View>
            <YStack
              alignItems="center"
              gap="$6"
              paddingHorizontal="$2"
              marginTop="$2"
            >
              <Heading size="$3">Create a new plant</Heading>
              <XStack gap="$2m" space="$4">
                <Label>Plant Name</Label>
                <Input
                  id="name"
                  flex={1}
                  placeholder="Name / Title"
                  onChangeText={(value) => actions.onChange('name', value)}
                  value={plant.name}
                />
              </XStack>
              <YStack gap="$0.5" width="100%" space="$4">
                <Label>Description</Label>
                <TextArea
                  id="description"
                  flex={1}
                  placeholder="Description"
                  rows={4}
                  onChangeText={(value) => {
                    actions.onChange('description', value)
                  }}
                  value={plant.description ?? ''}
                />
              </YStack>

              <XStack gap="$4" width="90%" space="$4">
                <Label> Notification Interval</Label>

                <Input
                  id="notificationInterval"
                  flex={1}
                  placeholder="Notification Interval in days"
                  inputMode="numeric"
                  onChangeText={(value) =>
                    actions.onChange('notificationInterval', value)
                  }
                  value={plant.notificationInterval ?? ''}
                />
              </XStack>

              <Heading size="$4">Time</Heading>
              <XStack width="100%" gap="$4">
                <YStack flex={1}>
                  <Label> Hour</Label>
                  <Input
                    id="notificationHour"
                    placeholder="Hours"
                    inputMode="numeric"
                    onChangeText={(value) =>
                      actions.onChange('notificationTime', value)
                    }
                    value={plant.notificationTime ?? ''}
                  />
                </YStack>
                <YStack flex={1}>
                  <Label> Minutes</Label>
                  <Input
                    id="notificationMinute"
                    placeholder="Notification Interval in days"
                    inputMode="numeric"
                    onChangeText={(value) =>
                      actions.onChange('notificationMinutes', value)
                    }
                    value={plant.notificationMinutes ?? ''}
                  />
                </YStack>
              </XStack>

              {/* <View>
                <Heading size="$3">Interval</Heading>

                <ScrollSelect
                  items={calendarInterval}
                  onChange={(item) =>
                    actions.onChange('notificationInterval', `${item.value}`)
                  }
                  selectedValue={plant.notificationInterval}
                />
                <Heading size="$3">Day of Week</Heading>
                <ScrollSelect
                  items={weekday}
                  onChange={(item) =>
                    actions.onChange('notificationDay', item.value)
                  }
                  selectedValue={plant.notificationDay}
                />
              </View> */}

              {/*

                <Input
                  id="waterInterval"
                  size="$6"
                  placeholder="Watering interval in days"
                  value={info?.nextWatering || ''}
                  onChangeText={(value) => handleChange('nextWatering', value)}
                  inputMode="numeric"
                  width="100%"
                />

                <Input
                  id="fertilizingInterval"
                  size="$6"
                  placeholder="Fertilizing interval in days"
                  onChangeText={(value) =>
                    handleChange('nextFertilizing', value)
                  }
                  inputMode="numeric"
                  width="100%"
                /> */}

              {/* <View> */}
              {/* <Text color="$">Notification Time</Text> */}
              {/* <RNDateTimePicker
                    style={{ backgroundColor: 'red' }}
                    themeVariant="light"
                    display="spinner"
                    mode="time"
                    value={info?.notificationTime || new Date()}
                    onChange={(event, selectedDate) => {
                      if (!selectedDate) return
                      handleChange('notificationTime', selectedDate)
                    }}
                  /> */}
              {/* </View> */}
              <View>
                <Button onPress={addPlant} size="$6">
                  <ButtonText>Set Reminder</ButtonText>
                </Button>
              </View>

              <View>
                <Text>{JSON.stringify(plant, null, 2)}</Text>
              </View>
              {/* <Pressable onPress={dropDb}>
            <Text color={'red.100'}>DROP TABLE DANGER</Text>
          </Pressable> */}
            </YStack>
          </ScrollView>
        </TouchableWithoutFeedback>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </KeyboardAvoidingView>
  )
}
