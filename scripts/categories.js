// One entry per product box. Cards alternate left/right on desktop, and stack
// in this order on mobile.
//
//   title    box title
//   note     optional small line under the title
//   color    green, peach, coral, or blue
//   columns  optional: 2 to split the list into two columns (default 1)
//   items    the list shown first
//   images   optional photos (file names in images/); adds arrows and dots
//

const categories = [
    {
        title: "Fresh Vegetables and Produce",
        note: "Delivered and prepared every Friday after 2PM",
        color: "green",
        columns: 2,
        items: [
            "Bok Choy", "Eggplant", "Bittermelon", "Enoki Mushrooms", "Nappa Cabbage",
            "Cabbage", "Shallots", "Green Onion", "Bean Sprouts", "Thai Basil",
            "Thai Chili", "Culantro", "Plantains", "Apple Banana", "Sweet Potato",
            "Taro", "and more!"
        ],
        images: ["placeholder.svg", "placeholder.svg"]
    },
    {
        title: "Beverages",
        color: "coral",
        items: [
            "UCC Kona Coffee", "Mogu Mogu Drinks", "Imported Iced Teas",
            "Korean Soft Drinks", "Japanese Soft Drinks"
        ],
        images: ["placeholder.svg"]
    },
    {
        title: "Kitchen and Household Items",
        color: "peach",
        items: [
            "Rice Cookers", "Chopsticks", "Bowls and Plates", "Cookware",
            "Storage Containers", "Kitchen Tools", "Cleaning Supplies", "Paper Goods"
        ],
        images: ["placeholder.svg"]
    },
    {
        title: "Snacks and Pantry Staples",
        color: "blue",
        items: [
            "Instant Noodles", "Rice", "Sauces and Seasonings", "Chips", "Cookies and Crackers",
            "Candy", "Seaweed Snacks", "Dried Goods", "Canned Goods", "Tofu",
            "Frozen Dumplings", "Rice Cakes", "Cooking Oils"
        ],
        images: ["placeholder.svg"]
    }
];