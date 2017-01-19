package com.firebasepresencetest;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.Logger;

import android.util.Log;

public class PresenceTestModule extends ReactContextBaseJavaModule {

  private DatabaseReference mDatabase;

  public PresenceTestModule(ReactApplicationContext reactContext) {
    super(reactContext);
    FirebaseDatabase instance = FirebaseDatabase.getInstance();
    instance.setLogLevel(Logger.Level.DEBUG);
    mDatabase = instance.getReference();
  }

  @Override
  public String getName() {
    return "PresenceTest";
  }

  @ReactMethod
  public void monitorPresence() {
    mDatabase.child(".info/connected").addValueEventListener(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot snapshot) {
        boolean connected = snapshot.getValue(Boolean.class);
        Log.d("PresenceTest", "Connected to Firebase: " + String.valueOf(connected));
      }
      @Override
      public void onCancelled(DatabaseError error) {}
    });
  }

  @ReactMethod
  public void monitorData() {
    mDatabase.child("test").addValueEventListener(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot snapshot) {
        String value = snapshot.getValue(String.class);
        Log.d("PresenceTest", "Test data value: " + value);
      }
      @Override
      public void onCancelled(DatabaseError error) {}
    });
  }
}
