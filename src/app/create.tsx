import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { schedulePushNotification } from '../service/pushNotifications'

import {
  Input,
  Text,
  Button,
  Heading,
  ButtonText,
  YStack,
  ScrollView,
  View,
} from 'tamagui'

import { useNavigation } from 'expo-router'
import type { IPlant } from '../models/plantsModel'
import {
  useEditPlant,
  useEditPlantActions,
  useEditPlantError,
} from '../hooks/use-plants-store'
import CustomSelect from '../components/CustomSelect'

const calendarInterval = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
]

export default function ModalScreen() {
  const navigation = useNavigation()
  const plant = useEditPlant()
  const actions = useEditPlantActions()
  const error = useEditPlantError()

  const addPlant = () => {
    // TODO: create unique id
    const id = Math.random().toString(36).substr(2, 9)
    console.log({ plant, id })
    actions.savePlant(id)
  }

  const handleChange = (name: string, value: string | number | Date) => {
    console.log({ name, value })
    // setInfo((prev) => ({ ...prev, [name]: value }))
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
              paddingHorizontal="$6"
              marginTop="$2"
            >
              <Input
                id="name"
                size="$5"
                placeholder="Name / Title"
                // onChangeText={(value) => handleChange('name', value)}
                onChangeText={actions.onChangeName}
                value={plant.name}
                width="100%"
              />

              <Input
                id="description"
                size="$6"
                placeholder="Description"
                onChangeText={actions.onChangeDescription}
                value={plant.description}
                width="100%"
              />

              <View>
                <Text color="$blue10">Schedule Remainder</Text>
                <CustomSelect
                  items={calendarInterval}
                  onChange={actions.onChangeNextWatering}
                  value={plant.nextFertilizing}
                />
              </View>

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
