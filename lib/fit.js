import GoogleFit, {BucketUnit} from 'react-native-google-fit';

const info = {
  step: 0,
  dist: 0,
  kcal: 0,
  Htime: 0,
};

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() + 1);
function timeset(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
}
timeset(today);
timeset(yesterday);

const opt = {
  startDate: today.toISOString(),
  endDate: yesterday.toISOString(),
  bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
};

export async function fetchData() {
  let res = await GoogleFit.getDailyStepCountSamples(opt);

  if (res.length !== 0) {
    for (var i = 0; i < res.length; i++) {
      if (res[i].source === 'com.google.android.gms:estimated_steps') {
        if (res[i].steps[0] === undefined) {
          info.step = 0;
        } else {
          info.step = res[i].steps[0].value;
        }
      }
    }
  } else {
    console.log('Not Found');
  }
  // STEP
  res = await GoogleFit.getDailyCalorieSamples(opt);
  console.log(res);
  if (res[0].calorie === undefined) {
    info.kcal = 0;
  } else {
    info.kcal = parseInt(res[0].calorie);
  }
  //kcal
  res = await GoogleFit.getDailyDistanceSamples(opt);
  if (res[0] === undefined) {
    info.dist = 0;
  } else {
    info.dist = parseInt(res[0].distance);
  }
  //Htime
  res = await GoogleFit.getMoveMinutes(opt);
  if (res[0] === undefined) {
    info.Htime = 0;
  } else {
    info.Htime = parseInt(res[0].duration);
  }

  console.log(info);
  //dist

  return info;
}
