//if we add workouts, we need to change all the constants here and the Promise.all() in Add.js and Home.js.
export const WORKOUTS = [   {name: 'benchpress', id: 1, url: require('../../assets/workouts/1.png')},
                            {name: 'deadlift', id: 2, url: require('../../assets/workouts/2.png')},
                            {name: 'squat', id: 3, url: require('../../assets/workouts/3.png')},
                            {name: 'chin-up', id: 4, url: require('../../assets/workouts/4.png')},
                            {name: 'pull-up', id: 5, url: require('../../assets/workouts/5.png')},
                            {name: 'dip', id: 6, url: require('../../assets/workouts/6.png')},
                            {name: 'military press', id: 7, url: require('../../assets/workouts/7.png')},
                        ]

export const WORKOUT_GROUPS = { 'benchpress': 'chest',
                                'deadlift': 'back',
                                'squat': 'legs',
                                'chin-up': 'back',
                                'pull-up': 'back',
                                'dip': 'chest',
                                'military press': 'chest' 
                              }

//These numbers are taken from here: https://strengthlevel.com/strength-standards/bench-press/lb
//I took the ratios from a bodyweight of 150 and an intermediate level. These are male ratios.
export const WORKOUT_RATIOS_MALE = { 'benchpress': 1.2,
                                     'deadlift': 1.89,
                                     'squat': 1.59,
                                     'chin-up': 1.0, //This needs to be changed. Ratio is different from usual
                                     'pull-up': 1.0, //This needs to be changed. Ratio is different from usual
                                     'dip': 1.0, //This needs to be changed. Ratio is different from usual
                                     'military press': 0.78 
                                   }
