const data = [
    {id : 1, iso:    'BD', name: 'BANGLADESH' },
    {id : 2, iso:    'AE', name: 'UNITED ARAB EMIRATES' },
    {id : 3, iso:    'AF', name: 'AFGHANISTAN' },
    {id : 4, iso:    'AG', name: 'ANTIGUA AND BARBUDA' },
    {id : 5, iso:    'AI', name: 'ANGUILLA' },
    {id : 6, iso:    'AL', name: 'ALBANIA' },
    {id : 7, iso:    'AM', name: 'ARMENIA' },
    {id : 8, iso:    'AN', name: 'NETHERLANDS ANTILLES' },
    {id : 9, iso:    'AO', name: 'ANGOLA' },
    {id : 10, iso:   'AQ', name: 'ANTARCTICA' },
    {id : 11, iso:   'AR', name: 'ARGENTINA' },
    {id : 12, iso:   'AS', name: 'AMERICAN SAMOA' },
    {id : 13, iso:   'AT', name: 'AUSTRIA' },
    {id : 14, iso:   'AU', name: 'AUSTRALIA' },
    {id : 15, iso:   'AW', name: 'ARUBA' },
    {id : 16, iso:   'AZ', name: 'AZERBAIJAN' },
    {id : 17, iso:   'BA', name: 'BOSNIA AND HERZEGOVINA' },
    {id : 18, iso:   'BB', name: 'BARBADOS' },
    {id : 19, iso:   'AD', name: 'ANDORRA' },
    {id : 20, iso:   'BE', name: 'BELGIUM' },
    {id : 21, iso:   'BF', name: 'BURKINA FASO' },
    {id : 22, iso:   'BG', name: 'BULGARIA' },
    {id : 23, iso:   'BH', name: 'BAHRAIN' },
    {id : 24, iso:   'BI', name: 'BURUNDI' },
    {id : 25, iso:   'BJ', name: 'BENIN' },
    {id : 26, iso:   'BM', name: 'BERMUDA' },
    {id : 27, iso:   'BN', name: 'BRUNEI DARUSSALAM' },
    {id : 28, iso:   'BO', name: 'BOLIVIA' },
    {id : 29, iso:   'BR', name: 'BRAZIL' },
    {id : 30, iso:   'BS', name: 'BAHAMAS' },
    {id : 31,  iso:  'BT', name: 'BHUTAN' },
    {id : 32,  iso:  'BV', name: 'BOUVET ISLAND' },
    {id : 33,  iso:  'BW', name: 'BOTSWANA' },
    {id : 34,  iso:  'BY', name: 'BELARUS' },
    {id : 35,  iso:  'BZ', name: 'BELIZE' },
    {id : 36,  iso:  'CA', name: 'CANADA' },
    {id : 37,  iso:  'CC', name: 'COCOS (KEELING) ISLANDS' },
    {id : 38,  iso:  'CD', name: 'CONGO, THE DEMOCRATIC REPUBLIC OF THE' },
    {id : 39,  iso:  'CF', name: 'CENTRAL AFRICAN REPUBLIC' },
    {id : 40,  iso:  'CG', name: 'CONGO' },
    {id : 41,  iso:  'CH', name: 'SWITZERLAND' },
    {id : 42,  iso:  'CI', name: 'COTE D\'IVOIRE' },
    {id : 43,  iso:  'CK', name: 'COOK ISLANDS' },
    {id : 44,  iso:  'CL', name: 'CHILE' },
    {id : 45,  iso:  'CM', name: 'CAMEROON' },
    {id : 46,  iso:  'CN', name: 'CHINA' },
    {id : 47,  iso:  'CO', name: 'COLOMBIA' },
    {id : 48,  iso:  'CR', name: 'COSTA RICA' },
    {id : 49,  iso:  'CS', name: 'SERBIA AND MONTENEGRO' },
    {id : 50,  iso:  'CU', name: 'CUBA' },
    {id : 51,  iso:  'CV', name: 'CAPE VERDE' },
    {id : 52,  iso:  'CX', name: 'CHRISTMAS ISLAND' },
    {id : 53,  iso:  'CY', name: 'CYPRUS' },
    {id : 54,  iso:  'CZ', name: 'CZECH REPUBLIC' },
    {id : 55,  iso:  'DE', name: 'GERMANY' },
    {id : 56,  iso:  'DJ', name: 'DJIBOUTI' },
    {id : 57,  iso:  'DK', name: 'DENMARK' },
    {id : 58,  iso:  'DM', name: 'DOMINICA' },
    {id : 59,  iso:  'DO', name: 'DOMINICAN REPUBLIC' },
    {id : 60,  iso:  'DZ', name: 'ALGERIA' },
    {id : 61,  iso:  'EC', name: 'ECUADOR' },
    {id : 62,  iso:  'EE', name: 'ESTONIA' },
    {id : 63,  iso:  'EG', name: 'EGYPT' },
    {id : 64,  iso:  'EH', name: 'WESTERN SAHARA' },
    {id : 65,  iso:  'ER', name: 'ERITREA' },
    {id : 66,  iso:  'ES', name: 'SPAIN' },
    {id : 67,  iso:  'ET', name: 'ETHIOPIA' },
    {id : 68,  iso:  'FI', name: 'FINLAND' },
    {id : 69,  iso:  'FJ', name: 'FIJI' },
    {id : 70,  iso:  'FK', name: 'FALKLAND ISLANDS (MALVINAS)' },
    {id : 71,  iso:  'FM', name: 'MICRONESIA, FEDERATED STATES OF' },
    {id : 72,  iso:  'FO', name: 'FAROE ISLANDS' },
    {id : 73,  iso:  'FR', name: 'FRANCE' },
    {id : 74,  iso:  'GA', name: 'GABON' },
    {id : 75,  iso:  'GB', name: 'UNITED KINGDOM' },
    {id : 76,  iso:  'GD', name: 'GRENADA' },
    {id : 77,  iso:  'GE', name: 'GEORGIA' },
    {id : 78,  iso:  'GF', name: 'FRENCH GUIANA' },
    {id : 79,  iso:  'GH', name: 'GHANA' },
    {id : 80,  iso:  'GI', name: 'GIBRALTAR' },
    {id : 81,  iso:  'GL', name: 'GREENLAND' },
    {id : 82,  iso:  'GM', name: 'GAMBIA' },
    {id : 83,  iso:  'GN', name: 'GUINEA' },
    {id : 84,  iso:  'GP', name: 'GUADELOUPE' },
    {id : 85,  iso:  'GQ', name: 'EQUATORIAL GUINEA' },
    {id : 86,  iso:  'GR', name: 'GREECE' },
    {id : 87,  iso:  'GS', name: 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS' },
    {id : 88,  iso:  'GT', name: 'GUATEMALA' },
    {id : 89,  iso:  'GU', name: 'GUAM' },
    {id : 90,  iso:  'GW', name: 'GUINEA-BISSAU' },
    {id : 91,  iso:  'GY', name: 'GUYANA' },
    {id : 92,  iso:  'HK', name: 'HONG KONG' },
    {id : 93,  iso:  'HM', name: 'HEARD ISLAND AND MCDONALD ISLANDS' },
    {id : 94,  iso:  'HN', name: 'HONDURAS' },
    {id : 95,  iso:  'HR', name: 'CROATIA' },
    {id : 96,  iso:  'HT', name: 'HAITI' },
    {id : 97,  iso:  'HU', name: 'HUNGARY' },
    {id : 98,  iso:  'ID', name: 'INDONESIA' },
    {id : 99,  iso:  'IE', name: 'IRELAND' },
    {id : 100, iso:  'IL', name: 'ISRAEL', },
    {id : 101, iso:  'IN', name: 'INDIA', },
    {id : 102, iso:  'IO', name: 'BRITISH INDIAN OCEAN TERRITORY' },
    {id : 103, iso:  'IQ', name: 'IRAQ' },
    {id : 104, iso:  'IR', name: 'IRAN, ISLAMIC REPUBLIC OF' },
    {id : 105, iso:  'IS', name: 'ICELAND' },
    {id : 106, iso:  'IT', name: 'ITALY' },
    {id : 107, iso:  'JM', name: 'JAMAICA' },
    {id : 108, iso:  'JO', name: 'JORDAN' },
    {id : 109, iso:  'JP', name: 'JAPAN' },
    {id : 110, iso:  'KE', name: 'KENYA' },
    {id : 111, iso:  'KG', name: 'KYRGYZSTAN' },
    {id : 112, iso:  'KH', name: 'CAMBODIA' },
    {id : 113, iso:  'KI', name: 'KIRIBATI' },
    {id : 114, iso:  'KM', name: 'COMOROS' },
    {id : 115, iso:  'KN', name: 'SAINT KITTS AND NEVIS' },
    {id : 116, iso:  'KP', name: 'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF' },
    {id : 117, iso:  'KR', name: 'KOREA, REPUBLIC OF' },
    {id : 118, iso:  'KW', name: 'KUWAIT' },
    {id : 119, iso:  'KY', name: 'CAYMAN ISLANDS' },
    {id : 120, iso:  'KZ', name: 'KAZAKHSTAN' },
    {id : 121, iso:  'LA', name: 'LAO PEOPLE\'S DEMOCRATIC REPUBLIC' },
    {id : 122, iso:  'LB', name: 'LEBANON' },
    {id : 123, iso:  'LC', name: 'SAINT LUCIA' },
    {id : 124, iso:  'LI', name: 'LIECHTENSTEIN' },
    {id : 125, iso:  'LK', name: 'SRI LANKA' },
    {id : 126, iso:  'LR', name: 'LIBERIA' },
    {id : 127, iso:  'LS', name: 'LESOTHO' },
    {id : 128, iso:  'LT', name: 'LITHUANIA' },
    {id : 129, iso:  'LU', name: 'LUXEMBOURG' },
    {id : 130, iso:  'LV', name: 'LATVIA' },
    {id : 131, iso:  'LY', name: 'LIBYAN ARAB JAMAHIRIYA' },
    {id : 132, iso:  'MA', name: 'MOROCCO' },
    {id : 133, iso:  'MC', name: 'MONACO' },
    {id : 134, iso:  'MD', name: 'MOLDOVA, REPUBLIC OF' },
    {id : 135, iso:  'MG', name: 'MADAGASCAR' },
    {id : 136, iso:  'MH', name: 'MARSHALL ISLANDS' },
    {id : 137, iso:  'MK', name: 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF' },
    {id : 138, iso:  'ML', name: 'MALI' },
    {id : 139, iso:  'MM', name: 'MYANMAR' },
    {id : 140, iso:  'MN', name: 'MONGOLIA' },
    {id : 141, iso:  'MO', name: 'MACAO' },
    {id : 142, iso:  'MP', name: 'NORTHERN MARIANA ISLANDS' },
    {id : 143, iso:  'MQ', name: 'MARTINIQUE' },
    {id : 144, iso:  'MR', name: 'MAURITANIA' },
    {id : 145, iso:  'MS', name: 'MONTSERRAT' },
    {id : 146, iso:  'MT', name: 'MALTA' },
    {id : 147, iso:  'MU', name: 'MAURITIUS' },
    {id : 148, iso:  'MV', name: 'MALDIVES' },
    {id : 149, iso:  'MW', name: 'MALAWI' },
    {id : 150, iso:  'MX', name: 'MEXICO' },
    {id : 151, iso:  'MY', name: 'MALAYSIA' },
    {id : 152, iso:  'MZ', name: 'MOZAMBIQUE' },
    {id : 153, iso:  'NA', name: 'NAMIBIA' },
    {id : 154, iso:  'NC', name: 'NEW CALEDONIA' },
    {id : 155, iso:  'NE', name: 'NIGER' },
    {id : 156, iso:  'NF', name: 'NORFOLK ISLAND' },
    {id : 157, iso:  'NG', name: 'NIGERIA' },
    {id : 158, iso:  'NI', name: 'NICARAGUA' },
    {id : 159, iso:  'NL', name: 'NETHERLANDS' },
    {id : 160, iso:  'NO', name: 'NORWAY' },
    {id : 161, iso:  'NP', name: 'NEPAL' },
    {id : 162, iso:  'NR', name: 'NAURU' },
    {id : 163, iso:  'NU', name: 'NIUE' },
    {id : 164, iso:  'NZ', name: 'NEW ZEALAND' },
    {id : 165, iso:  'OM', name: 'OMAN' },
    {id : 166, iso:  'PA', name: 'PANAMA' },
    {id : 167, iso:  'PE', name: 'PERU' },
    {id : 168, iso:  'PF', name: 'FRENCH POLYNESIA' },
    {id : 169, iso:  'PG', name: 'PAPUA NEW GUINEA' },
    {id : 170, iso:  'PH', name: 'PHILIPPINES' },
    {id : 171, iso:  'PK', name: 'PAKISTAN' },
    {id : 172, iso:  'PL', name: 'POLAND' },
    {id : 173, iso:  'PM', name: 'SAINT PIERRE AND MIQUELON' },
    {id : 174, iso:  'PN', name: 'PITCAIRN' },
    {id : 175, iso:  'PR', name: 'PUERTO RICO' },
    {id : 176, iso:  'PS', name: 'PALESTINIAN TERRITORY, OCCUPIED' },
    {id : 177, iso:  'PT', name: 'PORTUGAL' },
    {id : 178, iso:  'PW', name: 'PALAU' },
    {id : 179, iso:  'PY', name: 'PARAGUAY' },
    {id : 180, iso:  'QA', name: 'QATAR' },
    {id : 181, iso:  'RE', name: 'REUNION' },
    {id : 182, iso:  'RO', name: 'ROMANIA' },
    {id : 183, iso:  'RU', name: 'RUSSIAN FEDERATION' },
    {id : 184, iso:  'RW', name: 'RWANDA' },
    {id : 185, iso:  'SA', name: 'SAUDI ARABIA' },
    {id : 186, iso:  'SB', name: 'SOLOMON ISLANDS' },
    {id : 187, iso:  'SC', name: 'SEYCHELLES' },
    {id : 188, iso:  'SD', name: 'SUDAN' },
    {id : 189, iso:  'SE', name: 'SWEDEN' },
    {id : 190, iso:  'SG', name: 'SINGAPORE' },
    {id : 191, iso:  'SH', name: 'SAINT HELENA' },
    {id : 192, iso:  'SI', name: 'SLOVENIA' },
    {id : 193, iso:  'SJ', name: 'SVALBARD AND JAN MAYEN' },
    {id : 194, iso:  'SK', name: 'SLOVAKIA' },
    {id : 195, iso:  'SL', name: 'SIERRA LEONE' },
    {id : 196, iso:  'SM', name: 'SAN MARINO' },
    {id : 197, iso:  'SN', name: 'SENEGAL' },
    {id : 198, iso:  'SO', name: 'SOMALIA' },
    {id : 199, iso:  'SR', name: 'SURINAME' },
    {id : 200, iso:  'ST', name: 'SAO TOME AND PRINCIPE' },
    {id : 201, iso:  'SV', name: 'EL SALVADOR' },
    {id : 202, iso:  'SY', name: 'SYRIAN ARAB REPUBLIC' },
    {id : 203, iso:  'SZ', name: 'SWAZILAND' },
    {id : 204, iso:  'TC', name: 'TURKS AND CAICOS ISLANDS' },
    {id : 205, iso:  'TD', name: 'CHAD' },
    {id : 206, iso:  'TF', name: 'FRENCH SOUTHERN TERRITORIES' },
    {id : 207, iso:  'TG', name: 'TOGO' },
    {id : 208, iso:  'TH', name: 'THAILAND' },
    {id : 209, iso:  'TJ', name: 'TAJIKISTAN' },
    {id : 210, iso:  'TK', name: 'TOKELAU' },
    {id : 211, iso:  'TL', name: 'TIMOR-LESTE' },
    {id : 212, iso:  'TM', name: 'TURKMENISTAN' },
    {id : 213, iso:  'TN', name: 'TUNISIA' },
    {id : 214, iso:  'TO', name: 'TONGA' },
    {id : 215, iso:  'TR', name: 'TURKEY' },
    {id : 216, iso:  'TT', name: 'TRINIDAD AND TOBAGO' },
    {id : 217, iso:  'TV', name: 'TUVALU' },
    {id : 218, iso:  'TW', name: 'TAIWAN, PROVINCE OF CHINA', },
    {id : 219, iso:  'TZ', name: 'TANZANIA, UNITED REPUBLIC OF' },
    {id : 220, iso:  'UA', name: 'UKRAINE' },
    {id : 221, iso:  'UG', name: 'UGANDA' },
    {id : 222, iso:  'UM', name: 'UNITED STATES MINOR OUTLYING ISLANDS' },
    {id : 223, iso:  'US', name: 'UNITED STATES' },
    {id : 224, iso:  'UY', name: 'URUGUAY' },
    {id : 225, iso:  'UZ', name: 'UZBEKISTAN' },
    {id : 226, iso:  'VA', name: 'HOLY SEE (VATICAN CITY STATE)' },
    {id : 227, iso:  'VC', name: 'SAINT VINCENT AND THE GRENADINES' },
    {id : 228, iso:  'VE', name: 'VENEZUELA' },
    {id : 229, iso:  'VG', name: 'VIRGIN ISLANDS, BRITISH' },
    {id : 230, iso:  'VI', name: 'VIRGIN ISLANDS, U.S.' },
    {id : 231, iso:  'VN', name: 'VIET NAM' },
    {id : 232, iso:  'VU', name: 'VANUATU' },
    {id : 233, iso:  'WF', name: 'WALLIS AND FUTUNA' },
    {id : 234, iso:  'WS', name: 'SAMOA' },
    {id : 235, iso:  'YE', name: 'YEMEN' },
    {id : 236, iso:  'YT', name: 'MAYOTTE' },
    {id : 237, iso:  'ZA', name: 'SOUTH AFRICA' },
    {id : 238, iso:  'ZM', name: 'ZAMBIA' },
    {id : 239, iso:  'ZW', name: 'ZIMBABWE' },
    {id : 240, iso:  'TC', name: 'Testsss' }
]
export default data;
