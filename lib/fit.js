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
  date.setHours(24);
  date.setMinutes(0);
  date.setSeconds(0);
}
timeset(today);
timeset(yesterday);

const opt = {
  startDate: today.toISOString(),
  endDate: yesterday.toISOString(),
  bucketUnit: BucketUnit.DAY,
};

export async function fetch() {
  const day = new Date();

  const opt = {
    startDate: '2022-05-08T15:00:17.971Z',
    endDate: '2022-05-09T15:00:17.971Z',
    bucketUnit: BucketUnit.DAY,
  };

  let res = await GoogleFit.getMoveMinutes(opt);
  console.log(res);
}

fetch();

export async function fetchData() {
  let res = await GoogleFit.getDailySteps(opt);

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

  info.kcal = parseInt(info.step * (1 / 30));

  //kcal

  today.setDate(today.getDate() - 1);
  yesterday.setDate(yesterday.getDate() - 1);

  const opt_2 = {
    startDate: today.toISOString(),
    endDate: yesterday.toISOString(),
    bucketUnit: BucketUnit.DAY,
  };

  res = await GoogleFit.getDailyDistanceSamples(opt_2);
  if (res[0] === undefined) {
    info.dist = 0;
  } else {
    info.dist = parseInt(res[0].distance);
  }
  //Htime
  res = await GoogleFit.getMoveMinutes(opt_2);

  if (res[0] === undefined) {
    info.Htime = 0;
  } else {
    info.Htime = parseInt(res[0].duration);
  }
  //dist

  return info;
}

export async function fetchWeekStep() {
  let weekinfo = [];
  for (var i = 0; i < 7; i++) {
    const week = new Date();
    week.setDate(week.getDate() - 8);
    week.setHours(week.getHours() + 9);
    timeset(week);
    week.setDate(week.getDate() + i);
    const week_ = new Date(week);
    week_.setDate(week.getDate() + 1);

    const opt = {
      startDate: week.toISOString(),
      endDate: week_.toISOString(),
    };

    let res = await GoogleFit.getDailyStepCountSamples(opt);
    let res_ = await GoogleFit.getDailyCalorieSamples(opt);

    for (var j = 0; j < res.length; j++) {
      if (res[j].source === 'com.google.android.gms:estimated_steps') {
        if (res[j].steps[0] === undefined) {
          const data = {
            value: 0,
            day: res_[0].day,
          };
          weekinfo = [...weekinfo, data];
        } else {
          const data = {
            value: res[j].steps[0].value,
            day: res_[0].day,
          };
          weekinfo = [...weekinfo, data];
        }
      }
    }
  }
  return weekinfo;
}

//fetchWeekStep();

export async function fetchWeekkcal() {
  let weekinfo = [];
  for (var i = 0; i < 7; i++) {
    const week = new Date();
    week.setDate(week.getDate() - 8);
    week.setHours(week.getHours() + 9);
    timeset(week);
    week.setDate(week.getDate() + i);
    const week_ = new Date(week);
    week_.setDate(week.getDate() + 1);

    const opt = {
      startDate: week.toISOString(),
      endDate: week_.toISOString(),
    };

    let res = await GoogleFit.getDailyCalorieSamples(opt);

    if (res[0] === undefined) {
      let data = {
        value: 0,
        day: res[0].day,
      };
      weekinfo = [...weekinfo, data];
    } else {
      let data = {
        value: parseInt(res[0].calorie - 1433.25),
        day: res[0].day,
      };
      weekinfo = [...weekinfo, data];
    }
  }
  return weekinfo;
}

export async function fetchWeekdist() {
  let weekinfo = [];
  for (var i = 0; i < 7; i++) {
    const week = new Date();
    week.setDate(week.getDate() - 8);
    week.setHours(week.getHours() + 9);
    timeset(week);
    week.setDate(week.getDate() + i);
    const week_ = new Date(week);
    week_.setDate(week.getDate() + 1);

    const opt = {
      startDate: week.toISOString(),
      endDate: week_.toISOString(),
    };

    let res = await GoogleFit.getDailyDistanceSamples(opt);
    let res_ = await GoogleFit.getDailyCalorieSamples(opt);

    if (res[0] === undefined) {
      let data = {
        value: 0,
        day: res_[0].day,
      };
      weekinfo = [...weekinfo, data];
    } else {
      let data = {
        value: res[0].distance,
        day: res_[0].day,
      };
      weekinfo = [...weekinfo, data];
    }
  }
  return weekinfo;
}

export async function fetchWeekduration() {
  let weekinfo = [];
  for (var i = 0; i < 7; i++) {
    const week = new Date();
    week.setDate(week.getDate() - 8);
    week.setHours(week.getHours() + 9);
    timeset(week);
    week.setDate(week.getDate() + i);
    const week_ = new Date(week);
    week_.setDate(week.getDate() + 1);

    const opt = {
      startDate: week.toISOString(),
      endDate: week_.toISOString(),
    };

    let res = await GoogleFit.getMoveMinutes(opt);
    let res_ = await GoogleFit.getDailyCalorieSamples(opt);

    if (res[0] === undefined) {
      let data = {
        value: 0,
        day: res_[0].day,
      };
      weekinfo = [...weekinfo, data];
    } else {
      let data = {
        value: res[0].duration,
        day: res_[0].day,
      };
      weekinfo = [...weekinfo, data];
    }
  }
  return weekinfo;
}
