/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as FileSystem from 'react-native-fs';

const App = () => {
  const [carCount, setCarCount] = useState(0);
  const [truckCount, setTruckCount] = useState(0);
  const [otherVehicleCount, setOtherVehicleCount] = useState(0);

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
          <Button
            title="Save"
            onPress={() => saveToFile(carCount, truckCount, otherVehicleCount)}
          />
          <Button
            title="Reset"
            onPress={() => {
              setCarCount(0);
              setTruckCount(0);
              setOtherVehicleCount(0);
            }}
          />
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

function saveToFile(carCount: number, truckCount: number, otherVehicleCount: number): void {
  const header: string = 'Car,Truck,Else,Total,Date';
  let content: string = header + '\n';
  const totalCount: number = carCount + truckCount + otherVehicleCount;
  const currentTime: Date = new Date();
  content += `${carCount},${truckCount},${otherVehicleCount},${totalCount},${currentTime.toISOString()}`;
  FileSystem.writeFile(getFilePath(currentTime), content);
}

function getFilePath(currentTime: Date) {
  const year: number = currentTime.getFullYear();
  const month: number = currentTime.getMonth();
  const day: number = currentTime.getDate();
  const hour: number = currentTime.getHours();
  const minute: number = currentTime.getMinutes();
  const fileName: string = `traffic-counter_${year}-${month}-${day}_${hour}-${minute}.csv`;

  return FileSystem.ExternalDirectoryPath + '/' + fileName;
}

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
