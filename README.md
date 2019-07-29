# StaticDataApp2

This is a sample nodejs app to show K8 service-to-service communication within the cluster

## Minimum Prerequisites

* npm
* nodejs

## Setup / Build

Download the app and go to the folder/directory where app.js file exist and run the following command:

```
npm install
```

## Run

To run the app go to the folder/directory where app.js file exist and run the following command:

```
npm start
```

The server will start on port 8082.  
   
  
## Usage and Examples

* Open your favorite browser and go to this page to verify the app is working:  
  http://localhost:8082

* Here are the REST endpoints for local calls (test data available in data.js):
    ```
    List all users:                  http://localhost:8082/users
    Get single user:                 http://localhost:8082/users/{userId}
    Get user memberships:            http://localhost:8082/users/{userId}/memberships

    List all subscriptions:          http://localhost:8082/subscriptions
    Get single subscription:         http://localhost:8082/subscriptions/{subscriptionId}
    Get subscription memberships:    http://localhost:8082/subscriptions/{subscriptionId}/memberships
    ```

* Here are the REST endpoints for remote calls (test data available in data.js):
    ```
    List all remote users:                  http://localhost:8082/remote_users
    Get single remote user:                 http://localhost:8082/remote_users/{userId}
    Get remote user memberships:            http://localhost:8082/remote_users/{userId}/memberships

    List all remote subscriptions:          http://localhost:8082/remote_subscriptions
    Get single remote subscription:         http://localhost:8082/remote_subscriptions/{subscriptionId}
    Get remote subscription memberships:    http://localhost:8082/remote_subscriptions/{subscriptionId}/memberships
    ```  
