import { Heading, View, XStack, Text, ScrollView, Button } from 'tamagui'

// loop over object keys

type Item = {
  label: string
  value: string | number
}

function DayOfWeek({
  items,
  onChange,
  selectedValue,
}: {
  items: Item[]
  onChange: (value: string | number) => void
  selectedValue: number
}) {
  return (
    <View width="100%" overflow="scroll">
      <Heading>Day of Week</Heading>

      <ScrollView horizontal py="$2">
        <XStack gap="$2" backgroundColor={'$blue100'}>
          {items.map((item, key) => (
            <Button
              key={key}
              backgroundColor={
                selectedValue === item.value ? '$green2' : '$green12'
              }
              p="$2"
              borderRadius="$2"
              onPress={() => onChange(item.value)}
            >
              <Text
                color={selectedValue === item.value ? '$green12' : '$green2'}
              >
                {item.label}
              </Text>
            </Button>
          ))}
        </XStack>
      </ScrollView>
    </View>
  )
}

export default DayOfWeek
