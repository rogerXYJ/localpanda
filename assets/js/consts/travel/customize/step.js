const cdnPath = 'https://cloud.localpanda.com';
module.exports = {
    whoDataSource: [
        {
            label: 'On my own',
            src: cdnPath + '/static/customize/population/Alone.jpg',
            value: 'On my own',
            extend: false,
        },
        {
            label: 'Couple',
            src: cdnPath + '/static/customize/population/Couple.jpg',
            value: 'Couple',
            extend: false,
        },
        {
            label: 'It is a family trip',
            src: cdnPath + '/static/customize/population/Familytrip.jpg',
            value: 'It is a family trip',
            extend: true,
        },
        {
            label: 'A group of friends',
            src: cdnPath + '/static/customize/population/friends.jpg',
            value: 'A group of friends',
            extend: true,
        },
        {
            label: 'Business group',
            src: cdnPath + '/static/customize/population/Businessgroup.jpg',
            value: 'Business group',
            extend: true,
        },
    ],
    whereDataSource: [
        {
            label: 'Beijing',
            src: cdnPath + '/static/customize/destination/beijing.jpg',
            value: 'Beijing',
            des:[
                'The Great Wall',
                'The Forbidden City',
                'Hutong Alleyways',
            ]
        },
        {
            label: 'Shanghai',
            src: cdnPath + '/static/customize/destination/shanghai.jpg',
            value: 'Shanghai',
            des:[
                'Yu Garden',
                'The Bund',
                'Shanghai Tower',
                'Water Towns',
            ]
        },
        {
            label: 'Chengdu',
            src: cdnPath + '/static/customize/destination/chengdu.jpg',
            value: 'Chengdu',
            des:[
                'Panda Research Base',
                'Country Tea Houses',
                'Dujiangyan',
            ]
        },
        {
            label: 'Xi\'an',
            src: cdnPath + "/static/customize/destination/XiAn.jpg",
            value: 'Xi\'an',
            des:[
                'Terracotta Army',
                'Ancient City Wall',
                'Muslim Quarter',
            ]
        },
        {
            label: 'Guilin',
            src: cdnPath + '/static/customize/destination/guilin.jpg',
            value: 'Guilin',
            des:[
                'Elephant trunk hill',
                'Li River',
                'Karst Mountains',
            ]
        },
    ],
    interestsDataSource: [
        {
            label: 'History & Culture',
            src: cdnPath + '/static/customize/interest/HistoryandCulture.jpg',
            value: 'History & Culture',
        },
        {
            label: 'Art & Architecture',
            src: cdnPath + '/static/customize/interest/ArtandArchitecture.jpg',
            value: 'Art & Architecture',
        },
        {
            label: 'Performances &<br> Shows',
            src: cdnPath + '/static/customize/interest/PerformancesandShows.jpg',
            value: 'Performances & Shows',
        },
        {
            label: 'Food & Cooking',
            src: cdnPath + '/static/customize/interest/FoodandCooking.jpg',
            value: 'Food & Cooking',
        },
        {
            label: 'Wildlife & Zoos',
            src: cdnPath + '/static/customize/interest/WildlifeandZoos.jpg',
            value: 'Wildlife & Zoos',
        },
        {
            label: 'Spa & Relaxation',
            src: cdnPath + '/static/customize/interest/SpaandRelaxation.jpg',
            value: 'Spa & Relaxation',
        },
        {
            label: 'Nature & Scenery',
            src: cdnPath + '/static/customize/interest/NatureandScenery.jpg',
            value: 'Nature & Scenery',
        },
        {
            label: 'Evening & Nightlife',
            src: cdnPath + '/static/customize/interest/EveningandNightlife.jpg',
            value: 'Evening & Nightlife',
        },
        {
            label: 'Shopping',
            src: cdnPath + '/static/customize/interest/Shopping.jpg',
            value: 'Shopping',
        },
        {
            label: 'Hiking & Outdoor',
            src: cdnPath + '/static/customize/interest/HikingandOutdoor.jpg',
            value: 'Hiking & Outdoor',
        },
        {
            label: 'Chinese Cultural<br> Activities',
            src: cdnPath + '/static/customize/interest/ChineseCulturalActivities.jpg',
            value: 'Chinese Cultural Activities',
        },
        {
            label: 'Local life &<br> Neighborhoods',
            src: cdnPath + '/static/customize/interest/LocallifeandNeighborhoods.jpg',
            value: 'Local life & Neighborhoods',
        },
    ],
    accommodationDataSource: [
        {
            label: "Select",
            value: {
                accommodationMinPrice: 0,
                accommodationMaxPrice: 0
            }
        },
        {
            label: "Standard & Comfort <br> 75 USD or less",
            value: {
                accommodationMinPrice: 0,
                accommodationMaxPrice: 75
            }
        },
        {
            label: "4-star & Superior <br> 75 USD to 150 USD",
            value: {
                accommodationMinPrice: 75,
                accommodationMaxPrice: 150
            }
        },
        {
            label: "5-star & Luxury <br> 150 USD to more",
            value: {
                accommodationMinPrice: 150,
                accommodationMaxPrice: 150
            }
        },
    ],
    accommodationTypeDataSource: [
        {
            label: 'International chained-brand hotels',
            src: cdnPath + '/static/customize/accommodation/Internationalchainedbrandhotels.jpg',
            value: 'International chained-brand hotels',
        },
        {
            label: 'Boutique and local luxury hotels',
            src: cdnPath + '/static/customize/accommodation/Boutiqueandlocalluxuryhotels.jpg',
            value: 'Boutique and local luxury hotels',
        },
        {
            label: 'BnB, home-stay, and budget hotels',
            src: cdnPath + '/static/customize/accommodation/BnBandbudgethotels.jpg',
            value: 'BnB, home-stay, and budget hotels',
        },
    ]
}