import { Stack } from 'expo-router'

const Layout = (): JSX.Element => {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#467fd3'
    },
    headerTintColor: '#ffffff',
    headerTitle: 'MemoApp',
    headerBackTitle: 'Back',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold'
    }
  }}/>
}

export default Layout
