import fs from "fs";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  fs.readFileSync("./scripts/serviceAccountKey.json", "utf8"),
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const menuItems = [
  // Bakery
  {
    title: "Albany White Bread 700g",
    image: "/products/albany-white.jpg",
    price: 21,
    category: "bakery",
    qty: 3,
  },
  {
    title: "Brown Bread 700g",
    image: "/products/albany-brown.jpeg",
    price: 20,
    category: "bakery",
    qty: 3,
  },

  // Dairy
  {
    title: "Full Cream Milk 1L",
    image: "/products/parmalat-milk.jpeg",
    price: 20,
    category: "dairy",
    qty: 2,
  },

  // Fresh
  {
    title: "3 Onions",
    image: "/products/onions.jpg",
    price: 6,
    category: "fresh",
    qty: 1,
  },
  {
    title: "3 Potatoes",
    image: "/products/potato.jpeg",
    price: 6,
    category: "fresh",
    qty: 1,
  },

  // Drinks
  {
    title: "Coca Cola 2L",
    image: "/products/coke-2l.jpg",
    price: 26,
    category: "drinks",
    qty: 4,
  },
  {
    title: "Sprite 2L",
    image: "/products/sprite-2l.jpg",
    price: 26,
    category: "drinks",
    qty: 1,
  },
  {
    title: "Thirst Water 500ml",
    image: "/products/thirst-500ml.jpeg",
    price: 13,
    category: "drinks",
    qty: 1,
  },
  {
    title: "Monster Energy Drink 500ml",
    image: "/products/monster-500ml.jpeg",
    price: 22,
    category: "drinks",
    qty: 1,
  },

  // Household
  {
    title: "2ply Toilet Paper Single Roll",
    image: "/products/tissue.jpeg",
    price: 8,
    category: "household",
    qty: 1,
  },
  {
    title: "Dishwashing Liquid 750ml",
    image: "/products/dishwashing-liquid.jpeg",
    price: 25,
    category: "household",
    qty: 1,
  },
  {
    title: "Matches",
    image: "/products/matches.jpeg",
    price: 5,
    category: "household",
    qty: 1,
  },

  // Convenience
  {
    title: "DSTV Bill",
    image: "/products/dstv.jpg",
    price: 10,
    category: "convenience",
    qty: 1,
  },
  {
    title: "Water Bill",
    image: "/products/water.jpeg",
    price: 10,
    category: "convenience",
    qty: 1,
  },
  {
    title: "Electricity",
    image: "/products/eskom.jpg",
    price: 10,
    category: "convenience",
    qty: 1,
  },
];

async function deleteCollection(collectionName) {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  console.log(`Deleted ${snapshot.size} old menu items`);
}

async function migrate() {
  const collection = db.collection("menu items");

  try {
    // Remove old data
    await deleteCollection("menu items");

    // Insert new data
    for (const item of menuItems) {
      await collection.add(item);
      console.log(`Added: ${item.title}`);
    }

    console.log("Migration complete ✅");
  } catch (error) {
    console.error("Migration failed ❌", error);
  } finally {
    process.exit();
  }
}

migrate();
