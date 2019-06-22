import { createStackNavigator } from "react-navigation";
import Main from "./components/Main"
import Gallery from "./components/Gallery"
import CameraScreen from "./components/CameraScreen"
import BigPhoto from "./components/BigPhoto"

const App = createStackNavigator({
  s1: { screen: Main },
  s2: { screen: Gallery },
  s3: { screen: CameraScreen },
  s4: { screen: BigPhoto }
});

export default App;