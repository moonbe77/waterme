import { TextInput, View } from 'react-native'
import {
  useEditNote,
  useEditNoteActions,
  useNotes,
} from '@/src/hooks/use-notes-store'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, Pressable, Text } from 'react-native'

export default function EditNote() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { title, body } = useEditNote()
  const { onChangeTitle, onChangeBody, saveNote, deleteNote } =
    useEditNoteActions()
  const router = useRouter()

  const notes = useNotes()
  const note = notes.find((note) => note.id === Number(id))

  const isEditing = id !== undefined
  const isiOS = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'

  const DeleteButton = (
    <Pressable
      onPress={() => {
        deleteNote(id)
        router.back()
      }}
    >
      <Text>Delete</Text>
    </Pressable>
  )

  const SaveButton = (
    <View>
      {isEditing && isAndroid && DeleteButton}
      <Pressable
        onPress={() => {
          saveNote(id)
          router.back()
        }}
      >
        <Text>Save</Text>
      </Pressable>
    </View>
  )

  return (
    <View>
      <Stack.Screen
        options={{
          title: id ? 'Edit note' : 'New note',
          headerLeft: () => isEditing && isiOS && DeleteButton,
          headerRight: () => SaveButton,
        }}
      />
      <TextInput
        defaultValue={note?.title ?? ''}
        value={title}
        onChangeText={onChangeTitle}
        placeholder="Title"
      />
      <TextInput
        multiline
        defaultValue={note?.body ?? ''}
        value={body}
        onChangeText={onChangeBody}
        placeholder="Body"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}
