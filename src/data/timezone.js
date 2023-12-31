const data = [
            { id: 1,   name: '(UTC-11: 00) Midway Island',                    value: 'Pacific/Midway'},
            { id: 2,   name: '(UTC-11: 00) Samoa',                            value: 'Pacific/Samoa'},
            { id: 3,   name: '(UTC-10: 00) Hawaii',                           value: 'Pacific/Honolulu'},
            { id: 4,   name: '(UTC-09: 00) Alaska',                           value: 'US/Alaska'},
            { id: 5,   name: '(UTC-08: 00) Pacific Time (US &amp; Canada)',   value: 'America/Los_Angeles'},
            { id: 6,   name: '(UTC-08: 00) Tijuana',                          value: 'America/Tijuana'},
            { id: 7,   name: '(UTC-07: 00) Arizona',                          value: 'US/Arizona'},
            { id: 8,   name: '(UTC-07: 00) Chihuahua',                        value: 'America/Chihuahua'},
            { id: 9,   name: '(UTC-07: 00) La Paz',                           value: 'America/Chihuahua'},
            { id: 10,  name: '(UTC-07: 00) Mazatlan',                         value: 'America/Mazatlan'},
            { id: 11,  name: '(UTC-07: 00) Mountain Time (US &amp; Canada)',  value: 'US/Mountain'},
            { id: 12,  name: '(UTC-06: 00) Central America',                  value: 'America/Managua'},
            { id: 13,  name: '(UTC-06: 00) Central Time (US &amp; Canada)',   value: 'US/Central'},
            { id: 14,  name: '(UTC-06: 00) Guadalajara',                      value: 'America/Mexico_City'},
            { id: 15,  name: '(UTC-06: 00) Mexico City',                      value: 'America/Mexico_City'},
            { id: 16,  name: '(UTC-06: 00) Monterrey',                        value: 'America/Monterrey'},
            { id: 17,  name: '(UTC-06: 00) Saskatchewan',                     value: 'Canada/Saskatchewan'},
            { id: 18,  name: '(UTC-05: 00) Bogota',                           value: 'America/Bogota'},
            { id: 19,  name: '(UTC-05: 00) Eastern Time (US &amp; Canada)',   value: 'US/Eastern'},
            { id: 20,  name: '(UTC-05: 00) Indiana (East)',                   value: 'US/East-Indiana'},
            { id: 21,  name: '(UTC-05: 00) Lima',                             value: 'America/Lima'},
            { id: 22,  name: '(UTC-05: 00) Quito',                            value: 'America/Bogota'},
            { id: 23,  name: '(UTC-04: 00) Atlantic Time (Canada)',           value: 'Canada/Atlantic'},
            { id: 24,  name: '(UTC-04: 30) Caracas',                          value: 'America/Caracas'},
            { id: 25,  name: '(UTC-04: 00) La Paz',                           value: 'America/La_Paz'},
            { id: 26,  name: '(UTC-04: 00) Santiago',                         value: 'America/Santiago'},
            { id: 27,  name: '(UTC-03: 30) Newfoundland',                     value: 'Canada/Newfoundland'},
            { id: 28,  name: '(UTC-03: 00) Brasilia',                         value: 'America/Sao_Paulo'},
            { id: 29,  name: '(UTC-03: 00) Buenos Aires',                     value: 'America/Argentina/Buenos_Aires'},
            { id: 30,  name: '(UTC-03: 00) Georgetown',                       value: 'America/Argentina/Buenos_Aires'},
            { id: 31,  name: '(UTC-03: 00) Greenland',                        value: 'America/Godthab'},
            { id: 32,  name: '(UTC-02: 00) Mid-Atlantic',                     value: 'America/Noronha'},
            { id: 33,  name: '(UTC-01: 00) Azores',                           value: 'Atlantic/Azores'},
            { id: 34,  name: '(UTC-01: 00) Cape Verde Is.',                   value: 'Atlantic/Cape_Verde'},
            { id: 35,  name: '(UTC+00: 00) Casablanca',                       value: 'Africa/Casablanca'},
            { id: 36,  name: '(UTC+00: 00) Edinburgh',                        value: 'Europe/London'},
            { id: 37,  name: '(UTC+00: 00) Greenwich Mean Time ublin',        value: 'Etc/Greenwich'},
            { id: 38,  name: '(UTC+00: 00) Lisbon',                           value: 'Europe/Lisbon'},
            { id: 39,  name: '(UTC+00: 00) London',                           value: 'Europe/London'},
            { id: 40,  name: '(UTC+00: 00) Monrovia',                         value: 'Africa/Monrovia'},
            { id: 41,  name: '(UTC+00: 00) UTC',                              value: 'UTC'},
            { id: 42,  name: '(UTC+01: 00) Amsterdam',                        value: 'Europe/Amsterdam'},
            { id: 43,  name: '(UTC+01: 00) Belgrade',                         value: 'Europe/Belgrade'},
            { id: 44,  name: '(UTC+01: 00) Berlin',                           value: 'Europe/Berlin'},
            { id: 45,  name: '(UTC+01: 00) Bern',                             value: 'Europe/Berlin'},
            { id: 46,  name: '(UTC+01: 00) Bratislava',                       value: 'Europe/Bratislava'},
            { id: 47,  name: '(UTC+01: 00) Brussels',                         value: 'Europe/Brussels'},
            { id: 48,  name: '(UTC+01: 00) Budapest',                         value: 'Europe/Budapest'},
            { id: 49,  name: '(UTC+01: 00) Copenhagen',                       value: 'Europe/Copenhagen'},
            { id: 50,  name: '(UTC+01: 00) Ljubljana',                        value: 'Europe/Ljubljana'},
            { id: 51,  name: '(UTC+01: 00) Madrid',                           value: 'Europe/Madrid'},
            { id: 52,  name: '(UTC+01: 00) Paris',                            value: 'Europe/Paris'},
            { id: 53,  name: '(UTC+01: 00) Prague',                           value: 'Europe/Prague'},
            { id: 54,  name: '(UTC+01: 00) Rome',                             value: 'Europe/Rome'},
            { id: 55,  name: '(UTC+01: 00) Sarajevo',                         value: 'Europe/Sarajevo'},
            { id: 56,  name: '(UTC+01: 00) Skopje',                           value: 'Europe/Skopje'},
            { id: 57,  name: '(UTC+01: 00) Stockholm',                        value: 'Europe/Stockholm'},
            { id: 58,  name: '(UTC+01: 00) Vienna',                           value: 'Europe/Vienna'},
            { id: 59,  name: '(UTC+01: 00) Warsaw',                           value: 'Europe/Warsaw'},
            { id: 60,  name: '(UTC+01: 00) West Central Africa',              value: 'Africa/Lagos'},
            { id: 61,  name: '(UTC+01: 00) Zagreb',                           value: 'Europe/Zagreb'},
            { id: 62,  name: '(UTC+02: 00) Athens',                           value: 'Europe/Athens'},
            { id: 63,  name: '(UTC+02: 00) Bucharest',                        value: 'Europe/Bucharest'},
            { id: 64,  name: '(UTC+02: 00) Cairo',                            value: 'Africa/Cairo'},
            { id: 65,  name: '(UTC+02: 00) Harare',                           value: 'Africa/Harare'},
            { id: 66,  name: '(UTC+02: 00) Helsinki',                         value: 'Europe/Helsinki'},
            { id: 67,  name: '(UTC+02: 00) Istanbul',                         value: 'Europe/Istanbul'},
            { id: 68,  name: '(UTC+02: 00) Jerusalem',                        value: 'Asia/Jerusalem'},
            { id: 69,  name: '(UTC+02: 00) Kyiv',                             value: 'Europe/Helsinki'},
            { id: 70,  name: '(UTC+02: 00) Pretoria',                         value: 'Africa/Johannesburg'},
            { id: 71,  name: '(UTC+02: 00) Riga',                             value: 'Europe/Riga'},
            { id: 72,  name: '(UTC+02: 00) Sofia',                            value: 'Europe/Sofia'},
            { id: 73,  name: '(UTC+02: 00) Tallinn',                          value: 'Europe/Tallinn'},
            { id: 74,  name: '(UTC+02: 00) Vilnius',                          value: 'Europe/Vilnius'},
            { id: 75,  name: '(UTC+03: 00) Baghdad',                          value: 'Asia/Baghdad'},
            { id: 76,  name: '(UTC+03: 00) Kuwait',                           value: 'Asia/Kuwait'},
            { id: 77,  name: '(UTC+03: 00) Minsk',                            value: 'Europe/Minsk'},
            { id: 78,  name: '(UTC+03: 00) Nairobi',                          value: 'Africa/Nairobi'},
            { id: 79,  name: '(UTC+03: 00) Riyadh',                           value: 'Asia/Riyadh'},
            { id: 80,  name: '(UTC+03: 00) Volgograd',                        value: 'Europe/Volgograd'},
            { id: 81,  name: '(UTC+03: 30) Tehran',                           value: 'Asia/Tehran'},
            { id: 82,  name: '(UTC+04: 00) Abu Dhabi',                        value: 'Asia/Muscat'},
            { id: 83,  name: '(UTC+04: 00) Baku',                             value: 'Asia/Baku'},
            { id: 84,  name: '(UTC+04: 00) Moscow',                           value: 'Europe/Moscow'},
            { id: 85,  name: '(UTC+04: 00) Muscat',                           value: 'Asia/Muscat'},
            { id: 86,  name: '(UTC+04: 00) St. Petersburg',                   value: 'Europe/Moscow'},
            { id: 87,  name: '(UTC+04: 00) Tbilisi',                          value: 'Asia/Tbilisi'},
            { id: 88,  name: '(UTC+04: 00) Yerevan',                          value: 'Asia/Yerevan'},
            { id: 89,  name: '(UTC+04: 30) Kabul',                            value: 'Asia/Kabul'},
            { id: 90,  name: '(UTC+05: 00) Islamabad',                        value: 'Asia/Karachi'},
            { id: 91,  name: '(UTC+05: 00) Karachi',                          value: 'Asia/Karachi'},
            { id: 92,  name: '(UTC+05: 00) Tashkent',                         value: 'Asia/Tashkent'},
            { id: 93,  name: '(UTC+05: 30) Chennai',                          value: 'Asia/Calcutta'},
            { id: 94,  name: '(UTC+05: 30) Kolkata',                          value: 'Asia/Kolkata'},
            { id: 95,  name: '(UTC+05: 30) Mumbai',                           value: 'Asia/Calcutta'},
            { id: 96,  name: '(UTC+05: 30) New Delhi',                        value: 'Asia/Calcutta'},
            { id: 97,  name: '(UTC+05: 30) Sri Jayawardenepura',              value: 'Asia/Calcutta'},
            { id: 98,  name: '(UTC+05: 45) Kathmandu',                        value: 'Asia/Katmandu'},
            { id: 99,  name: '(UTC+06: 00) Almaty',                           value: 'Asia/Almaty'},
            { id: 100, name: '(UTC+06: 00) Astana',                           value: 'Asia/Dhaka'},
            { id: 101, name: '(UTC+06: 00) Dhaka',                            value: 'Asia/Dhaka'},
            { id: 102, name: '(UTC+06: 00) Ekaterinburg',                     value: 'Asia/Yekaterinburg'},
            { id: 103, name: '(UTC+06: 30) Rangoon',                          value: 'Asia/Rangoon'},
            { id: 104, name: '(UTC+07: 00) Bangkok',                          value: 'Asia/Bangkok'},
            { id: 105, name: '(UTC+07: 00) Hanoi',                            value: 'Asia/Bangkok'},
            { id: 106, name: '(UTC+07: 00) Jakarta',                          value: 'Asia/Jakarta'},
            { id: 107, name: '(UTC+07: 00) Novosibirsk',                      value: 'Asia/Novosibirsk'},
            { id: 108, name: '(UTC+08: 00) Beijing',                          value: 'Asia/Hong_Kong'},
            { id: 109, name: '(UTC+08: 00) Chongqing',                        value: 'Asia/Chongqing'},
            { id: 110, name: '(UTC+08: 00) Hong Kong',                        value: 'Asia/Hong_Kong'},
            { id: 111, name: '(UTC+08: 00) Krasnoyarsk',                      value: 'Asia/Krasnoyarsk'},
            { id: 112, name: '(UTC+08: 00) Kuala Lumpur',                     value: 'Asia/Kuala_Lumpur'},
            { id: 113, name: '(UTC+08: 00) Perth',                            value: 'Australia/Perth'},
            { id: 114, name: '(UTC+08: 00) Singapore',                        value: 'Asia/Singapore'},
            { id: 115, name: '(UTC+08: 00) Taipei',                           value: 'Asia/Taipei'},
            { id: 116, name: '(UTC+08: 00) Ulaan Bataar',                     value: 'Asia/Ulan_Bator'},
            { id: 117, name: '(UTC+08: 00) Urumqi',                           value: 'Asia/Urumqi'},
            { id: 118, name: '(UTC+09: 00) Irkutsk',                          value: 'Asia/Irkutsk'},
            { id: 119, name: '(UTC+09: 00) Osaka',                            value: 'Asia/Tokyo'},
            { id: 120, name: '(UTC+09: 00) Sapporo',                          value: 'Asia/Tokyo'},
            { id: 121, name: '(UTC+09: 00) Seoul',                            value: 'Asia/Seoul'},
            { id: 122, name: '(UTC+09: 00) Tokyo',                            value: 'Asia/Tokyo'},
            { id: 123, name: '(UTC+09: 30) Adelaide',                         value: 'Australia/Adelaide'},
            { id: 124, name: '(UTC+09: 30) Darwin',                           value: 'Australia/Darwin'},
            { id: 125, name: '(UTC+10: 00) Brisbane',                         value: 'Australia/Brisbane'},
            { id: 126, name: '(UTC+10: 00) Canberra',                         value: 'Australia/Canberra'},
            { id: 127, name: '(UTC+10: 00) Guam',                             value: 'Pacific/Guam'},
            { id: 128, name: '(UTC+10: 00) Hobart',                           value: 'Australia/Hobart'},
            { id: 129, name: '(UTC+10: 00) Melbourne',                        value: 'Australia/Melbourne'},
            { id: 130, name: '(UTC+10: 00) Port Moresby',                     value: 'Pacific/Port_Moresby'},
            { id: 131, name: '(UTC+10: 00) Sydney',                           value: 'Australia/Sydney'},
            { id: 132, name: '(UTC+10: 00) Yakutsk',                          value: 'Asia/Yakutsk'},
            { id: 133, name: '(UTC+11: 00) Vladivostok',                      value: 'Asia/Vladivostok'},
            { id: 134, name: '(UTC+12: 00) Auckland',                         value: 'Pacific/Auckland'},
            { id: 135, name: '(UTC+12: 00) Fiji',                             value: 'Pacific/Fiji'},
            { id: 136, name: '(UTC+12: 00) International Date Line West',     value: 'Pacific/Kwajalein'},
            { id: 137, name: '(UTC+12: 00) Kamchatka',                        value: 'Asia/Kamchatka'},
            { id: 138, name: '(UTC+12: 00) Magadan',                          value: 'Asia/Magadan'},
            { id: 139, name: '(UTC+12: 00) Marshall Is.',                     value: 'Pacific/Fiji'},
            { id: 140, name: '(UTC+12: 00) New Caledonia',                    value: 'Asia/Magadan'},
            { id: 141, name: '(UTC+12: 00) Solomon Is.',                      value: 'Asia/Magadan'},
            { id: 142, name: '(UTC+12: 00) Wellington',                       value: 'Pacific/Auckland'},
            { id: 143, name: '(UTC+13: 00) Nuku\'alofa',                      value: 'Pacific/Tongatapu'},
        ]
        export default data;