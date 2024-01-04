import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface Props {
  onPress?: () => void
}
const LogOutButton = (props: Props): JSX.Element => {
  const { onPress } = props
  return (
      <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>ログアウト</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    lineHeight: 24
  }
})

export default LogOutButton
