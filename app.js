const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Step 1: Inserting data into User model
  const users = await prisma.user.createMany({
    data: [
      { name: "John Doe", email: "john.doe@example.com", phone: "+1234567890" },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1987654321",
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone: "+1122334455",
      },
      {
        name: "Bob Brown",
        email: "bob.brown@example.com",
        phone: "+2233445566",
      },
      {
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        phone: "+3344556677",
      },
    ],
  });

  // Retrieve all user IDs for later use in foreign keys
  const userIds = await prisma.user.findMany({
    select: { id: true },
  });

  // Step 2: Insert Account data
  await prisma.account.createMany({
    data: [
      {
        userId: userIds[0].id,
        type: "oauth",
        provider: "google",
        providerAccountId: "google123",
        refresh_token: "refreshToken1",
        access_token: "accessToken1",
        expires_at: 1234567890,
      },
      {
        userId: userIds[1].id,
        type: "oauth",
        provider: "facebook",
        providerAccountId: "facebook123",
        refresh_token: "refreshToken2",
        access_token: "accessToken2",
        expires_at: 1234567891,
      },
      {
        userId: userIds[2].id,
        type: "oauth",
        provider: "twitter",
        providerAccountId: "twitter123",
        refresh_token: "refreshToken3",
        access_token: "accessToken3",
        expires_at: 1234567892,
      },
      {
        userId: userIds[3].id,
        type: "oauth",
        provider: "linkedin",
        providerAccountId: "linkedin123",
        refresh_token: "refreshToken4",
        access_token: "accessToken4",
        expires_at: 1234567893,
      },
      {
        userId: userIds[4].id,
        type: "oauth",
        provider: "github",
        providerAccountId: "github123",
        refresh_token: "refreshToken5",
        access_token: "accessToken5",
        expires_at: 1234567894,
      },
    ],
  });

  // Step 3: Insert Session data
  await prisma.session.createMany({
    data: [
      {
        userId: userIds[0].id,
        sessionToken: "sessionToken1",
        expires: new Date(),
      },
      {
        userId: userIds[1].id,
        sessionToken: "sessionToken2",
        expires: new Date(),
      },
      {
        userId: userIds[2].id,
        sessionToken: "sessionToken3",
        expires: new Date(),
      },
      {
        userId: userIds[3].id,
        sessionToken: "sessionToken4",
        expires: new Date(),
      },
      {
        userId: userIds[4].id,
        sessionToken: "sessionToken5",
        expires: new Date(),
      },
    ],
  });

  await prisma.location.createMany({
    data: [
      { address: "123 Main St", latitude: 12.34, longitude: 56.78 },
      { address: "456 Elm St", latitude: 23.45, longitude: 67.89 },
      { address: "789 Oak St", latitude: 34.56, longitude: 78.9 },
      { address: "101 Pine St", latitude: 45.67, longitude: 89.01 },
      { address: "202 Maple St", latitude: 56.78, longitude: 90.12 },
    ],
  });

  const locationIds = await prisma.location.findMany({
    select: { id: true },
  });

  await prisma.complaintCategory.createMany({
    data: [
      { name: "Streetlight" },
      { name: "Pothole" },
      { name: "Sewage" },
      { name: "Traffic" },
      { name: "Waste" },
    ],
  });

  const complaintCategoryIds = await prisma.complaintCategory.findMany({
    select: { id: true },
  });

  await prisma.status.createMany({
    data: [
      { name: "Pending" },
      { name: "In Progress" },
      { name: "Resolved" },
      { name: "Closed" },
      { name: "Rejected" },
    ],
  });

  const statusIds = await prisma.status.findMany({
    select: { id: true },
  });

  // Step 4: Insert Report data
  await prisma.report.createMany({
    data: [
      { description: 'Streetlight broken', reportDate: new Date(), userId: userIds[0].id, locationId: locationIds[0].id, complaintCategoryId: complaintCategoryIds[0].id, statusId: statusIds[0].id },
      { description: 'Pothole on road', reportDate: new Date(), userId: userIds[1].id, locationId: locationIds[1].id, complaintCategoryId: complaintCategoryIds[1].id, statusId: statusIds[1].id },
      { description: 'Sewage leakage', reportDate: new Date(), userId: userIds[2].id, locationId: locationIds[2].id, complaintCategoryId: complaintCategoryIds[2].id, statusId: statusIds[2].id },
      { description: 'Streetlight flickering', reportDate: new Date(), userId: userIds[3].id, locationId: locationIds[3].id, complaintCategoryId: complaintCategoryIds[3].id, statusId: statusIds[3].id },
      { description: 'Road damaged', reportDate: new Date(), userId: userIds[4].id, locationId: locationIds[4].id, complaintCategoryId: complaintCategoryIds[4].id, statusId: statusIds[4].id },
    ],
  });

  // Step 5: Insert other related data (Location, ComplaintCategory, Status, etc.)

  

  

  console.log("Data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
