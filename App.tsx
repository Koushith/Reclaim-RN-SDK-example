//@ts-nocheck

import React from 'react';
// import Section, {styles} from './Section';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {Reclaim} from '@reclaimprotocol/reactnative-sdk';

function App(): React.JSX.Element {
  const reclaimClient = new Reclaim.ProofRequest(
    '0x6247BC5F84086c67400F7Ee1AE5B9Aa0Ee346fA2',
  ); // your app ID.
  const APP_SECRET =
    '0xa5b24281f5afd15f992efd7c8e545feded16537600a484e6df7ecbc8bf7b3dba'; // your app secret key.

  async function startVerificationFlow() {
    console.log('startVerificationFlow');
    const providerIds = [
      '5e1302ca-a3dd-4ef8-bc25-24fcc97dc800', // Aadhaar Card Date of Birth
      'f1ecc692-cf13-4f45-9b91-ea1459875f07', // Alaska Miles
    ];

    const appDeepLink = 'mychat://chat/';
    reclaimClient.setAppCallbackUrl(appDeepLink);

    await reclaimClient.addContext(
      (address = 'users address'),
      (message = 'add a message'),
    );

    await reclaimClient.buildProofRequest(providerIds[0]);

    const signature = reclaimClient.setSignature(
      await Reclaim.generateSignature(APP_SECRET),
    );

    console.log('signature', signature);

    const {requestUrl, statusUrl} =
      await reclaimClient.createVerificationRequest();

    console.log('Request URL:', requestUrl);
    console.log('Status URL:', statusUrl);

    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof);
        // Your business logic here
      },
      onFailureCallback: error => {
        console.error('Verification failed', error);
        // Your business logic here to handle the error
      },
    });
  }
  return (
    <SafeAreaView>
      <SafeAreaView>
        <View>
          <Pressable onPress={startVerificationFlow}>
            <Text>Start Verification Flow</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default App;
