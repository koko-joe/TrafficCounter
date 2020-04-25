# TrafficCounter

Weekly project from [https://weeklyproject.club/](https://weeklyproject.club/) (week 16 2020)

A simple app to count vehicles.
The vehicle types are hard coded.
You can save the current count to a CSV file on your phone.
Saving to file resets the counter.
The app currently only supports Android!

## Installation

1. follow [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup) to install React Native
1. npm install
1. npx react-native run-android
1. npx react-native start

## Original Requirements

Jules is a drawbridge operator. Their job is to communicate with boats on the river when the bridge will open and how long the bridge needs to be open.

Jules has been asked by a city planner to keep track of how many cars and large trucks drive over the bridge during certain times of the day. For a half-hour every day Jules needs to keep track of:

1. How many vehicles drive over the bridge
1. How many of those vehicles are cars
1. How many of those vehicles are semi-trucks

Since Jules still has to keep track of the boats on the river, they would like to have a simple program that will:

1. Keep a tally of the total number of vehicles
1. Keep a tally of the number of large trucks
1. Keep a tally of the number of cars
1. Be easy to use while watching the road
1. Output the totals in a text file.

On way to be easy to use while watching the road would be to have a simple terminal app that keeps track of the number of times the user presses ‘t’ and ‘c’. A more ambitious way could be a mobile app or website that has two very large buttons on either side of the screen.

If you’re feeling ambitious, add the ability for the user to add new custom vehicle type to track.
