import { useMemo } from 'react'
import { ChevronDown, ChevronUp, Check, Sprout } from '@tamagui/lucide-icons'
import { LinearGradient } from 'tamagui/linear-gradient'
import {
  Select,
  Adapt,
  Sheet,
  YStack,
  getFontSize,
  type FontSizeTokens,
  type SelectProps,
} from 'tamagui'
import type { N_INTERVAL } from '../models/types'

type CustomSelectProps = SelectProps & {
  value: string
  items: {
    label: string
    value: string
  }[]
  onChange: (val: N_INTERVAL) => void
}

function CustomSelect(props: CustomSelectProps) {
  return (
    <>
      <Select
        id="food"
        value={props.value}
        onValueChange={props.onChange}
        disablePreventBodyScroll
      >
        <Select.Trigger width={220} iconAfter={Sprout}>
          <Select.Value placeholder="Notification Interval" />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={false} // FIXME: add from props
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', 'transparent']}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport
            // to do animations:
            // animation="quick"
            // animateOnly={['transform', 'opacity']}
            // enterStyle={{ o: 0, y: -10 }}
            // exitStyle={{ o: 0, y: 10 }}
            minWidth={100}
          >
            <Select.Group>
              <Select.Label>Interval</Select.Label>
              {/* for longer lists memoizing these is useful */}
              {useMemo(
                () =>
                  props.items.map((item, i) => {
                    return (
                      <Select.Item
                        index={i}
                        key={item.label}
                        value={item.value}
                      >
                        <Select.ItemText>{item.label}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  }),
                [props.items],
              )}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </>
  )
}

export default CustomSelect
