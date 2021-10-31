#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
// #import <PushKit/PushKit.h> 
// #import "RNVoipPushNotificationManager.h" 
// #import "RNCallKeep.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
 if ([FIRApp defaultApp] == nil) {
      [FIRApp configure];
    }
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  // ===== (THIS IS OPTIONAL BUT RECOMMENDED) =====
  // --- register VoipPushNotification here ASAP rather than in JS. Doing this from the JS side may be too slow for some use cases

  //[RNVoipPushNotificationManager voipRegistration];
  // ===== (THIS IS OPTIONAL BUT RECOMMENDED) =====
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ZineCollectionProject"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
//  - (BOOL)application:(UIApplication *)application
//  continueUserActivity:(NSUserActivity *)userActivity
//    restorationHandler:(void(^)(NSArray * __nullable restorableObjects))restorationHandler
//  {
//    return [RNCallKeep application:application
//             continueUserActivity:userActivity
//               restorationHandler:restorationHandler];
//  }

// - (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(PKPushType)type {
//   // Register VoIP push token (a property of PKPushCredentials) with server
//   [RNVoipPushNotificationManager didUpdatePushCredentials:credentials forType:(NSString *)type];
// }

// - (void)pushRegistry:(PKPushRegistry *)registry didInvalidatePushTokenForType:(PKPushType)type
// {
//   // --- The system calls this method when a previously provided push token is no longer valid for use. No action is necessary on your part to reregister the push type. Instead, use this method to notify your server not to send push notifications using the matching push token.
// }
// - (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion {
//   // --- Retrieve information from Twilio push payload
//   NSString *uuid = [[[NSUUID UUID] UUIDString] lowercaseString];
//   NSString *callerName = [payload.dictionaryPayload[@"twi_from"] stringByReplacingOccurrencesOfString:@"client:" withString:@""];
//   NSString *handle = [payload.dictionaryPayload[@"twi_to"] stringByReplacingOccurrencesOfString:@"client:" withString:@""];

//   // --- Process the received push
//   [RNVoipPushNotificationManager didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];

//   // --- You should make sure to report to callkit BEFORE execute `completion()`
//   [RNCallKeep reportNewIncomingCall:uuid
//                              handle:handle
//                          handleType:@"generic"
//                            hasVideo:NO
//                 localizedCallerName:callerName
//                     supportsHolding:YES
//                        supportsDTMF:YES
//                    supportsGrouping:YES
//                  supportsUngrouping:YES
//                         fromPushKit:YES
//                             payload:payload.dictionaryPayload
//               withCompletionHandler:nil];

//   completion();
// }

-(void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
 [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}
// IOS 4-10 Required for the localNotification event.
-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
 [RNCPushNotificationIOS didReceiveLocalNotification:notification];
}
// --- Handle incoming pushes
// - (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion {
  

//   // --- NOTE: apple forced us to invoke callkit ASAP when we receive voip push
//   // --- see: react-native-callkeep

//   // --- Retrieve information from your voip push payload
//   NSString *uuid = payload.dictionaryPayload[@"uuid"];
//   NSString *callerName = [NSString stringWithFormat:@"%@ (Connecting...)", payload.dictionaryPayload[@"callerName"]];
//   NSString *handle = payload.dictionaryPayload[@"handle"];

//   // --- this is optional, only required if you want to call `completion()` on the js side
//   [RNVoipPushNotificationManager addCompletionHandler:uuid completionHandler:completion];

//   // --- Process the received push
//   [RNVoipPushNotificationManager didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];

//   // --- You should make sure to report to callkit BEFORE execute `completion()`
//   [RNCallKeep reportNewIncomingCall:uuid handle:handle handleType:@"generic" hasVideo:false localizedCallerName:callerName fromPushKit: YES payload:nil];
  
//   // --- You don't need to call it if you stored `completion()` and will call it on the js side.
//   completion();
// }



@end
