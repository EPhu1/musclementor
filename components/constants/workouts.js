//if we add workouts, we need to change all the constants here and the Promise.all() in Add.js and Home.js.
export const WORKOUTS = [   {name: 'benchpress', id: 1, url: require('../../assets/workouts/1.png')},
                            {name: 'deadlift', id: 2, url: require('../../assets/workouts/2.png')},
                            {name: 'squat', id: 3, url: require('../../assets/workouts/3.png')},
                            {name: 'chin-up', id: 4, url: require('../../assets/workouts/4.png')},
                            {name: 'pull-up', id: 5, url: require('../../assets/workouts/5.png')},
                            {name: 'dip', id: 6, url: require('../../assets/workouts/6.png')},
                            {name: 'military press', id: 7, url: require('../../assets/workouts/7.png')},
                            {name: 'pushup', id: 8, url: require('../../assets/workouts/8.jpg')},
                            {name: 'lat pulldown', id: 9, url: require('../../assets/workouts/9.jpg')},
                            {name: 'dumbbell lunge', id: 10, url: require('../../assets/workouts/10.jpg')},
                            {name: 'hip thrust', id: 11, url: require('../../assets/workouts/11.jpg')},
                            {name: 'dumbbell benchpress', id: 12, url: require('../../assets/workouts/12.jpg')},
                        ]

export const WORKOUT_GROUPS = { 'benchpress': 'chest',
                                'deadlift': 'back',
                                'squat': 'legs',
                                'chin-up': 'back',
                                'pull-up': 'back',
                                'dip': 'chest',
                                'military press': 'chest',
                                'pushup': 'chest',
                                'lat pulldown': 'back',
                                'dumbbell lunge': 'legs',
                                'hip thrust': 'legs',
                                'dumbbell benchpress': 'back',
                              }

//These numbers are taken from here: https://strengthlevel.com/strength-standards/bench-press/lb
//I took the ratios from a bodyweight of 150 and an intermediate level. These are male ratios.
export const WORKOUT_RATIOS_MALE = { 'benchpress': 1.2,
                                     'deadlift': 1.89,
                                     'squat': 1.59,
                                     'chin-up': 1.5,
                                     'pull-up': 1.5,
                                     'dip': 1.63,
                                     'military press': 0.78,
                                     'pushup': 2.34,
                                     'lat pulldown': 1.1,
                                     'dumbbell lunge': 0.4,
                                     'hip thrust': 1.63,
                                     'dumbbell benchpress': 0.5,
                                   }
