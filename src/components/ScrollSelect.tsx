import { Heading, View, XStack, Text, ScrollView, Button } from 'tamagui'

// loop over object keys

type Item = {
  label: string
  value: string | number
}

const ScrollSelect = <TItem extends Item>({
  items,
  onChange,
  selectedValue,
}: {
  items: TItem[]
  onChange: (value: TItem) => void
  selectedValue: any
}) => {
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
              onPress={() => onChange(item)}
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

// ScrollSelect({
// 	items: [
// 	{
// 		label: 'label'
// 		value: '123'
// 	}
// 	]
// })

export default ScrollSelect
