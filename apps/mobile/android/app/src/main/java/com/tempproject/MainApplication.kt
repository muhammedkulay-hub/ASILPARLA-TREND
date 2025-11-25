package com.asilparla

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.facebook.react.shell.MainReactPackage
import com.swmansion.reanimated.ReanimatedPackage
import com.swmansion.gesturehandler.RNGestureHandlerPackage
import com.swmansion.rnscreens.RNScreensPackage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage
import com.th3rdwave.safeareacontext.SafeAreaContextPackage

class MainApplication : Application(), ReactApplication {

  private val mReactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
          return listOf(
              MainReactPackage(),
              ReanimatedPackage(),
              RNGestureHandlerPackage(),
              RNScreensPackage(),
              AsyncStoragePackage(),
              SafeAreaContextPackage()
          )
        }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = true // Enable dev support for debugging

        override val isNewArchEnabled: Boolean = false
        override val isHermesEnabled: Boolean = true
      }

  override fun getReactNativeHost(): ReactNativeHost = mReactNativeHost

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
  }
}
