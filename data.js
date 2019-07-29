var data = {
  users: [
    {
      userId: "app2_user1",
      username: "app2_user1@test.com",
      displayName: "App 2 Test User 1",
      firstName: "App 2 Test",
      lastName: "User 1",
      status: "ACTIVE"
    },
    {
      userId: "app2_user2",
      username: "app2_user2@test.com",
      displayName: "App 2 Test User 2",
      firstName: "App 2 Test",
      lastName: "User 2",
      status: "STAGED"
    },
    {
      userId: "app2_user3",
      username: "app2_user3@test.com",
      displayName: "App 2 Test User 3",
      firstName: "App 2 Test",
      lastName: "User 3",
      status: "ACTIVE"      
    }
  ],
  subscriptions: [
    {
      subscriptionId: "app2_subscription1",
      productId: "app2_product1",
      country: "US",
      companyName: "app2_company1",
      status: "ACTIVE",
      plans: [
        {
          planId: "plan1"
        },
        {
          planId: "plan2"
        }
      ]
    },
    {
      subscriptionId: "app2_subscription2",
      productId: "app2_product2",
      country: "US",
      companyName: "app2_company2",
      status: "ACTIVE",
      plans: [
        {
          planId: "plan2"
        }
      ]
    },
    {
      subscriptionId: "app2_subscription3",
      productId: "app2_product3",
      country: "US",
      companyName: "app2_company3",
      status: "ACTIVE",
      plans: [
        {
          planId: "plan1"
        }
      ]
    }        
  ],
  memberships: [
    {
      userId: "app2_user1",
      subscriptionId: "app2_subscription1",
      roles: ["Admin", "Manager"]
    },
    {
      userId: "app2_user1",
      subscriptionId: "app2_subscription2",
      roles: ["Admin"]
    },
    {
      userId: "app2_user1",
      subscriptionId: "app2_subscription3",
      roles: ["User"]
    },
    {
      userId: "app2_user2",
      subscriptionId: "app2_subscription1",
      roles: ["Admin"]
    },
    {
      userId: "app2_user2",
      subscriptionId: "app2_subscription2",
      roles: ["Admin", "Manager"]
    },
    {
      userId: "app2_user3",
      subscriptionId: "app2_subscription3",
      roles: ["Admin"]
    }
  ]
}

module.exports = data;