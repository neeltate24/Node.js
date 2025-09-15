const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Profile = require("./models/profile.model");

initializeDatabase();

// Reading the JSON file
const jsonData = fs.readFileSync("profiles.json", "utf-8");
const profilesData = JSON.parse(jsonData);

// Inserting data into the database
function seedData() {
  try {
    for (const profileData of profilesData) {
      const newProfile = new Profile({
        fullName: profileData.fullName,
        username: profileData.username,
        bio: profileData.bio,
        profilePicUrl: profileData.profilePicUrl,
        followingCount: profileData.followingCount,
        followerCount: profileData.followerCount,
        companyName: profileData.companyName,
        location: profileData.location,
        portfolioUrl: profileData.portfolioUrl,
      });
      //   console.log(newProfile);
      newProfile.save();
    }
    console.log("Profiles seeded successfully!");
  } catch (error) {
    console.error("Error seeding the data:", error);
  }
}

seedData();
