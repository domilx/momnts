import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { query, collection, where, getDocs, limit } from "firebase/firestore";

const SearchService = {
  async searchUsers(searchQuery) {
    // Check if the search query is not empty
    if (searchQuery.trim() === "") {
      return [];
    }

    const usersCollection = collection(db, "users");
    const searchQueryLower = searchQuery.toLowerCase();
    const q = query(
      usersCollection,
      where("username", ">=", searchQueryLower),
      where("username", "<=", searchQueryLower + "\uf8ff"),
      limit(10)
    );
    console.log("QUERY", q);
    const querySnapshot = await getDocs(q);
    const searchResults = [];

    querySnapshot.forEach((doc) => {
      if (doc.id !== auth.currentUser.uid) {
        searchResults.push({ userId: doc.id, ...doc.data() });
      }
    });

    return searchResults;
  },
};

export default SearchService;
