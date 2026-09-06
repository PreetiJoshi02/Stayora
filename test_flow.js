const http = require("http");

async function request(options, postData = null, cookie = "") {
  return new Promise((resolve, reject) => {
    const reqOptions = {
      hostname: "localhost",
      port: 8080,
      path: options.path,
      method: options.method || "GET",
      headers: {
        ...(cookie ? { Cookie: cookie } : {}),
        ...(options.headers || {}),
      },
    };

    if (postData) {
      if (typeof postData === "string") {
        reqOptions.headers["Content-Type"] = "application/x-www-form-urlencoded";
        reqOptions.headers["Content-Length"] = Buffer.byteLength(postData);
      }
    }

    const req = http.request(reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const setCookie = res.headers["set-cookie"];
        let newCookie = cookie;
        if (setCookie) {
          newCookie = setCookie.map((c) => c.split(";")[0]).join("; ");
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data,
          cookie: newCookie,
        });
      });
    });

    req.on("error", (e) => reject(e));
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log("=== STARTING END-TO-END AUTOMATED VERIFICATION ===");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Root redirect
    const r1 = await request({ path: "/" });
    assert(r1.statusCode === 302 && r1.headers.location === "/listings", "GET / redirects to /listings");

    // 2. Listings index
    const r2 = await request({ path: "/listings" });
    assert(r2.statusCode === 200, "GET /listings returns 200 OK");
    assert(r2.data.includes("stayora") && r2.data.includes("Display total after taxes"), "Listings index renders navbar and tax switch");

    // 3. Category filter
    const r3 = await request({ path: "/listings?category=Mountains" });
    assert(r3.statusCode === 200 && r3.data.includes("filter-item-luxury text-decoration-none text-center active"), "GET /listings?category=Mountains works with active filter");

    // 4. Search query
    const r4 = await request({ path: "/listings?q=villa" });
    assert(r4.statusCode === 200 && r4.data.includes("Showing curated stays for"), "Search query returns results banner");

    // 5. Unauthenticated protected route
    const r5 = await request({ path: "/listings/new" });
    assert(r5.statusCode === 302 && r5.headers.location === "/login", "GET /listings/new without auth redirects to /login");

    // 6. User 1 Signup
    const uniqueUser1 = "host_" + Date.now();
    const signupData1 = `username=${uniqueUser1}&email=${uniqueUser1}@test.com&password=testpassword123`;
    const r6 = await request({ path: "/signup", method: "POST" }, signupData1);
    assert(r6.statusCode === 302, "POST /signup registers user and redirects");
    const user1Cookie = r6.cookie;

    // 7. User 1 Create Listing
    const newListingData = new URLSearchParams({
      "listing[title]": "Automated Test Paradise Villa",
      "listing[description]": "Stunning private beachfront villa with incredible sea views.",
      "listing[price]": "4500",
      "listing[location]": "Goa Beachfront",
      "listing[country]": "India",
      "listing[category]": "Beachfront",
      "listing[amenities]": "Wifi",
      "listing[image]": "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
    }).toString();

    const r7 = await request({ path: "/listings", method: "POST" }, newListingData, user1Cookie);
    assert(r7.statusCode === 302 && r7.headers.location === "/listings", "POST /listings creates listing and redirects to /listings");

    // 8. Find created listing on index & retrieve ID
    const r8 = await request({ path: "/listings?q=Automated+Test+Paradise+Villa" });
    const match = r8.data.match(/\/listings\/([a-f0-9]{24})/);
    assert(match && match[1], "Newly created listing found in catalog");
    const listingId = match ? match[1] : null;

    if (listingId) {
      // 9. Show Page
      const r9 = await request({ path: `/listings/${listingId}` }, null, user1Cookie);
      assert(r9.statusCode === 200 && r9.data.includes("Automated Test Paradise Villa"), "GET /listings/:id displays listing details");
      assert(r9.data.includes("Host Management Controls") && r9.data.includes("Edit Listing"), "Owner sees Edit and Delete controls");

      // 10. Edit Page
      const r10 = await request({ path: `/listings/${listingId}/edit` }, null, user1Cookie);
      assert(r10.statusCode === 200 && r10.data.includes("value=\"Automated Test Paradise Villa\""), "GET /listings/:id/edit displays edit form");

      // 11. Update Listing
      const updateData = new URLSearchParams({
        "listing[title]": "Updated Test Paradise Villa",
        "listing[description]": "Stunning updated private villa.",
        "listing[price]": "5000",
        "listing[location]": "Goa South Beach",
        "listing[country]": "India",
        "listing[category]": "Luxury",
        "listing[image]": "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
      }).toString();
      const r11 = await request({ path: `/listings/${listingId}?_method=PUT`, method: "POST" }, updateData, user1Cookie);
      assert(r11.statusCode === 302 && r11.headers.location === `/listings/${listingId}`, "PUT /listings/:id updates listing successfully");

      // 12. User 2 Signup (Non-owner)
      const uniqueUser2 = "guest_" + Date.now();
      const signupData2 = `username=${uniqueUser2}&email=${uniqueUser2}@test.com&password=testpassword123`;
      const r12 = await request({ path: "/signup", method: "POST" }, signupData2);
      const user2Cookie = r12.cookie;

      // 13. Authorization Test: User 2 tries to edit User 1's listing -> Forbidden/Redirected
      const r13 = await request({ path: `/listings/${listingId}/edit` }, null, user2Cookie);
      assert(r13.statusCode === 302 && r13.headers.location === `/listings/${listingId}`, "Non-owner prevented from editing listing (302 redirect)");

      // 14. User 2 adds a review
      const reviewData = new URLSearchParams({
        "review[rating]": "5",
        "review[comment]": "Absolutely magnificent stay! Highly recommended.",
      }).toString();
      const r14 = await request({ path: `/listings/${listingId}/reviews`, method: "POST" }, reviewData, user2Cookie);
      assert(r14.statusCode === 302 && r14.headers.location === `/listings/${listingId}`, "Guest can submit review to /listings/:id/reviews");

      // Verify review displays
      const r14Check = await request({ path: `/listings/${listingId}` });
      assert(r14Check.data.includes("Absolutely magnificent stay!"), "Review is rendered on listing show page");

      // 15. User 2 makes a booking
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
      const nextWeek = new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0];
      const bookingData = new URLSearchParams({
        "booking[checkIn]": tomorrow,
        "booking[checkOut]": nextWeek,
        "booking[guests]": "2",
      }).toString();
      const r15 = await request({ path: `/listings/${listingId}/bookings`, method: "POST" }, bookingData, user2Cookie);
      assert(r15.statusCode === 302 && r15.headers.location === "/bookings", "Guest can make booking and redirects to /bookings");

      // 16. User 2 views bookings
      const r16 = await request({ path: "/bookings" }, null, user2Cookie);
      assert(r16.statusCode === 200 && r16.data.includes("Updated Test Paradise Villa"), "GET /bookings displays confirmed reservation");

      // 17. User 1 Deletes listing
      const r17 = await request({ path: `/listings/${listingId}?_method=DELETE`, method: "POST" }, "", user1Cookie);
      assert(r17.statusCode === 302 && r17.headers.location === "/listings", "Owner deletes listing and redirects to /listings");

      // Verify listing is gone
      const r17Check = await request({ path: `/listings/${listingId}` });
      assert(r17Check.statusCode === 302 && r17Check.headers.location === "/listings", "Deleted listing returns 302 to /listings with flash error");
    }

    // 18. Legal pages
    const r18 = await request({ path: "/privacy" });
    const r19 = await request({ path: "/terms" });
    assert(r18.statusCode === 200 && r18.data.includes("Privacy Policy"), "GET /privacy returns 200 OK");
    assert(r19.statusCode === 200 && r19.data.includes("Terms of Service"), "GET /terms returns 200 OK");

  } catch (err) {
    console.error("Test execution encountered an error:", err);
    failed++;
  }

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
