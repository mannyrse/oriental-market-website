// One entry per marker on the map. The order here is the order of the chips.
//
//   id, name, code   used for the marker, chip, and the tile on each card
//   lon, lat         where the marker goes (decimal degrees)
//   label            which side of the marker the name sits on: "left" or "right"
//   color            tile color: green, peach, coral, or blue
//   items            featured products from that country
//                    (type = the short word on the tile; featured = shown in the
//                    default "A few shelf favorites" list, which shows up to 4)
//

const regions = [
    {
        id: "japan", name: "Japan", code: "JP", lon: 138.5, lat: 36.3, label: "right", color: "peach",
        items: [
            { name: "Pocky Chocolate", type: "Snacks", featured: true },
            { name: "Kewpie Mayonnaise", type: "Sauce" },
            { name: "Udon noodles", type: "Noodles" }
        ]
    },
    {
        id: "korea", name: "Korea", code: "KR", lon: 127.8, lat: 36.6, label: "left", color: "green",
        items: [
            { name: "Buldak Carbonara Ramen", type: "Ramen", featured: true },
            { name: "Seaweed snacks", type: "Snacks" },
            { name: "Gochujang", type: "Sauce" }
        ]
    },
    {
        id: "china", name: "China", code: "CN", lon: 105, lat: 34.5, label: "left", color: "coral",
        items: [
            { name: "Soy sauce", type: "Sauce" },
            { name: "Sesame oil", type: "Oil" },
            { name: "Rice vinegar", type: "Pantry" }
        ]
    },
    {
        id: "thailand", name: "Thailand", code: "TH", lon: 101, lat: 15.5, label: "right", color: "blue",
        items: [
            { name: "Coconut milk", type: "Pantry" },
            { name: "Thai tea mix", type: "Drinks" },
            { name: "Frozen Magno Sticky rice", type: "Snack" }
        ]
    },
    {
        id: "philippines", name: "Philippines", code: "PH", lon: 122.5, lat: 12.5, label: "right", color: "peach",
        items: [
            { name: "Frozen Lumpia", type: "Frozen", featured: true },
            { name: "Calamansi juice", type: "Drinks" },
            { name: "Banana ketchup", type: "Sauce" }
        ]
    },
    {
        id: "jamaica", name: "Jamaica", code: "JM", lon: -77.3, lat: 18.2, label: "right", color: "green",
        items: [
            { name: "Jerk seasoning", type: "Spices", featured: true },
            { name: "Scotch bonnet sauce", type: "Sauce" },
            { name: "Plantain chips", type: "Snacks" }
        ]
    },
    {
        id: "latin-america", name: "Latin America", code: "LA", lon: -66, lat: -12, label: "right", color: "coral",
        items: [
            { name: "Goya Products", type: "Spices" },
            { name: "Plantains", type: "Produce" },
            { name: "Culantro", type: "Produce" },
        ]
    },
    {
        id: "africa", name: "Africa", code: "AF", lon: 8, lat: 8, label: "right", color: "blue",
        items: [
            { name: "Fufu flour", type: "Staples" },
            { name: "Palm oil", type: "Oil" },
            { name: "Suya spice", type: "Spices" }
        ]
    }
];