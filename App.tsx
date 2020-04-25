/**
 * Main component & SPA starting point.
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  ToastAndroid,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as FileSystem from 'react-native-fs';

const App = () => {
  const [carCount, setCarCount] = useState(0);
  const [truckCount, setTruckCount] = useState(0);
  const [otherVehicleCount, setOtherVehicleCount] = useState(0);
  const [isWritingFile, setIsWritingFile] = useState(false);

  const resetCounter: Function = () => {
    setCarCount(0);
    setTruckCount(0);
    setOtherVehicleCount(0);
  };

  const pressSaveReset: (ev: NativeSyntheticEvent<TouchEvent>) => void = () => {
    setIsWritingFile(true);
    const currentTime: Date = new Date();
    saveToFile(carCount, truckCount, otherVehicleCount, currentTime)
      .then(() => {
        resetCounter();
        ToastAndroid.show(
          `File has been written to: ${getFilePath(currentTime)}`,
          ToastAndroid.SHORT
        );
        setIsWritingFile(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContent}>
            <Text onPress={() => setCarCount(decrementCount(carCount))}> - </Text>
            Cars
            <Text onPress={() => setCarCount(incrementCount(carCount))}> + </Text>
          </Text>
          <Text style={styles.sectionContent}>Count: {carCount}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContent}>
            <Text onPress={() => setTruckCount(decrementCount(truckCount))}> - </Text>
            Trucks
            <Text onPress={() => setTruckCount(incrementCount(truckCount))}> + </Text>
          </Text>
          <Text style={styles.sectionContent}>Count: {truckCount}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContent}>
            <Text onPress={() => setOtherVehicleCount(decrementCount(otherVehicleCount))}> - </Text>
            Else
            <Text onPress={() => setOtherVehicleCount(incrementCount(otherVehicleCount))}> + </Text>
          </Text>
          <Text style={styles.sectionContent}>Count: {otherVehicleCount}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContent}>
            Total: {carCount + truckCount + otherVehicleCount}
          </Text>
          <Button title="Save & Reset" disabled={isWritingFile} onPress={pressSaveReset} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Increament the given number + 1.
 */
function incrementCount(count: number): number {
  return count + 1;
}

/**
 * Decrements the given number - 1.
 * The result won't fall under 0.
 */
function decrementCount(count: number): number {
  if (count < 1) {
    return 0;
  }

  return count - 1;
}

/**
 * Save the vehicle counts into a CSV file.
 */
function saveToFile(
  carCount: number,
  truckCount: number,
  otherVehicleCount: number,
  currentTime: Date
): Promise<void> {
  const header: string = 'Car,Truck,Else,Total,Date';
  let content: string = header + '\n';
  const totalCount: number = carCount + truckCount + otherVehicleCount;
  content += `${carCount},${truckCount},${otherVehicleCount},${totalCount},${currentTime.toISOString()}`;

  return FileSystem.writeFile(getFilePath(currentTime), content);
}

/**
 * The file path including file name to store the counter.
 * The file name includes a date to easier identify files when uploading them somewhere else.
 */
function getFilePath(currentTime: Date) {
  const year: number = currentTime.getFullYear();
  const month: number = currentTime.getMonth();
  const day: number = currentTime.getDate();
  const hour: number = currentTime.getHours();
  const minute: number = currentTime.getMinutes();
  const fileName: string = `traffic-counter_${year}-${month}-${day}_${hour}-${minute}.csv`;

  return FileSystem.ExternalDirectoryPath + '/' + fileName;
}

// basic app styling
const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContent: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: '400',
    color: Colors.dark,
  },
});

export default App;
