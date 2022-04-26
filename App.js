import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
//import GoogleFit, { Scopes } from 'react-native-google-fit'

function App() {
 
/*const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
  ],
}
GoogleFit.authorize(options)
  .then(authResult => {
    if (authResult.success) {
      dispatch("AUTH_SUCCESS");
    } else {
      dispatch("AUTH_DENIED", authResult.message);
    }
  })
  .catch(() => {
    dispatch("AUTH_ERROR");
  })
  // ...
  // Call when authorized
  GoogleFit.startRecording((callback) => {
    const opt = {
      startDate: "2017-01-01T00:00:17.971Z", // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
      bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1. 
    };
    
    GoogleFit.getDailyStepCountSamples(opt)
     .then((res) => {
         console.log('Daily steps >>> ', res)
     })
     .catch((err) => {console.warn(err)});
    
    // or with async/await syntax
    async function fetchData() {
      const res = await GoogleFit.getDailyStepCountSamples(opt);
      console.log(res);
    }
    
    // shortcut functions, 
    // return weekly or daily steps of given date
    // all params are optional, using new Date() without given date, 
    // adjustment is 0 by default, determine the first day of week, 0 == Sunday, 1==Monday, etc.
    GoogleFit.getDailySteps(date).then().catch()
    GoogleFit.getWeeklySteps(date, adjustment).then().catch()
  // Process data from Google Fit Recording API (no google fit app needed)
});*/
    return(
      <UserContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserContextProvider>
    )
    /*
      GoogleFit.checkIsAuthorized().then(() => {
        console.log(GoogleFit.isAuthorized) // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
    })*/
}

export default App;
