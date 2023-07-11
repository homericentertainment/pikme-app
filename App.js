import Root from './root'
import { Text } from 'react-native';

export default function App() {

  Text.defaultProps = {
    ...Text.defaultProps,
    style: { color: 'white' },
  };
  
  return (
    <Root />
  )
}
